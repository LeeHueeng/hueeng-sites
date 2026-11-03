#!/usr/bin/env bash
# hueeng-sites 배포·동기화 — 홈서버(LXC 101)의 /opt/hueeng-sites 에서 실행한다.
#   1) 저장소를 origin/main 으로 맞추고, 서브모듈(car·fly·passport)은 각 원본 저장소 main 의 최신을 따라간다.
#   2) 바뀐 것이 있으면(또는 FORCE=1) 새 nginx 설정을 일회용 컨테이너에서 먼저 검사한 뒤 반영·reload 한다.
#      검사가 실패하면 돌고 있는 사이트는 건드리지 않는다.
#   3) 호스트별 응답을 확인하고 Prometheus textfile 지표(hueeng_sites_sync_*)를 남긴다.
# 호출: GitHub Actions self-hosted 러너(push 마다, FORCE=1) · hueeng-sites-sync.timer(5분마다, QUIET=1)
# 전체를 { } 로 감싼다 — 실행 중 git 이 이 파일을 바꿔도 이미 읽은 내용으로 끝까지 돈다.
{
set -Eeuo pipefail
ROOT=/opt/hueeng-sites
PORT=3108
LOCK=/run/lock/hueeng-sites-deploy.lock
METRICS_DIR=/opt/monitoring/textfile
cd "$ROOT"

log() { [ "${QUIET:-0}" = 1 ] || echo "$@"; }
state() {  # 지금 배포 상태의 지문 — 실패하지 않는다(첫 설치처럼 파일이 없어도)
  git rev-parse HEAD 2>/dev/null; git submodule status --recursive 2>/dev/null
  sha256sum nginx/conf.d/*.conf nginx/snippets/*.conf compose.yaml 2>/dev/null; true
}
metric() {  # $1 = 1 성공 / 0 실패
  [ -d "$METRICS_DIR" ] || return 0
  local tmp="$METRICS_DIR/.hueeng_sites.prom.$$"
  {
    echo "# HELP hueeng_sites_sync_success Last hueeng-sites sync/health check succeeded (1) or failed (0)."
    echo "# TYPE hueeng_sites_sync_success gauge"
    echo "hueeng_sites_sync_success $1"
    echo "# HELP hueeng_sites_sync_timestamp_seconds Unix time of the last hueeng-sites sync attempt."
    echo "# TYPE hueeng_sites_sync_timestamp_seconds gauge"
    echo "hueeng_sites_sync_timestamp_seconds $(date +%s)"
  } > "$tmp" && chmod 644 "$tmp" && mv -f "$tmp" "$METRICS_DIR/hueeng_sites.prom"
}
trap 'metric 0' ERR

if [ -z "${HS_LOCKED:-}" ]; then
  exec 9>"$LOCK"
  flock -w 300 9
  export HS_LOCKED=1
  HS_BEFORE="$(state | sha256sum | cut -c1-16)"; export HS_BEFORE
  self_before="$(sha256sum deploy.sh)"
  git fetch -q --prune origin main
  git reset -q --hard origin/main
  # 이 스크립트가 바뀌었으면 새 버전으로 다시 시작한다 (잠금 fd 9 는 그대로 이어진다)
  [ "$self_before" = "$(sha256sum deploy.sh)" ] || exec bash "$ROOT/deploy.sh" "$@"
fi

git submodule sync -q --recursive
git submodule update -q --init --remote --recursive
after="$(state | sha256sum | cut -c1-16)"

changed=0
[ "${HS_BEFORE:-}" != "$after" ] && changed=1
[ "${FORCE:-0}" = 1 ] && changed=1
[ "$(docker inspect -f '{{.State.Running}}' hueeng-sites-web 2>/dev/null || echo false)" = true ] || changed=1

if [ "$changed" = 1 ]; then
  image=$(awk '$1=="image:"{print $2; exit}' compose.yaml)
  docker run --rm --network none \
    -v "$ROOT/nginx/conf.d:/etc/nginx/conf.d:ro" \
    -v "$ROOT/nginx/snippets:/etc/nginx/snippets:ro" \
    -v "$ROOT/sites:/srv/sites:ro" \
    "$image" nginx -t -q
  docker compose up -d --quiet-pull --remove-orphans >/dev/null 2>&1
  for _ in $(seq 1 30); do
    [ "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/healthz")" = 200 ] && break
    sleep 1
  done
  docker compose exec -T web nginx -s reload >/dev/null 2>&1
  echo "deployed $(git rev-parse --short HEAD) · $(git submodule status | awk '{sub("sites/","",$2); printf "%s@%s ", $2, substr($1,1,7)}')"
fi

# 응답 검사 — 하나라도 어긋나면 실패(1)로 끝나 러너·타이머 기록과 지표에 남는다
fail=0
check() {  # 호스트 경로 기대코드
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $1" "http://127.0.0.1:$PORT$2" || true)
  if [ "$code" = "$3" ]; then log "ok   $1$2 -> $code"; else echo "FAIL $1$2 -> $code (expected $3)"; fail=1; fi
}
check jomhae.hueeng.com / 200
check jomhae.hueeng.com /f/test 200
check jomhae.hueeng.com /.well-known/apple-app-site-association 200
check car.hueeng.com / 200
check car.hueeng.com /privacy 200
check car.hueeng.com /simcha-site/privacy 200
check car.hueeng.com /chat/invite/test 200
check car.hueeng.com /README.md 404
check hanjang.hueeng.com / 200
check hanjang.hueeng.com /privacy/ 200
check hanjang.hueeng.com /robots.txt 200
check lastblock.hueeng.com / 200
check lastblock.hueeng.com /robots.txt 200
check lastblock.hueeng.com /sitemap.xml 200
check vidomaker.hueeng.com / 200
check vidomaker.hueeng.com /robots.txt 200
check vidomaker.hueeng.com /sitemap.xml 200
check fly.hueeng.com / 200
check fly.hueeng.com /server.js 404
check passport.hueeng.com / 200
check passport.hueeng.com /naver3eea2962cade5b83940183dd3224d099.html 200
if curl -s -H 'Host: passport.hueeng.com' "http://127.0.0.1:$PORT/" | grep -q 'leehueeng.github.io/phototravelmap-site'; then
  echo "FAIL passport.hueeng.com / still has github.io URLs (sub_filter)"; fail=1
fi
if [ "$fail" != 0 ]; then metric 0; exit 1; fi
metric 1
exit 0
}

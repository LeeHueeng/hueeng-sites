# hueeng-sites

후엥(Hueeng)의 정적 랜딩·법적 고지 사이트를 **저장소 하나 · nginx 컨테이너 하나 · 배포 스크립트 하나**로 운영한다.
프레임워크·빌드 단계 없음 — HTML/CSS 파일이 곧 배포물이다.

| 호스트 | 콘텐츠 위치 | 고치는 곳 |
|---|---|---|
| jomhae.hueeng.com | `sites/jomhae/` | 이 저장소 |
| hanjang.hueeng.com | `sites/hanjang/` | 이 저장소 |
| car.hueeng.com | `sites/car/` → 서브모듈 [LeeHueeng/simcha-site](https://github.com/LeeHueeng/simcha-site) | simcha-site 저장소 (GitHub Pages `leehueeng.github.io/simcha-site/` 도 같은 파일) |
| fly.hueeng.com | `sites/fly/` → 서브모듈 [LeeHueeng/fly-lab](https://github.com/LeeHueeng/fly-lab) | fly-lab 저장소 (앱 저장소 그대로, 개발용 파일은 nginx 가 막음) |
| passport.hueeng.com | `sites/passport/` → 서브모듈 [LeeHueeng/phototravelmap-site](https://github.com/LeeHueeng/phototravelmap-site) | phototravelmap-site 저장소 (GitHub Pages 원본). nginx 가 github.io 주소를 passport.hueeng.com 으로 바꿔 내보내고 이 도메인의 네이버 인증을 붙인다 |

서브모듈 사이트는 **원본 저장소 main 에 push 하면 끝**이다. 서버가 5분마다 원본 최신을 따라간다(이 저장소의 서브모듈 커밋을 올릴 필요 없음).

## 배포

```
git push (이 저장소 main)   → GitHub Actions self-hosted 러너(lxc101-sites) → /opt/hueeng-sites/deploy.sh   (즉시)
git push (서브모듈 원본 main) → 서버 hueeng-sites-sync.timer → /opt/hueeng-sites/deploy.sh                 (5분 안)
```

`deploy.sh` 가 하는 일: origin/main 으로 체크아웃 → 서브모듈을 원본 최신으로 → 바뀐 게 있으면 새 nginx 설정을 일회용 컨테이너로 먼저 `nginx -t`(실패하면 돌고 있는 사이트는 그대로) → 반영·reload → 호스트별 응답 검사(초대 링크·확장자 없는 주소·차단 파일·passport URL 치환까지) → Prometheus textfile 지표 `hueeng_sites_sync_success`, `hueeng_sites_sync_timestamp_seconds`.

수동 실행: `ssh proxmox` → `pct exec 101 -- /opt/hueeng-sites/deploy.sh` (`FORCE=1` 이면 바뀐 게 없어도 반영).

## 서버 구성 (Proxmox LXC 101)

- `/opt/hueeng-sites` — 이 저장소 clone(서브모듈 포함). 손으로 파일을 고치지 않는다(다음 동기화가 되돌린다).
- 컨테이너 `hueeng-sites-web` (`compose.yaml`) — `127.0.0.1:3108`, 읽기 전용, 96MB. 설정은 **디렉터리**로 마운트한다(파일 단위 마운트는 git 이 파일을 새로 쓰면 옛 내용을 계속 본다).
- 공개 경로: 주 cloudflared(systemd) `/etc/cloudflared/config.yml` ingress — 다섯 호스트 → `http://localhost:3108`.
- 러너: `/opt/actions-runner-hueeng-sites` (서비스 `actions.runner.LeeHueeng-hueeng-sites.lxc101-sites`, 라벨 `self-hosted,homelab,sites`).
- 타이머: `ops/hueeng-sites-sync.{service,timer}` 를 `/etc/systemd/system/` 에 복사해 `systemctl enable --now hueeng-sites-sync.timer`.
- 감시: `/healthz`(Host 없이) — 홈랩 상태 페이지·HA 수집기가 본다. 외부 응답은 Prometheus blackbox 가 호스트별로 본다.

새로 세울 때: `git clone --recurse-submodules https://github.com/LeeHueeng/hueeng-sites.git /opt/hueeng-sites && FORCE=1 /opt/hueeng-sites/deploy.sh`, 그다음 타이머 설치·러너 등록·터널 ingress.

## 규칙

- 모든 페이지 하단에 같은 사업자 정보 한 줄: 상호 후엥(Hueeng) · 대표 이현우 · 사업자등록번호 474-26-01971 · 서울특별시 관악구 신림동 412-109 B01호 · 문의 hi@hueeng.com. "후엥(Hueeng)" 은 https://hueeng.com 링크.
- 새 페이지의 canonical·OG·발행자 JSON-LD 는 `python3 tools/seo_inject.py <file> --url <url> --site-name <이름> [--app-name --ios --android]` 로 한 번에 넣는다(멱등).
- 네이버 서치어드바이저 인증 파일(`naver*.html`)은 각 사이트 루트에 둔다(passport 는 nginx 설정 안). 사이트맵은 각 사이트의 `sitemap.xml`.
- 저장소 파일은 그대로 공개된다. 비밀·메모를 넣지 않는다(점으로 시작하는 경로·README.md 는 nginx 가 404).
- 사이트를 추가하면: `sites/<이름>/`(또는 서브모듈) → `nginx/conf.d/sites.conf` 에 server 블록 → `deploy.sh` 검사 한 줄 → 터널 ingress·DNS.

## 여기 없는 것

동적 서비스는 각자의 저장소·배포를 쓴다: hueeng.com(Next.js, LeeHueeng/hueeng-company), 문어굴 지원센터(octomine.hueeng.com), 뚝딱무비(vido·vido-api), 거지방, 마이일보.
라스트 블록 법적 고지(`survival.hueeng.com/legal/`)는 게임 서버가 서빙하고 게임 API 검사가 함께 확인하므로 LeeHueeng/last-block 의 `server/wwwroot/legal/` 에 둔다.

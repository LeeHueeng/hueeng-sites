# hueeng-sites

후엥(Hueeng)의 정적 랜딩·법적 고지 사이트를 한 저장소, 한 nginx 컨테이너로 운영한다. 프레임워크·빌드 없음 — HTML/CSS 파일이 곧 배포물이다.

| 폴더 | 호스트 | 내용 |
|---|---|---|
| `sites/jomhae` | jomhae.hueeng.com | 좀 해! 소개·도움말·약관·개인정보·계정 삭제·친구 초대(`/f/`) |
| `sites/car` | car.hueeng.com | 심플차계부 지원·개인정보·약관·계정 삭제 |
| `sites/hanjang` | hanjang.hueeng.com | 한장 소개·개인정보(한/영) |
| `sites/fly` | fly.hueeng.com | FLY LAB 초파리 시뮬레이터 |
| `sites/passport` | passport.hueeng.com | 여행여권 소개·개인정보 (GitHub Pages `phototravelmap-site` 와 같은 내용의 홈서버 사본) |

동적 서비스(hueeng.com, 문어굴 지원센터, 뚝딱무비, 거지방, 마이일보)는 각자의 저장소에 남는다.

## 배포
`main` 에 push 하면 끝. 홈서버 LXC 101 의 self-hosted 러너(`.github/workflows/deploy.yml`)가 `/opt/hueeng-sites` 를 `origin/main` 으로 맞추고 nginx 를 reload 한 뒤 다섯 호스트가 200 인지 확인한다. 공개 경로는 주 cloudflared 터널 ingress `*.hueeng.com → http://localhost:3108`.

수동: `ssh proxmox → pct exec 101 -- bash -lc 'cd /opt/hueeng-sites && git pull --ff-only && docker compose up -d && docker compose exec -T web nginx -s reload'`

## 규칙
- 모든 페이지 하단에 같은 사업자 정보 한 줄: 상호 후엥(Hueeng) · 대표 이현우 · 사업자등록번호 474-26-01971 · 서울특별시 관악구 신림동 412-109 B01호 · 문의 hi@hueeng.com. "후엥(Hueeng)" 은 https://hueeng.com 링크.
- 새 페이지의 canonical/OG/발행자 JSON-LD 는 `python3 tools/seo_inject.py <file> --url <url> --site-name <이름> [--app-name --ios --android]` 로 한 번에 넣는다(멱등).
- 네이버 서치어드바이저 인증 파일(`naver*.html`)은 각 사이트 루트에 그대로 둔다. 사이트맵은 `sites/<site>/sitemap.xml`.
- 저장소 안의 파일은 그대로 공개되므로 비밀·메모를 넣지 않는다 (`.`·`README.md` 는 nginx 가 404).

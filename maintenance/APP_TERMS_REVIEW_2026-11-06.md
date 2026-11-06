# 앱별 서비스 약관 점검 · 2026-11-06

요청 범위: 8개 앱의 공개 서비스 약관, 각 앱 홈의 링크, 앱별 디자인, 실제 기능 및 권리관계 대조. Google Play Console 입력·판매자 선언 변경·앱 바이너리 배포는 수행하지 않는다.

## 공개 위치

| 앱 | 약관 | 디자인/연결 |
|---|---|---|
| 심플차계부 | https://car.hueeng.com/terms | 기존 앱 사이트 스타일 유지, 소비자 권리 보완 |
| 좀 해! | https://jomhae.hueeng.com/terms.html | 기존 앱 헤더·색상·푸터 유지, 포인트/동의 문구 보완 |
| 뚝딱무비 | https://vidomaker.hueeng.com/terms | 소개 사이트의 어두운 배경·라임색, 원본의 날짜별 약관 자동 전환 유지 |
| 라스트 블록 | https://lastblock.hueeng.com/legal/terms.html | 게임 소개의 야간 배경·민트색, 게임 서버의 최신 법률 문서 연동 |
| 여행여권 | https://passport.hueeng.com/terms.html | 파란색·사진 지도 아이콘, GitHub Pages에서도 상대 경로 동작 |
| 한장 | https://hanjang.hueeng.com/terms/ | 크림 종이·코랄/인주 색상·앱 아이콘 |
| FixFlow | https://hueeng.com/fixflow-support/terms.html | 현행 앱 지원 페이지 하위, 웜 페이퍼·오렌지·다크 모드 |
| 필라멘트 재고관리 | https://hueeng.com/filament-support/terms.html | 현행 앱 지원 페이지 하위, 앱 아이콘·지원 사이트 테마 |

회사 `/terms/{passport,hanjang,fixflow,filament}.html`은 새 주소로 308 이동한다. 약관에서 홈으로 돌아가는 링크는 각 앱 홈을 가리킨다. 기존 문어굴 링크는 목록에 보존하며 이번 8개 검토 범위 밖이다.

## 실제 자료와 반영 사항

| 앱 | 확인한 증거 | 반영/보존 |
|---|---|---|
| 여행여권 | 운영 `/opt/phototravelmap-api/app.py`의 계정 삭제·랭킹·대결 로직, 공식 홈/개인정보 문서 | 기기 사진 처리와 선택 계정 분리. 계정·세션·통계 삭제 후 상대방 대결 기록에는 이름/계정 연결을 뺀 스냅샷이 남는 점 명시. 프리미엄은 공개 구매 안내 기준 1회 구매 |
| 필라멘트 | LeeHueeng/filament `lib/iap/iap_service_storekit2.dart`, `lib/pages/settings_page.dart`, `lib/ads/*`, `lib/pages/add_filament_page.dart`, `lib/l10n/app_ko.arb` | lifetime 비소모 구매와 같은 스토어 복원, 배너·일부 추가 흐름의 보상형 광고, 프리미엄 백업/복원과 로컬 저장 구분. 광고를 모두 선택형이라고 단정하지 않음. 구매 시 약속한 광고 제거 범위 보장 |
| 좀 해! | 운영 `/opt/focus-timer/app/lib/core/purchases/purchases.dart`, `core/config/links.dart`, 기존 약관 | 실제 remove_ads 비소모 구매, 계정 귀속 및 복원, 구매 보너스 포인트와 현금 교환 구분. 유료 거래 취소·환불 권리는 보존. 기존 2026-08-28 시행일 유지 |
| 심플차계부 | LeeHueeng/sonata-cafe-app `lib/screens/auth/terms_screen.dart`, `lib/router/app_router.dart`, 공개 약관 | 가입 전 커뮤니티 약관 동의 경로, UGC·신고/차단·장터·포인트·탈퇴 게시물 관계 대조. 계속 이용만으로 필요한 동의를 대신하는 문구 수정. 기존 2026-09-28 시행일 유지 |
| 뚝딱무비 | 운영 `infra/public/terms-2026-10-16.html`, `terms-2026-11-18.html`, nginx 날짜 전환, `server/billing.py`, `server/sync.py`, 공개 capabilities | 현행/예고 문서를 앞당겨 교체하지 않음. 현재 서버 billingAvailable=false, syncAvailable=true, renderAvailable=false이며 이것만으로 기기 내 스토어 구매가 없다고 단정하지 않음. 소개 사이트 약관은 원본 자동 전환을 그대로 따라감 |
| 라스트 블록 | 운영 `server/Program.cs`, `Store.cs`, `PurchaseLedger.cs`, `PurchaseVerifier.cs`, 법률 문서 | 기기 계정·거래 1개당 계정 귀속·다른 기기 복원 시 이전·24시간 확인 유예를 대조. 코드의 옛 이메일 계정 호환을 현재 앱의 로그인 기능으로 오인하지 않음. 기존 2026-10-21 시행일 유지 |
| FixFlow | 공식 지원 페이지(웹 재정비 중), LeeHueeng/fix-flow의 계정·Supabase·현금 흐름 API 및 2026-02-12 약관, fixed_income_expense 웹 소스 | 금융 거래 실행/전문 자문과 기록 도구 구분. 웹 재정비 상태 명시. 약관 게시가 서비스 재개/기존 기록 복구를 뜻하지 않으며 기존 계약 소급 대체 없음 |
| 한장 | 공식 소개, 한국어/영어 개인정보 문서와 공개 스토어 연결 | 유료 앱·로컬 사진/카드·저장/공유·저작권/초상권 구분. 공개 안내 기준이라는 표현 유지 |

## 법적 검토의 기준

- Google Play 공식 판매자 안내: https://support.google.com/googleplay/android-developer/answer/17594752
- 약관의 규제에 관한 법률 제6~14조: https://law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1022322639
- 청약철회 제한의 사전 표시·시험 이용 관련 정부 안내: https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?ccfNo=3&cciNo=3&cnpClsNo=3&csmSeq=25&menuType=cnpcls&popMenu=ov
- EU 디지털 콘텐츠 지침(각국 이행법의 구체적 적용 별도): https://eur-lex.europa.eu/eli/dir/2019/770/oj
- 영국 CMA 공정 약관 안내: https://www.gov.uk/guidance/writing-a-fair-contract-for-customers

공통 보완은 무조건적인 면책·환불 거절·관할 제한·묵시적 동의로 소비자의 강행법상 권리를 줄이지 않는다는 점이다. EEA/UK 적용 권리를 국가별 요건 없이 일괄 보장하거나 철회 기간을 임의로 단정하지 않았다. 신규 약관 게시와 기존 계약 변경의 절차를 구분했다. 법적 적합성 인증이나 변호사 의견서는 아니다.

## 확인 한계와 후속 사항

1. 현재 Mac에서 뚝딱무비 Flutter 원본 작업 폴더가 없고, 여행여권·한장·FixFlow 모바일 원본도 확보하지 못했다. 이 앱들은 운영 서버/공식 공개 문서를 확인했으며 최신 배포 바이너리 전체를 실행·검증한 것은 아니다.
2. 실결제·환불·회원 탈퇴를 실행하지 않았다. 사용자 데이터나 실제 거래를 변경하지 않고 코드와 공개 안내를 대조했다.
3. 뚝딱무비 홈페이지는 로그인을 필수로 소개하지만 약관은 기본 편집의 비회원 이용을 설명한다. 모바일 런타임 확인이 필요하다. 프리미엄의 앱/웹 계정 공유 역시 현재 서버 결제 비활성과 구분해 확인해야 한다. 기존 약관의 예정 시행일을 바꾸거나 검증 없이 혜택을 새로 보장하지 않았다.
4. 필라멘트 설정의 기존 Notion 개인정보 URL은 별도 복구/정식 방침 대조가 필요하다. 이번 약관이 개인정보처리방침을 대신하지 않는다. 모바일 앱의 새 약관 직접 링크 추가/출시는 이번 웹 배포와 별개다.
5. 심플차계부에는 앱에 내장한 커뮤니티 약관 화면이 있다. 웹 약관 변경이 해당 바이너리의 내장 문구를 변경하거나 재동의를 받는 것은 아니다.
6. 뚝딱무비/라스트 블록의 기존 API 도메인 URL은 그대로 유지된다. 새 소개 사이트 경로는 원본 문서와 소비자 권리 보완 안내를 함께 제공한다. 보완 안내는 기존 권리를 축소하지 않는다. 원본의 구조가 바뀌면 nginx sub_filter 삽입과 CSS를 재점검해야 한다.

## 재생성과 배포

`python3 scripts/generate-app-terms.py --passport-root <phototravelmap-site> --sites-root <hueeng-sites>`

- 원본: `lib/legal/app-terms.json`, `lib/legal/app-terms.css`.
- 회사 사이트에는 FixFlow/필라멘트 HTML 및 CSS, 중앙 목록과 이전 주소 리다이렉트만 생성.
- 여행여권/한장 파일은 각 사이트 저장소에 생성해 해당 배포 절차 사용.
- 뚝딱무비/라스트 블록: hueeng-sites nginx가 고정된 공개 문서 경로만 HTTPS 인증서 검증 후 프록시. 계정 쿠키·Authorization 전달 및 Set-Cookie 전달 없음. 원본 개정일 자동 전환을 보존하며 캐시의 짧은 지연은 가능.
- 기존 웹 서비스/데이터베이스/결제 로직 변경 없음. 확인 결과는 별도 QA 기록 참조.

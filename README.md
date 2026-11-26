# 승전공 RP 소개 홈페이지

세계관, 주연 캐릭터, 조연, 수록 이미지로 구성된 정적 멀티 페이지 사이트. 세계관을 먼저 공개하며 나머지 페이지에는 자료가 도착할 때까지 준비 상태를 표시한다.

## Vercel 배포

Vercel에서 GitHub 저장소 `gbe-gif/Ct`를 독립 프로젝트로 가져온다. Root Directory는 저장소 루트, Framework Preset은 Other로 지정한다. 빌드 명령 `node build.mjs`와 출력 폴더 `dist`는 vercel.json에 정의되어 있다. 외부 패키지 설치는 필요 없다.

| 빌드 환경 변수 | 기본값 | 용도 |
| --- | --- | --- |
| BASE_PATH | / | 작품의 공개 경로. 예: /승전공/ |
| SITE_ORIGIN | https:// + VERCEL_URL | 경로 없는 공개 도메인. 페이지별 canonical 및 og:url 생성에 사용 |

현재는 두 변수를 비워 두면 Vercel 기본 배포 주소의 루트에서 열린다. 고정 프로덕션 주소를 대표 URL로 쓰려면 Production 환경의 SITE_ORIGIN에 해당 주소를 지정한다. 로컬에서 도메인을 지정하지 않으면 URL 메타 태그를 생략한다.

## 통합 경로 연결 시

1. Production 환경에 `BASE_PATH=/승전공/`, `SITE_ORIGIN=https://site.gbe88.uk`를 지정한 뒤 다시 배포한다.
2. 통합 라우터에서 작품 경로와 그 아래 요청 전체를 **접두 경로를 보존한 채** 독립 Vercel 프로젝트로 전달한다. 예를 들어 공개 경로 `/승전공/leads/`는 원본의 동일한 경로로 연결한다. CSS도 같은 규칙을 사용한다.
3. 경로 끝의 슬래시를 유지하고, 한글 경로를 이중 인코딩하지 않는다. 직접 방문과 새로고침 시 각각의 index.html을 제공한다. 모든 요청을 첫 페이지로 돌리는 SPA 폴백은 사용하지 않는다.
4. 경로 변경 후 독립 배포에서도 해당 접두 경로로 접근한다. 기존 R2 도메인의 이미지 URL은 절대 주소로 유지한다.

## 로컬 확인 및 콘텐츠 수정

Node.js에서 `node build.mjs`를 실행한 뒤 정적 서버의 문서 루트를 dist로 지정한다. PowerShell에서는 `$env:BASE_PATH='/승전공/'`으로 하위 경로를 시험할 수 있다. 빌드는 dist를 매번 재생성한다. 페이지 본문과 내비게이션은 build.mjs, 레이아웃과 이미지 비율은 style.css에서 관리한다.

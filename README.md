# 🧪 React Feature Lab (React 실무 기능 실험실)

> 실무에서 가장 빈번하게 사용되는 React의 핵심 기능들을 직접 눈으로 보고 조작해보며 학습할 수 있는 실습 프로젝트입니다.  
> 외부 백엔드 API 서버 없이도 **LocalStorage 기반의 Mock API와 더미데이터**를 통해 모든 기능(조회, 추가, 수정, 삭제, 에러 시뮬레이션 등)이 완벽하게 동작하도록 구현되었습니다.

---

## 🚀 주요 실습 기능 및 라우트

| 라우트 경로 | 기능 주제 | 핵심 개념 및 특징 |
| :--- | :--- | :--- |
| **`/`** | 홈 (Overview) | 실험실 전체 기능 요약 및 라우트 네비게이션 |
| **`/state`** | 1. 상태 관리 | `useState`, 이벤트 핸들링(`onClick`, `onChange`), `props` 전달 및 렌더링 흐름 확인 |
| **`/list`** | 2. 리스트 & 조건부 렌더링 | `map`, `filter`, 검색어 및 업무/개인 카테고리 필터링, LocalStorage 실시간 동기화 |
| **`/effect`** | 3. useEffect & API 통신 | 마운트 시 자동 비동기 호출, cleanup 함수 확인, **LocalStorage Mock API** 기반 로딩/에러/CRUD 및 초기화 기능 |
| **`/form`** | 4. 폼 & 유효성 검사 | 제어 컴포넌트(Controlled Component), 실시간 입력 검증, 제출 데이터 LocalStorage 영구 저장 및 최근 제출 내역 관리 |
| **`/context`** | 5. Context & 전역 상태 | `createContext` / `useContext`를 활용한 라이트/다크 모드 전역 테마 관리 및 LocalStorage 지속성 유지 |
| **`/performance`** | 6. 성능 최적화 | `React.memo`, `useMemo`, `useCallback`을 활용하여 1,000개 리스트 렌더링 비용 최적화 비교 |
| **`/error`** | 7. 에러 처리 (ErrorBoundary) | 컴포넌트 렌더링 중 예외 발생 시 전체 앱 크래시를 방지하는 Error Boundary 폴백 UI 실습 |

---

## 💾 LocalStorage 더미데이터 구조

외부 API 호출이 불가능한 환경에서도 모든 페이지가 정상 동작할 수 있도록 LocalStorage를 데이터 저장소로 활용합니다.

- **`lab_effect_todos`**: `EffectPage`에서 사용하는 Mock API 할 일 목록 (비동기 지연 및 오류 시뮬레이션 지원)
- **`lab_list_todos`**: `ListPage`에서 필터링 및 검색에 활용되는 할 일 목록
- **`lab_form_submissions`**: `FormPage`에서 유효성 검사를 통과하고 제출된 사용자 등록 내역
- **`lab_theme`**: `ThemeContext`에서 유지되는 현재 테마 (`light` \| `dark`)

---

## 🛠️ 기술 스택 (Tech Stack)

- **Library / Framework**: React 19, TypeScript
- **Bundler / Build Tool**: Vite 7 (SWC)
- **Routing**: React Router v7 (`react-router-dom`)
- **Storage / Mock**: Web Storage API (`localStorage`)
- **Deployment**: Netlify

---

## 🌐 Netlify 배포 설정 (SPA Routing)

Single Page Application(SPA)의 특성상 페이지 새로고침 시 404 오류가 발생하는 것을 방지하기 위해 다음 설정이 프로젝트에 기본 포함되어 있습니다.

1. **`netlify.toml`**: 빌드 명령어(`npm run build`), 배포 디렉터리(`dist`), SPA 리다이렉트 규칙 명시
2. **`public/_redirects`**: 빌드 시 `dist/` 최상단으로 복사되어 모든 경로 요청(`/*`)을 `/index.html`로 200 전달

### Netlify 배포 정보
- **Build command**: `npm run build`
- **Publish directory**: `dist`

---

## 💻 로컬 개발 환경 실행 방법

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 시작
```bash
npm run dev
```
브라우저에서 `http://localhost:5173`으로 접속합니다.

### 3. 프로덕션 빌드 및 미리보기
```bash
# TypeScript 검사 및 Vite 프로덕션 빌드
npm run build

# 빌드 결과물 로컬 미리보기
npm run preview
```

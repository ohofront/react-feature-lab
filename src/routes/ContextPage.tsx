// src/routes/ContextPage.tsx
import { useTheme } from "../hooks/useTheme";
import { IconLayers, IconMoon, IconSun } from "../components/Icons";

export default function ContextPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-badge">
          <span className="badge badge-indigo">CHAPTER 05 · CONTEXT & GLOBAL STATE</span>
        </div>
        <h1 className="page-title">Context API를 활용한 전역 테마 상태 제어</h1>
        <p className="page-subtitle">
          중간 컴포넌트를 일일이 거치는 Props Drilling 없이, React 컴포넌트 트리의 어느 곳에서나
          전역 상태에 직접 접근하고 변경하는 패턴을 학습합니다.
        </p>
      </div>

      {/* Concept Box */}
      <div className="concept-box">
        <p>
          💡 <b>핵심 원리:</b> <code>createContext</code>로 생성한 컨텍스트 Provider는 트리의 하위 모든
          컴포넌트에 값을 브로드캐스트합니다. 하위 컴포넌트는 커스텀 훅인 <code>useTheme()</code>을 호출하여
          필요한 상태와 토글 함수만 즉시 꺼내 쓸 수 있습니다.
        </p>
      </div>

      {/* Interactive Theme Playground */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Card 1: Theme Switcher */}
        <div className="lab-card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            전역 테마 컨트롤러
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
            여기서 변경된 테마는 상단 네비게이션 및 전체 레이아웃에 즉각 반영됩니다.
          </p>

          <div
            style={{
              padding: "2rem",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              textAlign: "center",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "var(--radius-full)",
                backgroundColor: theme === "light" ? "var(--color-warning-bg)" : "var(--accent-subtle)",
                color: theme === "light" ? "var(--color-warning)" : "var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {theme === "light" ? <IconSun size={32} /> : <IconMoon size={32} />}
            </div>

            <div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>
                {theme === "light" ? "라이트 모드 (Light Mode)" : "다크 모드 (Dark Mode)"}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                설정값은 <code>LocalStorage(lab_theme)</code>에 자동 동기화됩니다.
              </div>
            </div>

            <button onClick={toggleTheme} className="btn btn-primary" style={{ padding: "0.6rem 1.5rem" }}>
              {theme === "light" ? <IconMoon size={16} /> : <IconSun size={16} />}
              <span>{theme === "light" ? "다크 모드로 전환하기" : "라이트 모드로 전환하기"}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Context Tree Architecture */}
        <div className="lab-card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <IconLayers size={18} style={{ color: "var(--accent-primary)" }} />
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>
              컴포넌트 트리 구조 비교
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
            Props Drilling vs Context API 공급 흐름
          </p>

          <div
            style={{
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "var(--accent-primary)", fontWeight: 700 }}>
              &lt;ThemeProvider value=&#123;theme, toggleTheme&#125;&gt;
            </div>
            <div style={{ paddingLeft: "1.2rem", color: "var(--text-muted)" }}>
              │ ── &lt;BrowserRouter&gt;
            </div>
            <div style={{ paddingLeft: "2.4rem", color: "var(--text-muted)" }}>
              │ ── &lt;Layout&gt; (props 전달 불필요)
            </div>
            <div style={{ paddingLeft: "3.6rem", color: "var(--color-success)", fontWeight: 600 }}>
              └── &lt;ContextPage&gt; ⚡ useTheme() 바로 구독!
            </div>
            <div style={{ color: "var(--accent-primary)", fontWeight: 700 }}>
              &lt;/ThemeProvider&gt;
            </div>
          </div>

          <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <b>실무 베스트 프랙티스:</b>
            <br />
            Context의 범위가 너무 넓으면 불필요한 리렌더링이 번질 수 있으므로, 테마/인증 정보처럼 앱 전반에 걸쳐
            필수적인 데이터에 적절히 사용하는 것이 좋습니다.
          </div>
        </div>
      </div>

      {/* Summary Accordion */}
      <details className="lab-summary">
        <summary>학습 핵심 요약 열기</summary>
        <ul>
          <li>
            <code>ThemeProvider</code>가 최상단에서 상태를 공급하므로 중간 단계 컴포넌트가 props를 전달할 필요가 없습니다.
          </li>
          <li>
            <code>useTheme</code> 커스텀 훅을 만들어 컨텍스트가 없는 환경에서의 안전장치(예외 throw)를 구현했습니다.
          </li>
          <li>
            CSS 변수와 연동하여 테마 변경 시 DOM 전반의 색상 토큰이 부드럽게 일괄 전환됩니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

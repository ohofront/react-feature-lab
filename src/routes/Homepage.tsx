// src/routes/Homepage.tsx
import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconBeaker,
  IconBook,
  IconCpu,
  IconLayers,
  IconRefresh,
  IconShield,
  IconZap,
} from "../components/Icons";

const modules = [
  {
    num: "01",
    tag: "STATE & PROPS",
    title: "상태 관리 및 데이터 전달",
    desc: "useState와 이벤트 핸들러를 통한 상태 제어 및 부모-자식 간 props 흐름을 관찰합니다.",
    to: "/state",
    icon: <IconZap size={20} />,
    concepts: ["useState", "Props", "Event Handlers", "Re-render"],
  },
  {
    num: "02",
    tag: "COLLECTIONS",
    title: "리스트 & 조건부 렌더링",
    desc: "배열 매핑(map)과 필터링(filter), 검색어 매칭 및 빈 데이터 분기 처리를 실습합니다.",
    to: "/list",
    icon: <IconLayers size={20} />,
    concepts: ["Array.map", "Array.filter", "Empty State", "LocalStorage"],
  },
  {
    num: "03",
    tag: "LIFECYCLE & ASYNC",
    title: "useEffect & 비동기 API 통신",
    desc: "마운트/언마운트 시점과 클린업, LocalStorage 기반 Mock API를 통한 로딩 및 에러 처리를 다룹니다.",
    to: "/effect",
    icon: <IconRefresh size={20} />,
    concepts: ["useEffect", "Cleanup", "Mock API", "Async State"],
  },
  {
    num: "04",
    tag: "USER INPUT",
    title: "폼 입력 제어 & 실시간 유효성 검사",
    desc: "제어 컴포넌트(Controlled Component) 패턴과 폼 검증, 입력 데이터의 브라우저 영구 보관을 학습합니다.",
    to: "/form",
    icon: <IconBook size={20} />,
    concepts: ["Controlled Inputs", "Validation", "e.preventDefault", "Persistence"],
  },
  {
    num: "05",
    tag: "GLOBAL STATE",
    title: "Context API 전역 테마 관리",
    desc: "Props Drilling 없이 최상위 Provider에서 다크/라이트 테마를 하위 전역으로 안전하게 공급합니다.",
    to: "/context",
    icon: <IconBeaker size={20} />,
    concepts: ["createContext", "useContext", "Provider Pattern", "Theme Tokens"],
  },
  {
    num: "06",
    tag: "PERFORMANCE",
    title: "성능 최적화 & 메모이제이션",
    desc: "React.memo, useMemo, useCallback을 활용해 1,000개 리스트의 불필요한 리렌더링을 방지합니다.",
    to: "/performance",
    icon: <IconCpu size={20} />,
    concepts: ["React.memo", "useMemo", "useCallback", "Render Profiling"],
  },
  {
    num: "07",
    tag: "RELIABILITY",
    title: "ErrorBoundary 예외 격리",
    desc: "런타임 에러가 발생해도 전체 서비스가 중단되지 않도록 보호하는 Error Boundary 폴백 전략을 체험합니다.",
    to: "/error",
    icon: <IconShield size={20} />,
    concepts: ["ErrorBoundary", "Fault Isolation", "Fallback UI", "Self Recovery"],
  },
];

export default function HomePage() {
  return (
    <div className="page-container">
      {/* Hero Header */}
      <section
        style={{
          padding: "2.5rem 2rem",
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-card)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <div className="badge badge-indigo" style={{ marginBottom: "1rem" }}>
            CURRICULUM OVERVIEW
          </div>
          <h1
            style={{
              fontSize: "2.1rem",
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
          >
            실무에서 마주치는 React 핵심 패턴,
            <br />
            직접 조작하며 체득하세요.
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            단순한 이론 암기가 아닌, 각 기능별 라이프사이클과 상태 변화를 눈으로 확인할 수 있는
            인터랙티브 워크벤치입니다. 브라우저 콘솔(F12)과 함께 학습 효과를 극대화해 보세요.
          </p>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <span className="badge badge-neutral">⚡ React 19 최신 표준</span>
            <span className="badge badge-neutral">💾 LocalStorage 독립 저장</span>
            <span className="badge badge-neutral">🌐 Netlify SPA 배포 최적화</span>
          </div>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>실습 모듈 로드맵</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              총 7개의 핸즈온 모듈로 실무 React 기초와 심화를 다집니다.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {modules.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-card)",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--shadow-elevated)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--accent-subtle)",
                      color: "var(--accent-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {m.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                    }}
                  >
                    CHAPTER {m.num}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--accent-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {m.tag}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {m.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                    marginBottom: "1.25rem",
                  }}
                >
                  {m.desc}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.35rem",
                    marginBottom: "1rem",
                  }}
                >
                  {m.concepts.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono)",
                        backgroundColor: "var(--bg-subtle)",
                        color: "var(--text-secondary)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--accent-primary)",
                  }}
                >
                  <span>학습 시작하기</span>
                  <IconArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Guide Callout Box */}
      <section
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          display: "flex",
          gap: "1.25rem",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-warning-bg)",
            color: "var(--color-warning-text)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconBook size={20} />
        </div>
        <div>
          <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.35rem" }}>
            효과적인 실습 학습 팁
          </h4>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            키보드의 <code>F12</code> 키를 눌러 <b>개발자 도구 콘솔</b>을 함께 띄워두세요. 모든
            버튼과 컴포넌트는 상태 변화 시점마다 콘솔 로그를 출력하도록 설계되어 있어, 언제 렌더링이
            발생하고 어떤 데이터가 전달되는지 한눈에 파악할 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}

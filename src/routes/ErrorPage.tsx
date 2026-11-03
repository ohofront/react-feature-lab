// src/routes/ErrorPage.tsx
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useState } from "react";
import { IconAlertTriangle, IconShield, IconZap } from "../components/Icons";

function BuggyComponent() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("실습용으로 고의 발생시킨 런타임 예외입니다! (Simulated Crash)");
  }

  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--bg-subtle)",
        border: "1px dashed var(--border-default)",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "0.75rem", color: "var(--text-secondary)", fontSize: "0.92rem" }}>
        아래 버튼을 누르면 이 컴포넌트 내부에서 즉시 <code>throw new Error()</code>가 발생합니다.
      </div>
      <button
        onClick={() => setShouldCrash(true)}
        className="btn btn-danger"
      >
        <IconAlertTriangle size={16} />
        <span>강제로 컴포넌트 에러 유발하기</span>
      </button>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-badge">
          <span className="badge badge-indigo">CHAPTER 07 · FAULT ISOLATION</span>
        </div>
        <h1 className="page-title">ErrorBoundary를 활용한 런타임 예외 격리</h1>
        <p className="page-subtitle">
          실제 서비스에서 특정 위젯이나 하위 컴포넌트의 버그로 인해 사용자 화면 전체가 새하얗게 멈추는
          White Screen 크래시를 방지하는 방어벽 패턴을 학습합니다.
        </p>
      </div>

      {/* Concept Box */}
      <div className="concept-box">
        <p>
          💡 <b>핵심 원리:</b> <code>ErrorBoundary</code>는 클래스 컴포넌트의 <code>static getDerivedStateFromError</code>와
          <code>componentDidCatch</code> 생명주기 메서드를 사용하여 하위 트리의 렌더링 예외를 포착합니다.
          에러 발생 영역만 대체(Fallback) UI로 교체하여 상위 앱은 정상적으로 유지됩니다.
        </p>
      </div>

      {/* Playground Card */}
      <div className="lab-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <IconShield size={18} style={{ color: "var(--accent-primary)" }} />
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>
            에러 보호막 실험실
          </h3>
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          ErrorBoundary로 감싼 영역과 감싸지 않은 영역의 차이를 확인해 보세요.
        </p>

        {/* Protected Zone */}
        <div
          style={{
            border: "2px solid var(--accent-border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.25rem",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <span className="badge badge-indigo">🛡️ ErrorBoundary 보호 구역 내부</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              &lt;ErrorBoundary&gt; ... &lt;/ErrorBoundary&gt;
            </span>
          </div>

          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </div>

        {/* Safe Zone Note */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--bg-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-success-bg)",
              color: "var(--color-success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IconZap size={15} />
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <b>상위 네비게이션과 전체 앱의 안전성:</b> 에러를 유발해도 상단 네비게이션을 통해 다른 메뉴로 자유롭게
            이동할 수 있으며, ErrorBoundary의 복구 버튼을 누르면 정상 상태로 즉시 돌아옵니다.
          </div>
        </div>
      </div>

      {/* Summary Accordion */}
      <details className="lab-summary">
        <summary>학습 핵심 요약 열기</summary>
        <ul>
          <li>
            리액트 16+에서는 렌더링 중 포착되지 않은 에러가 발생하면 전체 컴포넌트 트리를 마운트 해제(White Screen)합니다.
          </li>
          <li>
            주요 위젯이나 모듈 단위로 <code>ErrorBoundary</code>를 배치하여 한 영역의 장애가 서비스 전체로 전파되지 않도록 격리합니다.
          </li>
          <li>
            폴백 UI에 에러 재시도 로직을 포함하여 사용자가 페이지 새로고침 없이도 복구할 수 있는 뛰어난 UX를 제공합니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

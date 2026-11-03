// src/routes/StatePage.tsx
import { useState } from "react";
import { IconZap } from "../components/Icons";

type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  console.log("[Greeting] 렌더링 - name:", name);
  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--accent-subtle)",
        border: "1px solid var(--accent-border)",
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--accent-primary)",
          marginBottom: "0.25rem",
        }}
      >
        자식 컴포넌트 &lt;Greeting /&gt; 프리뷰
      </div>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
        안녕하세요, <span style={{ color: "var(--accent-primary)" }}>{name || "손님"}</span>님 👋
      </div>
      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
        부모의 input 상태가 변경될 때마다 새로운 props로 자식 컴포넌트가 리렌더링됩니다.
      </div>
    </div>
  );
}

export default function StatePage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("손님");

  const handleIncrement = () => {
    const next = count + 1;
    console.log("버튼 클릭! count가", count, "→", next, "로 변경됩니다.");
    setCount(next);
  };

  const handleDecrement = () => {
    const next = count - 1;
    console.log("버튼 클릭! count가", count, "→", next, "로 변경됩니다.");
    setCount(next);
  };

  const handleReset = () => {
    console.log("카운트 초기화");
    setCount(0);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-badge">
          <span className="badge badge-indigo">CHAPTER 01 · STATE & PROPS</span>
        </div>
        <h1 className="page-title">상태 관리, 이벤트 처리 및 Props 전달</h1>
        <p className="page-subtitle">
          컴포넌트 내부에서 변화하는 상태를 <code>useState</code>로 다루고, 이벤트를 통해 부모에서 자식으로
          데이터를 전달하는 React의 렌더링 메커니즘을 확인합니다.
        </p>
      </div>

      {/* Concept Box */}
      <div className="concept-box">
        <p>
          💡 <b>핵심 원리:</b> <code>useState</code>의 상태 변경 함수(<code>setCount</code>, <code>setName</code>)를
          호출하면 컴포넌트 함수 전체가 재실행(Re-render)되며, 변경된 데이터를 바탕으로 가상 DOM(Virtual DOM)을
          비교하여 실제 화면을 갱신합니다.
        </p>
      </div>

      {/* 2-Column Playground */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Lab 1: Counter */}
        <div className="lab-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--accent-subtle)",
                color: "var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconZap size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>1. 카운터 워크벤치</h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                useState와 onClick 이벤트 핸들러
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "1.75rem",
              textAlign: "center",
              marginBottom: "1.25rem",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              CURRENT STATE VALUE
            </div>
            <div
              style={{
                fontSize: "3.2rem",
                fontWeight: 900,
                fontFamily: "var(--font-mono)",
                color: "var(--accent-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {count}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleDecrement} className="btn btn-secondary" style={{ flex: 1 }}>
              -1 감소
            </button>
            <button onClick={handleIncrement} className="btn btn-primary" style={{ flex: 1.5 }}>
              +1 증가
            </button>
            <button onClick={handleReset} className="btn btn-ghost" style={{ flex: 1 }}>
              초기화
            </button>
          </div>
        </div>

        {/* Lab 2: Name Input & Props */}
        <div className="lab-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-success-bg)",
                color: "var(--color-success)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconZap size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>2. 입력값 바인딩 & Props</h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                onChange 이벤트와 자식 컴포넌트 전달
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: "0.4rem",
                color: "var(--text-secondary)",
              }}
            >
              이름을 입력해 보세요
            </label>
            <input
              className="input-control"
              value={name}
              onChange={(e) => {
                console.log("이름 입력값 변경:", e.target.value);
                setName(e.target.value);
              }}
              placeholder="예: 홍길동"
            />
          </div>

          <Greeting name={name} />
        </div>
      </div>

      {/* State Inspector */}
      <div className="lab-card">
        <h4
          style={{
            fontSize: "0.88rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-muted)",
            marginBottom: "0.5rem",
          }}
        >
          🔍 실시간 상태 인스펙터 (State Inspector)
        </h4>
        <div className="inspector-card">
          {JSON.stringify({ count, name, time: new Date().toLocaleTimeString() }, null, 2)}
        </div>
      </div>

      {/* Summary Accordion */}
      <details className="lab-summary">
        <summary>학습 핵심 요약 열기</summary>
        <ul>
          <li>
            버튼 클릭 시 <code>setCount</code>가 실행되면서 Virtual DOM 비교 후 화면이 리렌더링됩니다.
          </li>
          <li>
            입력창에 글자를 입력할 때마다 <code>setName</code>에 의해 부모와 자식 <code>Greeting</code>이
            동시에 리렌더링됩니다.
          </li>
          <li>
            콘솔 탭에서 <code>[Greeting] 렌더링</code> 로그 출력을 통해 자식 컴포넌트의 재호출 타이밍을 직접
            추적할 수 있습니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

// src/routes/PerformancePage.tsx
import React, { useCallback, useMemo, useState } from "react";
import { IconCpu } from "../components/Icons";

type SlowListProps = {
  items: number[];
  selected: number;
  onSelect: (value: number) => void;
};

function SlowListRaw({ items, selected, onSelect }: SlowListProps) {
  console.log("🐢 [SlowListRaw] 렌더링 시작");

  // 의도적인 CPU 부하 시뮬레이션 (렌더링 비용 체감용)
  const start = performance.now();
  while (performance.now() - start < 4) {
    // 4ms busy loop
  }

  return (
    <div
      style={{
        maxHeight: 280,
        overflowY: "auto",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "0.5rem",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))",
          gap: "4px",
        }}
      >
        {items.map((n) => (
          <button
            key={n}
            onClick={() => onSelect(n)}
            style={{
              padding: "0.35rem 0.2rem",
              fontSize: "0.78rem",
              fontFamily: "var(--font-mono)",
              borderRadius: "4px",
              border: "1px solid var(--border-subtle)",
              backgroundColor:
                n === selected ? "var(--accent-primary)" : "var(--bg-surface)",
              color: n === selected ? "#ffffff" : "var(--text-secondary)",
              fontWeight: n === selected ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.1s ease",
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

// React.memo 적용 컴포넌트
const SlowListMemo = React.memo(SlowListRaw);

export default function PerformancePage() {
  const [selected, setSelected] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [optimize, setOptimize] = useState(false);

  // useMemo로 1,000개 배열 1회만 생성
  const items = useMemo(() => {
    console.log("📦 items 배열 생성 (useMemo)");
    return Array.from({ length: 1000 }, (_, i) => i + 1);
  }, []);

  // useCallback으로 동일 참조 유지
  const handleSelect = useCallback((value: number) => {
    console.log("👉 숫자 선택:", value);
    setSelected(value);
  }, []);

  const ListComponent = optimize ? SlowListMemo : SlowListRaw;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-badge">
          <span className="badge badge-indigo">CHAPTER 06 · PERFORMANCE OPTIMIZATION</span>
        </div>
        <h1 className="page-title">성능 최적화: React.memo, useMemo & useCallback</h1>
        <p className="page-subtitle">
          불필요한 리렌더링을 차단하고 1,000개 이상의 컴포넌트 연산 비용을 아끼는 실무 최적화 기법을 직접
          테스트해봅니다.
        </p>
      </div>

      {/* Concept Box */}
      <div className="concept-box">
        <p>
          💡 <b>핵심 원리:</b> <code>React.memo</code>는 컴포넌트의 props가 이전과 동일하면 이전 렌더링 결과를 재사용합니다.
          자식에게 전달하는 함수나 객체는 <code>useCallback</code>과 <code>useMemo</code>로 감싸야 매 렌더링마다 새로운
          참조가 만들어져 memo가 무력화되는 현상을 방지할 수 있습니다.
        </p>
      </div>

      {/* Main Workbench Card */}
      <div className="lab-card">
        {/* Optimization Switch Banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-md)",
            backgroundColor: optimize ? "var(--color-success-bg)" : "var(--bg-subtle)",
            border: `1px solid ${optimize ? "var(--color-success-border)" : "var(--border-subtle)"}`,
            marginBottom: "1.5rem",
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-md)",
                backgroundColor: optimize ? "var(--color-success)" : "var(--border-default)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconCpu size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                최적화 모드: {optimize ? "React.memo 활성화 (ON)" : "최적화 없음 (OFF)"}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                {optimize
                  ? "무관한 입력 시 느린 리스트가 다시 그려지지 않습니다."
                  : "입력창을 칠 때마다 1,000개 아이템이 전부 불필요하게 리렌더링됩니다."}
              </div>
            </div>
          </div>

          <label className="checkbox-label" style={{ fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={optimize}
              onChange={(e) => setOptimize(e.target.checked)}
            />
            <span>React.memo 최적화 켜기</span>
          </label>
        </div>

        {/* 2-Column Lab Testing Arena */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Left Column: 1,000 Items */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                1,000개 넘버 리스트
              </h3>
              <span className="badge badge-indigo">
                선택된 숫자: #{selected}
              </span>
            </div>

            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              아이템당 의도적 4ms 지연 루프가 걸려 있습니다.
            </p>

            <ListComponent
              items={items}
              selected={selected}
              onSelect={handleSelect}
            />
          </div>

          {/* Right Column: Independent Input Test */}
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              무관한 상태 입력 테스트
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              리스트와 아무 상관이 없는 독립된 keyword 상태입니다.
            </p>

            <input
              className="input-control"
              value={keyword}
              onChange={(e) => {
                console.log("✏️ keyword 변경:", e.target.value);
                setKeyword(e.target.value);
              }}
              placeholder="여기에 연속으로 글자를 빠르게 타이핑해 보세요..."
            />

            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
                🧪 체감 비교 방법:
              </div>
              <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
                <li>
                  <b>최적화 OFF</b> 상태에서 검색창에 글자를 마구 입력하면 키 입력이 버벅이며 콘솔에 <code>[SlowListRaw] 렌더링</code>이 계속 찍힙니다.
                </li>
                <li>
                  <b>최적화 ON</b>으로 체크한 뒤 글자를 입력하면 키 입력이 매우 부드럽고 리스트는 전혀 리렌더링되지 않습니다.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Accordion */}
      <details className="lab-summary">
        <summary>학습 핵심 요약 열기</summary>
        <ul>
          <li>
            <code>React.memo</code>: 컴포넌트의 props 얕은 비교(shallow compare)를 통해 불필요한 재실행을 방어합니다.
          </li>
          <li>
            <code>useMemo</code>: 1~1,000 배열 생성과 같은 고비용 연산의 결과값을 캐싱합니다.
          </li>
          <li>
            <code>useCallback</code>: 이벤트 핸들러 함수의 재생성을 막아 자식 memo 컴포넌트의 props 동일성을 유지시킵니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

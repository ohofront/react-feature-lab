// src/routes/PerformancePage.tsx
import React, { useCallback, useMemo, useState } from "react";

type SlowListProps = {
  items: number[];
  selected: number;
  onSelect: (value: number) => void;
};

function SlowListRaw({ items, selected, onSelect }: SlowListProps) {
  console.log("🐢 [SlowListRaw] 렌더링 시작");

  // 일부러 약간 느리게 만들기 (CPU 바쁘게)
  const start = performance.now();
  while (performance.now() - start < 5) {
    // 5ms 동안 바쁘게 돌기
  }

  return (
    <ul>
      {items.map((n) => (
        <li key={n}>
          <button
            onClick={() => onSelect(n)}
            style={{
              marginRight: 4,
              fontWeight: n === selected ? "bold" : "normal",
            }}
          >
            {n}
          </button>
        </li>
      ))}
    </ul>
  );
}

// React.memo로 감싸서 props가 안 바뀌면 리렌더링 막기
const SlowListMemo = React.memo(SlowListRaw);

export default function PerformancePage() {
  const [selected, setSelected] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [optimize, setOptimize] = useState(false);

  // items 배열을 useMemo로 한 번만 생성
  const items = useMemo(() => {
    console.log("📦 items 배열 생성");
    return Array.from({ length: 1000 }, (_, i) => i + 1);
  }, []);

  // 선택 핸들러를 useCallback으로 메모이제이션
  const handleSelect = useCallback((value: number) => {
    console.log("👉 숫자 선택:", value);
    setSelected(value);
  }, []);

  const ListComponent = optimize ? SlowListMemo : SlowListRaw;

  return (
    <div>
      <h2>6. 성능 최적화 (React.memo / useMemo / useCallback)</h2>
      <p>
        - <b>React.memo</b>로 불필요한 렌더링 막기
        <br />- <b>useMemo</b>로 무거운 계산 결과 캐싱
        <br />- <b>useCallback</b>으로 동일한 함수 참조 유지
      </p>

      <section style={{ marginTop: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={optimize}
            onChange={(e) => {
              console.log("⭐ 최적화 토글:", e.target.checked);
              setOptimize(e.target.checked);
            }}
          />{" "}
          React.memo 최적화 켜기
        </label>
      </section>

      <section style={{ marginTop: "1rem" }}>
        <h3>🔹 느린 리스트 컴포넌트</h3>
        <p>
          아래 1~1000까지 숫자 버튼이 있는 리스트는 일부러 조금 느리게
          만들어뒀습니다.
          <br />
          콘솔을 보면 렌더링이 얼마나 자주 일어나는지 확인할 수 있어요.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <p>선택된 숫자: {selected}</p>
            <ListComponent
              items={items}
              selected={selected}
              onSelect={handleSelect}
            />
          </div>

          <div style={{ flex: 1 }}>
            <p>🔤 옆의 입력창은 리스트와 상관없는 상태입니다.</p>
            <input
              value={keyword}
              onChange={(e) => {
                console.log("✏️ keyword 변경:", e.target.value);
                setKeyword(e.target.value);
              }}
              placeholder="여기에 아무 글자나 입력해 보세요"
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              최적화 OFF 상태에서는 이 입력값을 바꿀 때마다
              <br />
              느린 리스트도 함께 다시 렌더링됩니다.
              <br />
              최적화 ON 상태에서는 리스트가 거의 리렌더링되지 않습니다.
            </p>
          </div>
        </div>
      </section>

      <details style={{ marginTop: "1rem" }}>
        <summary>설명 요약</summary>
        <ul>
          <li>
            <code>React.memo</code>는 props가 같으면 컴포넌트를 다시 그리지
            않는다.
          </li>
          <li>
            <code>useMemo</code>는 무거운 계산 결과(여기선 1~1000 배열)를
            재사용한다.
          </li>
          <li>
            <code>useCallback</code>은 함수 참조가 매번 새로 만들어지는 것을
            막아준다.
          </li>
        </ul>
      </details>
    </div>
  );
}

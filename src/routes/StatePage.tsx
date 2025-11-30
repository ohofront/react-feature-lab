import { useState } from "react";

type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  console.log("[Greeting] 렌더링 - name:", name);
  return <p>안녕하세요, {name}님 👋</p>;
}

export default function StatePage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("손님");

  const handleClick = () => {
    const next = count + 1;
    console.log("버튼 클릭! count가", count, "→", next, "로 변경됩니다.");
    setCount(next);
  };

  return (
    <div>
      <h2>1. useState / 이벤트 / props</h2>
      <p>
        - <b>useState</b>로 컴포넌트 안에서 변하는 값 관리
        <br />- <b>이벤트(onClick)</b>으로 버튼 클릭 처리
        <br />- <b>props</b>로 자식 컴포넌트에 데이터 전달
      </p>

      <section style={{ marginTop: "1rem" }}>
        <h3>🔹 카운터 예제</h3>
        <p>지금 카운트 값: {count}</p>
        <button onClick={handleClick}>+1 증가</button>
      </section>

      <section style={{ marginTop: "1rem" }}>
        <h3>🔹 이름 입력 & Greeting 컴포넌트</h3>
        <input
          value={name}
          onChange={(e) => {
            console.log("이름 입력값 변경:", e.target.value);
            setName(e.target.value);
          }}
          placeholder="이름을 입력해 보세요"
        />
        <Greeting name={name} />
      </section>

      <details style={{ marginTop: "1rem" }}>
        <summary>설명 요약</summary>
        <ul>
          <li>
            버튼 클릭 시 <code>setCount</code>가 실행되면서 화면이 다시
            그려진다.
          </li>
          <li>
            입력창에 글자를 칠 때마다 <code>setName</code> 때문에 Greeting이
            다시 렌더링된다.
          </li>
          <li>
            개발자 도구 콘솔에서 로그를 보고 렌더링 타이밍을 확인해볼 수 있다.
          </li>
        </ul>
      </details>
    </div>
  );
}

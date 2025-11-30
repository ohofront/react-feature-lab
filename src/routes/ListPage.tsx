import { useMemo, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  category: "work" | "personal";
};

const initialTodos: Todo[] = [
  { id: 1, title: "회의록 정리", completed: false, category: "work" },
  { id: 2, title: "React 강의 준비", completed: true, category: "work" },
  { id: 3, title: "장보기", completed: false, category: "personal" },
  { id: 4, title: "운동 30분", completed: true, category: "personal" },
];

export default function ListPage() {
  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");
  const [keyword, setKeyword] = useState("");

  const filteredTodos = useMemo(() => {
    console.log("📌 필터/검색 적용:", { filter, keyword });

    return initialTodos.filter((todo) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "done"
          ? todo.completed
          : !todo.completed;

      const matchesKeyword = todo.title
        .toLowerCase()
        .includes(keyword.toLowerCase());

      return matchesFilter && matchesKeyword;
    });
  }, [filter, keyword]);

  return (
    <div>
      <h2>2. 리스트 & 조건부 렌더링</h2>
      <p>
        - <b>map</b>으로 배열을 화면에 뿌리기
        <br />- <b>filter</b>로 검색/필터링
        <br />- 데이터가 없을 때 별도 메시지 보여주기
      </p>

      <section style={{ marginTop: "1rem" }}>
        <h3>🔎 필터 / 검색</h3>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <button
            onClick={() => {
              console.log("필터: 전체");
              setFilter("all");
            }}
            style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
          >
            전체
          </button>
          <button
            onClick={() => {
              console.log("필터: 완료만");
              setFilter("done");
            }}
            style={{ fontWeight: filter === "done" ? "bold" : "normal" }}
          >
            완료
          </button>
          <button
            onClick={() => {
              console.log("필터: 미완료만");
              setFilter("todo");
            }}
            style={{ fontWeight: filter === "todo" ? "bold" : "normal" }}
          >
            미완료
          </button>
        </div>

        <input
          value={keyword}
          onChange={(e) => {
            console.log("검색어 변경:", e.target.value);
            setKeyword(e.target.value);
          }}
          placeholder="제목으로 검색해 보세요"
          style={{ width: "100%", maxWidth: 320 }}
        />
      </section>

      <section style={{ marginTop: "1rem" }}>
        <h3>📋 할 일 목록</h3>
        {filteredTodos.length === 0 ? (
          <p>조건에 맞는 할 일이 없습니다.</p>
        ) : (
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                [{todo.category === "work" ? "업무" : "개인"}]{" "}
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>{" "}
                {todo.completed ? "✅" : "⏳"}
              </li>
            ))}
          </ul>
        )}
      </section>

      <details style={{ marginTop: "1rem" }}>
        <summary>설명 요약</summary>
        <ul>
          <li>
            <code>map</code>으로 <code>li</code>를 반복 렌더링한다.
          </li>
          <li>
            <code>filter</code>로 필터/검색 조건을 적용한다.
          </li>
          <li>조건에 맞는 데이터가 없으면 “없음” 메시지를 보여준다.</li>
        </ul>
      </details>
    </div>
  );
}

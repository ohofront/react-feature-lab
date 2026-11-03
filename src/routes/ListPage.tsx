// src/routes/ListPage.tsx
import { useMemo, useState, useEffect } from "react";

export type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  category: "work" | "personal";
};

const LIST_STORAGE_KEY = "lab_list_todos";

const defaultTodos: TodoItem[] = [
  { id: 1, title: "회의록 정리", completed: false, category: "work" },
  { id: 2, title: "React 강의 준비", completed: true, category: "work" },
  { id: 3, title: "장보기", completed: false, category: "personal" },
  { id: 4, title: "운동 30분", completed: true, category: "personal" },
];

export default function ListPage() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem(LIST_STORAGE_KEY);
    if (!saved) return defaultTodos;
    try {
      return JSON.parse(saved) as TodoItem[];
    } catch {
      return defaultTodos;
    }
  });

  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");
  const [keyword, setKeyword] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"work" | "personal">("work");

  // LocalStorage 자동 동기화
  useEffect(() => {
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: TodoItem = {
      id: Date.now(),
      title: newTitle.trim(),
      completed: false,
      category: newCategory,
    };

    setTodos((prev) => [newItem, ...prev]);
    setNewTitle("");
  };

  const handleReset = () => {
    setTodos(defaultTodos);
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(defaultTodos));
  };

  const filteredTodos = useMemo(() => {
    console.log("📌 필터/검색 적용:", { filter, keyword });

    return todos.filter((todo) => {
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
  }, [todos, filter, keyword]);

  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    todos
  );

  return (
    <div>
      <h2>2. 리스트 & 조건부 렌더링 (LocalStorage 연동)</h2>
      <p>
        - <b>map</b>으로 배열을 화면에 뿌리기
        <br />- <b>filter</b>로 검색/필터링
        <br />- LocalStorage에 저장되어 새로고침 후에도 유지되며 추가/완료/삭제가
        모두 동작합니다.
      </p>

      {/* 새 항목 추가 폼 */}
      <section style={{ marginTop: "1rem" }}>
        <h3>➕ 새 할 일 추가</h3>
        <form
          onSubmit={handleAdd}
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          <select
            value={newCategory}
            onChange={(e) =>
              setNewCategory(e.target.value as "work" | "personal")
            }
            style={{ padding: "0.4rem" }}
          >
            <option value="work">업무</option>
            <option value="personal">개인</option>
          </select>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="할 일을 입력하세요"
            style={{ padding: "0.4rem", flex: 1, minWidth: 200 }}
          />
          <button type="submit" disabled={!newTitle.trim()}>
            추가
          </button>
          <button type="button" onClick={handleReset} style={{ fontSize: "0.85rem" }}>
            기본값 복원
          </button>
        </form>
      </section>

      {/* 필터 및 검색 */}
      <section style={{ marginTop: "1.5rem" }}>
        <h3>🔎 필터 / 검색</h3>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <button
            onClick={() => setFilter("all")}
            style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
          >
            전체 ({todos.length})
          </button>
          <button
            onClick={() => setFilter("done")}
            style={{ fontWeight: filter === "done" ? "bold" : "normal" }}
          >
            완료 ({completedCount})
          </button>
          <button
            onClick={() => setFilter("todo")}
            style={{ fontWeight: filter === "todo" ? "bold" : "normal" }}
          >
            미완료 ({todos.length - completedCount})
          </button>
        </div>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="제목으로 검색해 보세요"
          style={{ width: "100%", maxWidth: 320, padding: "0.4rem" }}
        />
      </section>

      {/* 리스트 출력 */}
      <section style={{ marginTop: "1.5rem" }}>
        <h3>📋 할 일 목록 ({filteredTodos.length}개)</h3>
        {filteredTodos.length === 0 ? (
          <p style={{ color: "#718096" }}>조건에 맞는 할 일이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem 0.75rem",
                  margin: "0.3rem 0",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                }}
              >
                <div
                  onClick={() => handleToggle(todo.id)}
                  style={{ cursor: "pointer", flex: 1 }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      marginRight: "0.5rem",
                      backgroundColor:
                        todo.category === "work" ? "#ebf8ff" : "#feebc8",
                      color:
                        todo.category === "work" ? "#2b6cb0" : "#c05621",
                    }}
                  >
                    {todo.category === "work" ? "업무" : "개인"}
                  </span>
                  <span
                    style={{
                      textDecoration: todo.completed
                        ? "line-through"
                        : "none",
                      opacity: todo.completed ? 0.6 : 1,
                    }}
                  >
                    {todo.title}
                  </span>{" "}
                  {todo.completed ? "✅" : "⏳"}
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.2rem 0.5rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  삭제
                </button>
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
          <li>
            <code>LocalStorage</code>와 상태가 연결되어 브라우저 새로고침 시에도
            수정/추가된 데이터가 유지된다.
          </li>
        </ul>
      </details>
    </div>
  );
}

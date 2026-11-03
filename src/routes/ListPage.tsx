// src/routes/ListPage.tsx
import { useMemo, useState, useEffect } from "react";
import {
  IconCheck,
  IconFilter,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconTrash,
} from "../components/Icons";

export type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  category: "work" | "personal";
};

const LIST_STORAGE_KEY = "lab_list_todos";

const defaultTodos: TodoItem[] = [
  { id: 1, title: "회의록 정리 및 핵심 아젠다 공유", completed: false, category: "work" },
  { id: 2, title: "React 19 컴포넌트 아키텍처 실습 준비", completed: true, category: "work" },
  { id: 3, title: "주간 장보기 (식재료 및 생필품)", completed: false, category: "personal" },
  { id: 4, title: "가벼운 조깅 및 스트레칭 30분", completed: true, category: "personal" },
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
    [todos]
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-badge">
          <span className="badge badge-indigo">CHAPTER 02 · COLLECTIONS & FILTERING</span>
        </div>
        <h1 className="page-title">리스트 렌더링 & 실시간 조건부 필터링</h1>
        <p className="page-subtitle">
          자바스크립트 <code>Array.prototype.map</code>과 <code>filter</code>를 활용해 데이터를
          선언적으로 화면에 그리고, <code>LocalStorage</code> 연동으로 브라우저에 상태를 유지합니다.
        </p>
      </div>

      {/* Concept Box */}
      <div className="concept-box">
        <p>
          💡 <b>핵심 원리:</b> 리스트를 렌더링할 때는 각 항목에 고유한 <code>key</code> prop을 부여해야
          React가 변경된 항목만 효율적으로 재배치합니다. <code>useMemo</code>를 통해 검색어와 필터가
          변경될 때만 연산을 수행하여 성능 낭비를 방지합니다.
        </p>
      </div>

      {/* Workbench Card */}
      <div className="lab-card">
        {/* Add Task Form */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            새로운 할 일 등록
          </h3>
          <form
            onSubmit={handleAdd}
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
          >
            <select
              className="input-control"
              value={newCategory}
              onChange={(e) =>
                setNewCategory(e.target.value as "work" | "personal")
              }
              style={{ width: "auto", minWidth: 100 }}
            >
              <option value="work">💼 업무</option>
              <option value="personal">🏠 개인</option>
            </select>
            <input
              className="input-control"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="추가할 할 일 내용을 입력하세요..."
              style={{ flex: 1, minWidth: 220 }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!newTitle.trim()}
            >
              <IconPlus size={16} />
              <span>추가</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
              title="초기 더미데이터로 되돌리기"
            >
              <IconRefresh size={15} />
              <span>초기화</span>
            </button>
          </form>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border-subtle)",
            marginBottom: "1.25rem",
          }}
        >
          {/* Segmented Filter Pills */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "var(--bg-subtle)",
              padding: "0.25rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <button
              type="button"
              onClick={() => setFilter("all")}
              style={{
                border: "none",
                background: filter === "all" ? "var(--bg-surface)" : "transparent",
                color: filter === "all" ? "var(--text-primary)" : "var(--text-secondary)",
                fontWeight: filter === "all" ? 700 : 500,
                fontSize: "0.82rem",
                padding: "0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                boxShadow: filter === "all" ? "var(--shadow-sm)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              전체 ({todos.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("done")}
              style={{
                border: "none",
                background: filter === "done" ? "var(--bg-surface)" : "transparent",
                color: filter === "done" ? "var(--color-success-text)" : "var(--text-secondary)",
                fontWeight: filter === "done" ? 700 : 500,
                fontSize: "0.82rem",
                padding: "0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                boxShadow: filter === "done" ? "var(--shadow-sm)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              완료 ({completedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("todo")}
              style={{
                border: "none",
                background: filter === "todo" ? "var(--bg-surface)" : "transparent",
                color: filter === "todo" ? "var(--accent-text)" : "var(--text-secondary)",
                fontWeight: filter === "todo" ? 700 : 500,
                fontSize: "0.82rem",
                padding: "0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                boxShadow: filter === "todo" ? "var(--shadow-sm)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              미완료 ({todos.length - completedCount})
            </button>
          </div>

          {/* Search Input */}
          <div style={{ position: "relative", minWidth: 240 }}>
            <div
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            >
              <IconSearch size={16} />
            </div>
            <input
              className="input-control"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="제목 검색..."
              style={{ paddingLeft: "2.2rem" }}
            />
          </div>
        </div>

        {/* Task Items List */}
        <div>
          {filteredTodos.length === 0 ? (
            <div
              style={{
                padding: "3rem 1rem",
                textAlign: "center",
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--border-default)",
              }}
            >
              <div
                style={{
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                <IconFilter size={32} />
              </div>
              <div style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                조건에 일치하는 항목이 없습니다
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                검색어를 변경하거나 다른 필터 탭을 선택해 보세요.
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    backgroundColor: "var(--bg-surface)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    onClick={() => handleToggle(todo.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      cursor: "pointer",
                      flex: 1,
                    }}
                  >
                    {/* Custom Checkbox Circle */}
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "var(--radius-full)",
                        border: todo.completed
                          ? "none"
                          : "2px solid var(--border-default)",
                        backgroundColor: todo.completed
                          ? "var(--color-success)"
                          : "transparent",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.15s ease",
                      }}
                    >
                      {todo.completed && <IconCheck size={14} />}
                    </div>

                    {/* Category Tag */}
                    <span
                      className={`badge ${
                        todo.category === "work" ? "badge-indigo" : "badge-warning"
                      }`}
                      style={{ fontSize: "0.68rem" }}
                    >
                      {todo.category === "work" ? "업무" : "개인"}
                    </span>

                    {/* Title */}
                    <span
                      style={{
                        fontSize: "0.92rem",
                        color: todo.completed
                          ? "var(--text-muted)"
                          : "var(--text-primary)",
                        textDecoration: todo.completed ? "line-through" : "none",
                        transition: "color 0.15s ease",
                      }}
                    >
                      {todo.title}
                    </span>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="btn btn-ghost btn-sm"
                    title="항목 삭제"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-danger)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                    }}
                  >
                    <IconTrash size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Accordion */}
      <details className="lab-summary">
        <summary>학습 핵심 요약 열기</summary>
        <ul>
          <li>
            <code>map</code>을 통한 반복 렌더링 시 반드시 고유 <code>key</code>를 지정하여 Virtual DOM 재조정 비용을 절감합니다.
          </li>
          <li>
            <code>useMemo</code>를 통해 <code>todos</code>, <code>filter</code>, <code>keyword</code> 변경 시에만 배열 필터링을 재실행합니다.
          </li>
          <li>
            <code>LocalStorage</code>와 동기화되어 페이지 새로고침 시에도 추가/완료/삭제 상태가 안전하게 복원됩니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

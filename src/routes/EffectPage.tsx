// src/routes/EffectPage.tsx
import { useEffect, useState } from "react";
import { mockTodoApi, type Todo } from "../services/mockApi";
import {
  IconAlertTriangle,
  IconCheck,
  IconPlus,
  IconRefresh,
  IconTrash,
} from "../components/Icons";

export default function EffectPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [simulateError, setSimulateError] = useState(false);
  const [fetchTimestamp, setFetchTimestamp] = useState<string>("");

  const fetchTodos = async (forceError?: boolean) => {
    try {
      console.log("API 호출 시작 (LocalStorage Mock API)");
      setLoading(true);
      setError(null);

      const isFail = forceError !== undefined ? forceError : simulateError;
      const data = await mockTodoApi.fetchTodos(isFail);
      console.log("API 응답 데이터:", data);
      setTodos(data);
      setFetchTimestamp(new Date().toLocaleTimeString());
    } catch (e: unknown) {
      console.error("API 호출 중 에러:", e);
      setError(
        e instanceof Error
          ? e.message
          : "데이터를 불러오는 중 문제가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("EffectPage 처음 마운트됨 → API 자동 호출");
    fetchTodos();

    return () => {
      console.log("EffectPage 언마운트됨 (화면에서 사라짐 / Cleanup)");
    };
  }, []);

  const handleToggle = async (id: number) => {
    try {
      const updated = await mockTodoApi.toggleTodo(id);
      setTodos(updated);
    } catch (e) {
      console.error("할 일 상태 변경 실패:", e);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setLoading(true);
      await mockTodoApi.addTodo(newTitle);
      setNewTitle("");
      const updated = await mockTodoApi.fetchTodos(false);
      setTodos(updated);
    } catch (e) {
      console.error("할 일 추가 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const updated = await mockTodoApi.deleteTodo(id);
      setTodos(updated);
    } catch (e) {
      console.error("할 일 삭제 실패:", e);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      setError(null);
      const reset = await mockTodoApi.resetTodos();
      setTodos(reset);
      setFetchTimestamp(new Date().toLocaleTimeString());
    } catch (e) {
      console.error("더미데이터 초기화 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-badge">
          <span className="badge badge-indigo">CHAPTER 03 · LIFECYCLE & ASYNC</span>
        </div>
        <h1 className="page-title">useEffect 생명주기 & LocalStorage Mock API</h1>
        <p className="page-subtitle">
          컴포넌트의 마운트/언마운트 시점과 클린업 함수를 제어하고, 외부 API 통신 장애 환경에서도
          <code>LocalStorage</code> 기반 모의 비동기 통신으로 로딩, 에러, CRUD를 실습합니다.
        </p>
      </div>

      {/* Concept Box */}
      <div className="concept-box">
        <p>
          💡 <b>핵심 원리:</b> <code>useEffect(callback, [])</code>의 빈 배열은 마운트 시 단 1회 실행을
          보장합니다. 반환되는 콜백 함수는 컴포넌트가 언마운트되거나 다음 이펙트가 실행되기 전 호출되어
          이벤트 리스너 해제나 타이머 정리(Cleanup)를 수행합니다.
        </p>
      </div>

      {/* Main Workbench Card */}
      <div className="lab-card">
        {/* Action Controls Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => fetchTodos()}
              className="btn btn-secondary"
              disabled={loading}
            >
              <IconRefresh size={15} />
              <span>다시 불러오기</span>
            </button>
            <button
              onClick={handleReset}
              className="btn btn-ghost"
              disabled={loading}
            >
              초기 데이터 복원
            </button>
          </div>

          <label className="checkbox-label" style={{ fontSize: "0.85rem" }}>
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => setSimulateError(e.target.checked)}
            />
            <span>⚠️ API 장애 모드 시뮬레이션</span>
          </label>
        </div>

        {/* Add Todo Input Form */}
        <form
          onSubmit={handleAdd}
          style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}
        >
          <input
            className="input-control"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Mock API로 전송할 새 할 일 등록..."
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !newTitle.trim()}
          >
            <IconPlus size={16} />
            <span>등록</span>
          </button>
        </form>

        {/* Loading Indicator */}
        {loading && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--accent-subtle)",
              color: "var(--accent-text)",
              border: "1px solid var(--accent-border)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.88rem",
              fontWeight: 500,
              marginBottom: "1rem",
            }}
          >
            <IconRefresh size={16} style={{ animation: "spin 1s linear infinite" }} />
            <span>비동기 통신 처리 중... (350ms 레이턴시 시뮬레이션)</span>
          </div>
        )}

        {/* Error Callout Banner */}
        {error && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-danger-bg)",
              color: "var(--color-danger-text)",
              border: "1px solid var(--color-danger-border)",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <IconAlertTriangle size={20} style={{ color: "var(--color-danger)", flexShrink: 0, marginTop: "2px" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.2rem" }}>
                통신 예외 발생
              </div>
              <div style={{ fontSize: "0.85rem" }}>{error}</div>
              <button
                onClick={() => fetchTodos(false)}
                className="btn btn-danger btn-sm"
                style={{ marginTop: "0.6rem" }}
              >
                정상 모드로 재시도
              </button>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
            }}
          >
            <span>응답 데이터 ({todos.length}건)</span>
            {fetchTimestamp && <span>마지막 응답: {fetchTimestamp}</span>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {todos.map((todo) => (
              <div
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  backgroundColor: "var(--bg-subtle)",
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
                  <div
                    style={{
                      width: 20,
                      height: 20,
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
                    }}
                  >
                    {todo.completed && <IconCheck size={12} />}
                  </div>

                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: todo.completed
                        ? "var(--text-muted)"
                        : "var(--text-primary)",
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    #{todo.id} {todo.title}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-ghost btn-sm"
                  title="삭제"
                  style={{ color: "var(--text-muted)" }}
                >
                  <IconTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Accordion */}
      <details className="lab-summary">
        <summary>학습 핵심 요약 열기</summary>
        <ul>
          <li>
            컴포넌트가 화면에 마운트되는 즉시 <code>useEffect</code>를 통해 초기 데이터를 안전하게 fetch합니다.
          </li>
          <li>
            비동기 통신 중 <code>loading</code> 상태를 두어 사용자에게 스켈레톤이나 진행 상태를 제공합니다.
          </li>
          <li>
            <code>try-catch-finally</code> 구문으로 오류를 캐치하고 사용자에게 친절한 복구 액션을 제시합니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

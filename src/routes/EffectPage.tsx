// src/routes/EffectPage.tsx
import { useEffect, useState } from "react";
import { mockTodoApi, type Todo } from "../services/mockApi";

export default function EffectPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [simulateError, setSimulateError] = useState(false);

  const fetchTodos = async (forceError?: boolean) => {
    try {
      console.log("API 호출 시작 (LocalStorage Mock API)");
      setLoading(true);
      setError(null);

      const isFail = forceError !== undefined ? forceError : simulateError;
      const data = await mockTodoApi.fetchTodos(isFail);
      console.log("API 응답 데이터:", data);
      setTodos(data);
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
      console.log("EffectPage 언마운트됨 (화면에서 사라짐)");
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
    } catch (e) {
      console.error("더미데이터 초기화 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>3. useEffect & API 호출 (LocalStorage Mock API)</h2>
      <p>
        - 컴포넌트가 화면에 나타날 때(API 호출 시점) <br />
        - 컴포넌트가 사라질 때(cleanup 로그) <br />- 외부 API 대신 LocalStorage
        기반 더미 API로 로딩/에러/CRUD 상태를 완벽하게 실습합니다.
      </p>

      {/* 액션 컨트롤 바 */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <button onClick={() => fetchTodos()} disabled={loading}>
          🔄 다시 불러오기
        </button>
        <button onClick={handleReset} disabled={loading}>
          🧹 더미데이터 초기화
        </button>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={simulateError}
            onChange={(e) => setSimulateError(e.target.checked)}
          />
          ⚠️ API 오류 모드 시뮬레이션
        </label>
      </div>

      {/* 새 할 일 추가 */}
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
      >
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="새로운 할 일 입력..."
          style={{
            padding: "0.4rem 0.6rem",
            flex: 1,
            maxWidth: 320,
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button type="submit" disabled={loading || !newTitle.trim()}>
          추가
        </button>
      </form>

      {/* 로딩 / 에러 안내 */}
      {loading && <p style={{ color: "#3182ce" }}>⏳ 데이터를 불러오는 중...</p>}
      {error && (
        <div
          style={{
            color: "#e53e3e",
            backgroundColor: "#fff5f5",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            border: "1px solid #feb2b2",
          }}
        >
          {error}
        </div>
      )}

      {/* 리스트 출력 */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
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
            <span
              onClick={() => handleToggle(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
                flex: 1,
              }}
            >
              {todo.completed ? "✅ " : "⏳ "}
              {todo.title}
            </span>
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
        {todos.length === 0 && !loading && !error && (
          <p style={{ color: "#718096" }}>등록된 할 일이 없습니다.</p>
        )}
      </ul>

      <details style={{ marginTop: "1rem" }}>
        <summary>설명 요약</summary>
        <ul>
          <li>
            외부 네트워크 통신 불가 환경에서도 <code>LocalStorage</code>를 통해
            더미데이터 CRUD가 원활히 동작합니다.
          </li>
          <li>
            <code>useEffect</code>의 첫 마운트 시 자동 비동기 호출 및 로딩 스피너
            상태를 관리합니다.
          </li>
          <li>
            에러 시뮬레이션을 체크하고 다시 불러오면 에러 UI와 예외 처리 패턴을
            체험할 수 있습니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

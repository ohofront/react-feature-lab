import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function EffectPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      console.log("API 호출 시작");
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      if (!res.ok) throw new Error("API 요청 실패");

      const data: Todo[] = await res.json();
      console.log("API 응답 데이터:", data);
      setTodos(data);
    } catch (e) {
      console.error("API 호출 중 에러:", e);
      setError("데이터를 불러오는 중 문제가 발생했습니다.");
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

  return (
    <div>
      <h2>3. useEffect & API 호출</h2>
      <p>
        - 컴포넌트가 화면에 나타날 때(API 호출 시점) <br />
        - 컴포넌트가 사라질 때(cleanup 로그) <br />를 <b>useEffect</b>로
        확인해봅니다.
      </p>

      <button onClick={fetchTodos}>다시 불러오기</button>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            #{todo.id} {todo.title} {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}

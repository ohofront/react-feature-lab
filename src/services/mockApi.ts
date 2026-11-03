// src/services/mockApi.ts

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const EFFECT_TODOS_STORAGE_KEY = "lab_effect_todos";

export const initialEffectTodos: Todo[] = [
  { id: 1, title: "React 19 핵심 문법 복습하기", completed: false },
  { id: 2, title: "LocalStorage 연동 더미데이터 구현", completed: true },
  { id: 3, title: "useEffect 라이프사이클 및 클린업 확인", completed: true },
  { id: 4, title: "Netlify SPA 라우팅 리다이렉트 설정", completed: false },
  { id: 5, title: "Git 커밋 및 원격 저장소 배포 준비", completed: false },
];

/**
 * 실제 외부 API 통신 대신 LocalStorage를 활용하여
 * 네트워크 지연(delay)과 에러 상황을 시뮬레이션하는 Mock API 모듈
 */
export const mockTodoApi = {
  async fetchTodos(simulateError = false): Promise<Todo[]> {
    // 350ms 비동기 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (simulateError) {
      throw new Error("모의 API 네트워크 오류: 요청을 처리하지 못했습니다.");
    }

    const raw = localStorage.getItem(EFFECT_TODOS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(
        EFFECT_TODOS_STORAGE_KEY,
        JSON.stringify(initialEffectTodos)
      );
      return [...initialEffectTodos];
    }

    try {
      return JSON.parse(raw) as Todo[];
    } catch {
      localStorage.setItem(
        EFFECT_TODOS_STORAGE_KEY,
        JSON.stringify(initialEffectTodos)
      );
      return [...initialEffectTodos];
    }
  },

  async addTodo(title: string): Promise<Todo> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const todos = await mockTodoApi.fetchTodos(false);
    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };
    const updated = [newTodo, ...todos];
    localStorage.setItem(EFFECT_TODOS_STORAGE_KEY, JSON.stringify(updated));
    return newTodo;
  },

  async toggleTodo(id: number): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const todos = await mockTodoApi.fetchTodos(false);
    const updated = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    localStorage.setItem(EFFECT_TODOS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  async deleteTodo(id: number): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const todos = await mockTodoApi.fetchTodos(false);
    const updated = todos.filter((item) => item.id !== id);
    localStorage.setItem(EFFECT_TODOS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  async resetTodos(): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    localStorage.setItem(
      EFFECT_TODOS_STORAGE_KEY,
      JSON.stringify(initialEffectTodos)
    );
    return [...initialEffectTodos];
  },
};

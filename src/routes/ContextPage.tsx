import { useTheme } from "../hooks/useTheme";

export default function ContextPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h2>5. Context & 전역 상태</h2>
      <p>
        - 여러 컴포넌트가 함께 쓰는 값을 <b>Context</b>로 관리
        <br />- props로 일일이 전달하지 않고 바로 꺼내 쓰는 패턴
      </p>

      <p>현재 테마: {theme === "light" ? "라이트 모드 🌞" : "다크 모드 🌙"}</p>
      <button onClick={toggleTheme}>테마 토글</button>
    </div>
  );
}

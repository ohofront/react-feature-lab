import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h2>🎯 이 프로젝트에서 배우는 것</h2>
      <p>
        실무에서 자주 쓰는 React 기능을 “눈으로 보고, 눌러보고” 이해하는 실습
        페이지입니다.
      </p>

      <ul>
        <li>
          <Link to="/state">useState / props / 이벤트</Link>
        </li>
        <li>
          <Link to="/list">리스트 & 조건 렌더링</Link>
        </li>
        <li>
          <Link to="/effect">useEffect & API 호출</Link>
        </li>
        <li>
          <Link to="/form">폼 & 유효성 검사</Link>
        </li>
        <li>
          <Link to="/context">Context로 전역 상태 관리</Link>
        </li>
        <li>
          <Link to="/performance">성능 최적화 - 불필요 렌더링 줄이기</Link>
        </li>
        <li>
          <Link to="/error">Error Boundary로 에러 잡기</Link>
        </li>
      </ul>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        강의에서는 각 페이지를 열고, 버튼 클릭 → 콘솔 로그/알림창을 함께 보면서
        하나씩 설명하면 됩니다.
      </p>
    </div>
  );
}

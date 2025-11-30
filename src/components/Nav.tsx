import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "홈" },
  { to: "/state", label: "상태 관리" },
  { to: "/list", label: "리스트 & 조건 렌더링" },
  { to: "/effect", label: "useEffect & API" },
  { to: "/form", label: "폼 & 유효성 검사" },
  { to: "/context", label: "Context & 전역 상태" },
  { to: "/performance", label: "성능 최적화" },
  { to: "/error", label: "에러 처리" },
];

export default function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginTop: "0.5rem",
      }}
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            padding: "0.3rem 0.7rem",
            borderRadius: "999px",
            border: "1px solid #ddd",
            textDecoration: "none",
            fontSize: "0.85rem",
            backgroundColor: isActive ? "#222" : "#fff",
            color: isActive ? "#fff" : "#333",
          })}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

// src/components/Nav.tsx
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", num: "00", label: "개요" },
  { to: "/state", num: "01", label: "상태 & Props" },
  { to: "/list", num: "02", label: "리스트 & 필터" },
  { to: "/effect", num: "03", label: "useEffect & API" },
  { to: "/form", num: "04", label: "폼 & 유효성" },
  { to: "/context", num: "05", label: "전역 Context" },
  { to: "/performance", num: "06", label: "성능 최적화" },
  { to: "/error", num: "07", label: "에러 처리" },
];

export default function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        overflowX: "auto",
        paddingBottom: "2px",
        scrollbarWidth: "none",
      }}
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.35rem 0.75rem",
            borderRadius: "var(--radius-full)",
            fontSize: "0.82rem",
            fontWeight: isActive ? 600 : 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "all 0.15s ease",
            backgroundColor: isActive ? "var(--accent-primary)" : "transparent",
            color: isActive ? "#ffffff" : "var(--text-secondary)",
            boxShadow: isActive ? "0 2px 6px rgba(79, 70, 229, 0.28)" : "none",
          })}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              opacity: 0.75,
            }}
          >
            {link.num}
          </span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

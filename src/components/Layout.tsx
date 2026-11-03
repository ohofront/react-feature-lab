// src/components/Layout.tsx
import React from "react";
import Nav from "./Nav";
import { useTheme } from "../hooks/useTheme";
import { IconBeaker, IconMoon, IconSun } from "./Icons";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navigation Bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-subtle)",
          backdropFilter: "blur(12px)",
          transition: "background-color 0.25s, border-color 0.25s",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0.85rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--accent-primary)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(79, 70, 229, 0.35)",
              }}
            >
              <IconBeaker size={18} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                React Feature Lab
                <span className="badge badge-indigo" style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem" }}>
                  v1.0
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                Interactive Hands-on Curriculum
              </div>
            </div>
          </Link>

          {/* Right Header Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-secondary btn-sm"
              title={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
              style={{
                padding: "0.4rem 0.75rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              {theme === "light" ? (
                <>
                  <IconMoon size={15} style={{ color: "var(--accent-primary)" }} />
                  <span>다크 모드</span>
                </>
              ) : (
                <>
                  <IconSun size={15} style={{ color: "#fbbf24" }} />
                  <span>라이트 모드</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Course Tabs Nav */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-canvas)",
          }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0.4rem 1.25rem" }}>
            <Nav />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          maxWidth: 1080,
          width: "100%",
          margin: "0 auto",
          padding: "2rem 1.25rem 4rem",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-surface)",
          padding: "1.5rem 1.25rem",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
          }}
        >
          <div>React Feature Lab · 실무 핵심 기능 인터랙티브 워크벤치</div>
          <div>LocalStorage 독립 동작 · Netlify 배포 최적화</div>
        </div>
      </footer>
    </div>
  );
}

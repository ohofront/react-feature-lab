// src/components/Layout.tsx
import Nav from "../components/Nav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "1.5rem 1rem",
        textAlign: "left",
      }}
    >
      <header>
        <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem 0" }}>
          React 실무 기능 실험실
        </h1>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, margin: 0 }}>
          버튼을 클릭하고 입력하며 브라우저 콘솔 및 LocalStorage와 함께 React의
          핵심 기능을 직접 확인합니다.
        </p>
      </header>

      <Nav />
      <hr style={{ margin: "1.2rem 0", borderColor: "#718096", opacity: 0.3 }} />
      <main>{children}</main>
    </div>
  );
}

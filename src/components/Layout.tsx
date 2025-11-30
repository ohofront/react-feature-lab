import Nav from "../components/Nav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "1rem" }}>
      <h1>React 실무 기능 실험실</h1>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        버튼 누를 때마다 콘솔 로그를 보면서 React 동작을 직접 느껴봅니다.
      </p>
      <Nav />
      <hr style={{ margin: "1rem 0" }} />
      {children}
    </div>
  );
}

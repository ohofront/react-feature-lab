// src/components/ErrorBoundary.tsx
import React from "react";
import { IconAlertTriangle, IconRefresh, IconShield } from "./Icons";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message || "알 수 없는 오류" };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("🚨 ErrorBoundary에서 하위 컴포넌트 예외를 포착했습니다:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "1.75rem",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "var(--color-danger-bg)",
            border: "1px solid var(--color-danger-border)",
            color: "var(--color-danger-text)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-danger)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconShield size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--color-danger-text)" }}>
                하위 컴포넌트 오류 격리 성공 (Error Boundary Caught)
              </h4>
              <p style={{ fontSize: "0.78rem", color: "var(--color-danger-text)", opacity: 0.85, margin: 0 }}>
                예외가 발생했으나 상위 화면 전체가 중단되지 않고 안전하게 보호되었습니다.
              </p>
            </div>
          </div>

          <div
            style={{
              margin: "1rem 0",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "rgba(0,0,0,0.05)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <IconAlertTriangle size={16} />
            <span>포착된 에러 메시지: {this.state.errorMessage}</span>
          </div>

          <button
            onClick={this.handleReset}
            className="btn btn-secondary btn-sm"
            style={{
              borderColor: "var(--color-danger-border)",
              color: "var(--color-danger-text)",
            }}
          >
            <IconRefresh size={14} />
            <span>상태 복구 및 컴포넌트 재시도</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("ErrorBoundary에서 에러를 잡았습니다:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>무언가 잘못되었습니다. 새로고침 해주세요.</p>;
    }
    return this.props.children;
  }
}

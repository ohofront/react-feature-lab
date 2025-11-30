// src/routes/ErrorPage.tsx
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useState } from "react";

function BuggyComponent() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("일부러 발생시킨 에러!");
  }

  return (
    <div>
      <p>아래 버튼을 누르면 에러가 발생합니다.</p>
      <button onClick={() => setShouldCrash(true)}>에러 발생시키기</button>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div>
      <h2>7. 에러 처리 (Error Boundary)</h2>
      <p>
        실제 서비스에서는 사용자가 보는 화면이 통째로 깨지지 않도록 보호막을
        둡니다.
      </p>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}

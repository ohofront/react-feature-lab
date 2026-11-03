// src/routes/FormPage.tsx
import { type FormEvent, useState, useEffect } from "react";
import {
  IconAlertTriangle,
  IconCheck,
  IconTrash,
} from "../components/Icons";

export type FormSubmission = {
  id: string;
  name: string;
  email: string;
  agree: boolean;
  submittedAt: string;
};

const FORM_SUBMISSIONS_STORAGE_KEY = "lab_form_submissions";

const initialSubmissions: FormSubmission[] = [
  {
    id: "sub-1",
    name: "홍길동",
    email: "gildong@example.com",
    agree: true,
    submittedAt: "2026-03-01 10:30",
  },
];

export default function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [submissions, setSubmissions] = useState<FormSubmission[]>(() => {
    const saved = localStorage.getItem(FORM_SUBMISSIONS_STORAGE_KEY);
    if (!saved) return initialSubmissions;
    try {
      return JSON.parse(saved) as FormSubmission[];
    } catch {
      return initialSubmissions;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      FORM_SUBMISSIONS_STORAGE_KEY,
      JSON.stringify(submissions)
    );
  }, [submissions]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("📝 폼 제출 시도:", { name, email, agree });

    const newErrors: string[] = [];
    if (!name.trim()) newErrors.push("이름을 입력해 주세요.");
    if (!email.includes("@"))
      newErrors.push("올바른 이메일 주소(@ 포함)를 입력해 주세요.");
    if (!agree) newErrors.push("개인정보 수집 및 이용에 동의해야 합니다.");

    if (newErrors.length > 0) {
      console.warn("⚠️ 유효성 검사 실패:", newErrors);
      setErrors(newErrors);
      setSuccessMessage(null);
      return;
    }

    setErrors([]);

    const newSubmission: FormSubmission = {
      id: "sub-" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      agree,
      submittedAt: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    setSuccessMessage(`"${name}"님의 정보가 LocalStorage에 안전하게 저장되었습니다.`);
    console.log("✅ 저장 완료:", newSubmission);

    setName("");
    setEmail("");
    setAgree(false);
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearSubmissions = () => {
    setSubmissions([]);
    localStorage.removeItem(FORM_SUBMISSIONS_STORAGE_KEY);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-badge">
          <span className="badge badge-indigo">CHAPTER 04 · FORMS & VALIDATION</span>
        </div>
        <h1 className="page-title">폼 입력 제어 & 실시간 유효성 검증</h1>
        <p className="page-subtitle">
          React의 단일 진실 공급원(Single Source of Truth) 원칙에 따른 제어 컴포넌트(Controlled Component)
          패턴을 적용하고, 폼 검증과 <code>LocalStorage</code> 데이터 지속성을 확인합니다.
        </p>
      </div>

      {/* Concept Box */}
      <div className="concept-box">
        <p>
          💡 <b>핵심 원리:</b> <code>&lt;input value=&#123;state&#125; onChange=&#123;handler&#125; /&gt;</code> 구조를
          통해 리액트 컴포넌트가 모든 입력값의 상태를 완전히 지배합니다. <code>e.preventDefault()</code>로
          브라우저 고유의 전체 새로고침 동작을 차단하고 클라이언트 검증을 먼저 진행합니다.
        </p>
      </div>

      {/* 2-Column Split: Form on Left, Submissions on Right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Left: Input Form Card */}
        <div className="lab-card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            사용자 등록 폼
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
            입력값은 실시간으로 React 상태에 바인딩됩니다.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: "0.35rem",
                  color: "var(--text-secondary)",
                }}
              >
                이름 <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                className="input-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.length > 0) setErrors([]);
                }}
                placeholder="예: 홍길동"
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: "0.35rem",
                  color: "var(--text-secondary)",
                }}
              >
                이메일 주소 <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                type="email"
                className="input-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.length > 0) setErrors([]);
                }}
                placeholder="developer@example.com"
              />
            </div>

            <div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    if (errors.length > 0) setErrors([]);
                  }}
                />
                <span>개인정보 수집 및 이용에 동의합니다. (필수)</span>
              </label>
            </div>

            {/* Error Message Box */}
            {errors.length > 0 && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-danger-bg)",
                  color: "var(--color-danger-text)",
                  border: "1px solid var(--color-danger-border)",
                  fontSize: "0.85rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                  <IconAlertTriangle size={15} />
                  <span>입력 확인이 필요합니다:</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.5 }}>
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Success Banner */}
            {successMessage && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-success-bg)",
                  color: "var(--color-success-text)",
                  border: "1px solid var(--color-success-border)",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <IconCheck size={16} />
                <span>{successMessage}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
              데이터 제출 및 로컬 저장
            </button>
          </form>
        </div>

        {/* Right: Submissions History Card */}
        <div className="lab-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                제출 이력 보관소
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                LocalStorage에 저장된 영구 데이터 ({submissions.length}건)
              </p>
            </div>
            {submissions.length > 0 && (
              <button
                onClick={handleClearSubmissions}
                className="btn btn-ghost btn-sm"
                title="모든 제출 내역 삭제"
              >
                전체 비우기
              </button>
            )}
          </div>

          {submissions.length === 0 ? (
            <div
              style={{
                padding: "2.5rem 1rem",
                textAlign: "center",
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--border-default)",
              }}
            >
              <div style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                아직 제출된 데이터가 없습니다.
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "0.25rem" }}>
                왼쪽 폼에서 새 데이터를 작성해 보세요.
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxHeight: 380, overflowY: "auto" }}>
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    padding: "0.85rem 1rem",
                    backgroundColor: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                      {sub.name}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                      {sub.email}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                      제출 시각: {sub.submittedAt} · 동의 완료
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSubmission(sub.id)}
                    className="btn btn-ghost btn-sm"
                    title="기록 삭제"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Accordion */}
      <details className="lab-summary">
        <summary>학습 핵심 요약 열기</summary>
        <ul>
          <li>
            <code>e.preventDefault()</code>로 HTTP 기본 요청 방지 및 SPA 내부 상태 전환 흐름을 통제합니다.
          </li>
          <li>
            사용자 입력 유효성 검사(이름, 이메일 형식, 동의 여부) 후 적절한 피드백 메시지를 렌더링합니다.
          </li>
          <li>
            실제 백엔드가 없는 환경에서도 <code>LocalStorage</code>를 데이터 레이어로 활용하여 등록/조회/삭제 흐름을 온전히 학습합니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

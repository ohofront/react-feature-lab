// src/routes/FormPage.tsx
import { type FormEvent, useState, useEffect } from "react";

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
    id: "sample-1",
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
      newErrors.push("올바른 이메일 형식을 입력해 주세요.");
    if (!agree) newErrors.push("개인정보 수집에 동의해 주세요.");

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
      submittedAt: new Date().toLocaleString("ko-KR"),
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    setSuccessMessage(
      `성공: "${name}"님의 정보가 LocalStorage에 안전하게 저장되었습니다.`
    );
    console.log("✅ 최종 제출 데이터 저장 완료:", newSubmission);

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
    <div>
      <h2>4. 폼 & 유효성 검사 (LocalStorage 저장)</h2>
      <p>
        - input 값은 전부 <b>useState</b>로 관리
        <br />- <b>onChange</b>로 상태 실시간 업데이트
        <br />- <b>onSubmit</b>에서 유효성 검사 후 백엔드 API 대신{" "}
        <b>LocalStorage</b>에 영구 저장합니다.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            <b>이름</b>
          </label>
          <input
            value={name}
            onChange={(e) => {
              console.log("이름 변경:", e.target.value);
              setName(e.target.value);
            }}
            placeholder="홍길동"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            <b>이메일</b>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              console.log("이메일 변경:", e.target.value);
              setEmail(e.target.value);
            }}
            placeholder="example@email.com"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                console.log("동의 체크:", e.target.checked);
                setAgree(e.target.checked);
              }}
            />
            개인정보 수집 및 이용에 동의합니다.
          </label>
        </div>

        {errors.length > 0 && (
          <div
            style={{
              backgroundColor: "#fff5f5",
              border: "1px solid #feb2b2",
              color: "#c53030",
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
              marginBottom: "0.75rem",
            }}
          >
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {successMessage && (
          <div
            style={{
              backgroundColor: "#f0fff4",
              border: "1px solid #9ae6b4",
              color: "#276749",
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
              marginBottom: "0.75rem",
            }}
          >
            {successMessage}
          </div>
        )}

        <button type="submit" style={{ width: "100%", padding: "0.6rem" }}>
          제출하기
        </button>
      </form>

      {/* 제출된 데이터 목록 섹션 */}
      <section style={{ marginTop: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <h3>📥 최근 제출된 내역 ({submissions.length}건)</h3>
          {submissions.length > 0 && (
            <button
              onClick={handleClearSubmissions}
              style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
            >
              전체 비우기
            </button>
          )}
        </div>

        {submissions.length === 0 ? (
          <p style={{ color: "#718096" }}>제출된 데이터가 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {submissions.map((sub) => (
              <li
                key={sub.id}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "0.75rem 1rem",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold" }}>{sub.name}</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                    이메일: {sub.email}
                  </div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>
                    제출일시: {sub.submittedAt} (동의완료 ✅)
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSubmission(sub.id)}
                  style={{ fontSize: "0.8rem", padding: "0.2rem 0.5rem" }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <details style={{ marginTop: "1rem" }}>
        <summary>설명 요약</summary>
        <ul>
          <li>
            폼 제출 시 <code>e.preventDefault()</code>로 페이지 새로고침을
            방지합니다.
          </li>
          <li>
            입력값 유효성을 검사하여 에러 목록을 화면에 동적으로 표시합니다.
          </li>
          <li>
            실제 API가 없어도 <code>LocalStorage</code>에 데이터를 저장하여
            영속적인 데이터 흐름을 체험할 수 있습니다.
          </li>
        </ul>
      </details>
    </div>
  );
}

import { type FormEvent, useState } from "react";

export default function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // 기본 폼 제출(새로고침) 막기
    console.log("📝 폼 제출 시도:", { name, email, agree });

    const newErrors: string[] = [];

    if (!name.trim()) newErrors.push("이름을 입력해 주세요.");
    if (!email.includes("@"))
      newErrors.push("올바른 이메일 형식을 입력해 주세요.");
    if (!agree) newErrors.push("개인정보 수집에 동의해 주세요.");

    if (newErrors.length > 0) {
      console.warn("⚠️ 유효성 검사 실패:", newErrors);
      setErrors(newErrors);
      alert("입력값을 다시 확인해 주세요.");
      return;
    }

    setErrors([]);
    alert("폼이 정상적으로 제출되었습니다. (콘솔을 확인해 보세요!)");
    console.log("✅ 최종 제출 데이터:", {
      name,
      email,
      agree,
    });

    // 실무에서는 여기서 서버로 API 요청을 보냄
    // 예: await fetch("/api/...", { method: "POST", body: JSON.stringify({ name, email, agree }) });

    // 샘플이라 제출 후 값 초기화
    setName("");
    setEmail("");
    setAgree(false);
  };

  return (
    <div>
      <h2>4. 폼 & 유효성 검사</h2>
      <p>
        - input 값은 전부 <b>useState</b>로 관리
        <br />- <b>onChange</b>로 상태 업데이트
        <br />- <b>onSubmit</b>에서 유효성 검사 후 alert/console로 결과 확인
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            이름
            <br />
            <input
              value={name}
              onChange={(e) => {
                console.log("이름 변경:", e.target.value);
                setName(e.target.value);
              }}
              placeholder="홍길동"
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            이메일
            <br />
            <input
              value={email}
              onChange={(e) => {
                console.log("이메일 변경:", e.target.value);
                setEmail(e.target.value);
              }}
              placeholder="example@email.com"
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                console.log("동의 체크:", e.target.checked);
                setAgree(e.target.checked);
              }}
            />{" "}
            개인정보 수집에 동의합니다.
          </label>
        </div>

        {errors.length > 0 && (
          <ul style={{ color: "red", marginBottom: "0.5rem" }}>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}

        <button type="submit">제출</button>
      </form>

      <details style={{ marginTop: "1rem" }}>
        <summary>설명 요약</summary>
        <ul>
          <li>
            폼 제출 시 <code>e.preventDefault()</code>로 새로고침을 막는다.
          </li>
          <li>입력값을 검사해 에러 목록을 화면과 콘솔에 함께 보여준다.</li>
          <li>실무에서는 이 지점에서 서버로 API 요청을 보낸다.</li>
        </ul>
      </details>
    </div>
  );
}

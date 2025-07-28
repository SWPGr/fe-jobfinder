import React, { useEffect, useState } from "react";
import styles from "./ResumeProfile.module.scss";
import EmployerService from "~/services/EmployerService";

// Hàm tách text thành từng ký tự, xử lý bold với **...**
function parseResumeTextToChars(text) {
  if (!text) return [];

  // Tìm đoạn bold
  const boldRegex = /\*\*(.*?)\*\*/g;
  let parts = [];
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    parts.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), bold: false });
  }

  // Chia thành dòng và từng ký tự
  const lines = parts
    .flatMap((part) =>
      part.text.split("\n").map((line) => ({ line, bold: part.bold }))
    )
    .map(({ line, bold }, lineIndex) =>
      line.split("").map((char, charIndex) => ({
        char,
        bold,
        delay: lineIndex * 0.009 + charIndex * 0.009, // delay nhanh
      }))
    );

  return lines;
}

export default function ResumeProfile({ applicationId }) {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!applicationId) {
      setResumeText("");
      setError("Application ID không hợp lệ");
      return;
    }

    setError(null);
    setResumeText("");

    async function loadResume() {
      setLoading(true);
      try {
        const resumeSummary = await EmployerService.fetchResume({ applicationId });
        if (!resumeSummary) throw new Error("Không có dữ liệu resume");

        setResumeText(resumeSummary);
      } catch (err) {
        console.error("ResumeProfile loadResume error:", err);
        setError(err.message || "Lỗi tải resume");
      } finally {
        setLoading(false);
      }
    }

    loadResume();
  }, [applicationId]);

  if (loading) return <p>Đang tải resume...</p>;
  if (error) return <p style={{ color: "red" }}>Lỗi: {error}</p>;

  const lines = parseResumeTextToChars(resumeText);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resume Profile</h2>
      <div className={styles.resumeContent}>
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} className={styles.line}>
            {line.map((item, charIdx) => (
              <span
                key={charIdx}
                className={`${styles.char} ${item.bold ? styles.boldChar : ""}`}
                style={{ animationDelay: `${item.delay}s` }}
              >
                {item.char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./ResumeProfile.module.scss";
import EmployerService from "~/services/EmployerService";

function parseResumeText(text) {
  if (!text) return null;
  const parts = [];
  let remaining = text;

  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) {
      parts.push(
        remaining.split("\n").reduce((arr, line, i) => {
          if (i > 0) arr.push(<br key={"br_" + i} />);
          arr.push(line);
          return arr;
        }, [])
      );
      break;
    }
    if (boldStart > 0) {
      const beforeBold = remaining.substring(0, boldStart);
      parts.push(
        beforeBold.split("\n").reduce((arr, line, i) => {
          if (i > 0) arr.push(<br key={"br_before_" + i} />);
          arr.push(line);
          return arr;
        }, [])
      );
    }
    remaining = remaining.substring(boldStart + 2);
    const boldEnd = remaining.indexOf("**");
    if (boldEnd === -1) {
      parts.push(<b key={"bold_end_missing"}>{remaining}</b>);
      break;
    }
    const boldText = remaining.substring(0, boldEnd);
    parts.push(<b key={"bold_" + parts.length}>{boldText}</b>);
    remaining = remaining.substring(boldEnd + 2);
  }
  return parts.flat();
}

export default function ResumeProfile({ applicationId, userId }) {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const idToUse = userId || applicationId;
    if (!idToUse) {
      setResumeText("");
      setError("Application ID không hợp lệ");
      return;
    }

    setError(null);
    setResumeText("");

    async function loadResume() {
      setLoading(true);
      try {
        //console.log("ResumeProfile: fetching resume for applicationId:", applicationId);
        const resumeSummary = await EmployerService.fetchResume({ applicationId, userId });
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
  }, [applicationId, userId]);

  if (loading) return <p>Đang tải resume...</p>;
  if (error) return <p style={{ color: "red" }}>Lỗi: {error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resume Profile</h2>
      <div className={styles.resumeContent}>{parseResumeText(resumeText)}</div>
    </div>
  );
}

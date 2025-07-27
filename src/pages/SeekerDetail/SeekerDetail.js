import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SeekerDetail.module.scss";
import ResumeProfile from "../CreateCVSeeker/ResumeProfile";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const cx = classNames.bind(styles);

// Hàm format resumeSummary theo định dạng markdown đơn giản
// (vẫn giữ lại nếu bạn cần dùng ở chỗ khác, nhưng trong modal ResumeProfile sẽ xử lý)
function formatResumeSummary(text) {
  if (!text) return null;

  const blocks = text.split(/\n\n+/);

  return blocks.map((block, i) => {
    const trimmedBlock = block.trim();

    if (/^\*\*.+:\*\*/.test(trimmedBlock) || trimmedBlock.includes("**")) {
      const lines = trimmedBlock.split("\n").filter(Boolean);

      return (
        <div key={i}>
          {lines.map((line, idx) => {
            const match = line.match(/^\*\*(.+?:)\*\*\s*(.*)/);
            if (match) {
              const [, boldPart, rest] = match;
              return (
                <p key={idx}>
                  <strong>{boldPart}</strong> {rest}
                </p>
              );
            }

            const parts = line.split(/(\*\*.+?\*\*)/g).filter(Boolean);
            return (
              <p key={idx}>
                {parts.map((part, pi) => {
                  if (/^\*\*(.+)\*\*$/.test(part)) {
                    const strongText = part.replace(/^\*\*(.+)\*\*$/, "$1");
                    return <strong key={pi}>{strongText}</strong>;
                  }
                  return part;
                })}
              </p>
            );
          })}
        </div>
      );
    }

    if (/^\*\*(.+)\*\*$/.test(trimmedBlock)) {
      const headingText = trimmedBlock.replace(/^\*\*(.+)\*\*$/, "$1");
      return <h3 key={i}>{headingText}</h3>;
    }

    if (/^\* /.test(trimmedBlock)) {
      const items = trimmedBlock
        .split("\n")
        .map((line) => line.replace(/^\* /, "").trim());

      return (
        <ul key={i}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }

    const lines = trimmedBlock.split("\n");
    const jsxLines = lines.map((line, idx) => {
      const parts = line.split(/(\*\*.+?\*\*)/g).filter(Boolean);

      return (
        <React.Fragment key={`line-${i}-${idx}`}>
          {parts.map((part, pi) => {
            if (/^\*\*(.+)\*\*$/.test(part)) {
              const strongText = part.replace(/^\*\*(.+)\*\*$/, "$1");
              return <strong key={`strong-${i}-${idx}-${pi}`}>{strongText}</strong>;
            }
            return part;
          })}
          <br key={`br-${i}-${idx}`} /> {/* key duy nhất cho br */}
        </React.Fragment>
      );
    });

    return <p key={i}>{jsxLines}</p>;
  });
}

const SeekerDetail = ({ applicant }) => {
  const [showSummary, setShowSummary] = useState(false);

  if (!applicant) {
    alert("Không có dữ liệu ứng viên.");
    return null;
  }

  const {
    seekerDetail = {},
    coverLetter = seekerDetail.coverLetter,
    experienceName,
    educationName,
    email,
    phone = seekerDetail.phone,
    title,
  } = applicant;
  const coverLetterDisplay =
    (coverLetter && coverLetter.trim()) ||
    (seekerDetail.coverLetter && seekerDetail.coverLetter.trim()) ||
    "Không có cover letter";
  const applicationId = applicant.applicationId || applicant.id || null;
  console.log("applicant", applicant);
  console.log("seekerDetail", seekerDetail);
  if (!applicationId) {
    alert("Application ID không hợp lệ");
    return null;
  }



  const handleShowResumeSummary = () => {
    setShowSummary(true);
  };

  return (
    <div className={cx("outerContainer")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div className={cx("header")}>
            <div className={cx("avatar")}>
              {seekerDetail.avatarUrl && (
                <img src={seekerDetail.avatarUrl} alt={seekerDetail.fullName} />
              )}
            </div>
            <div className={cx("basic-info")}>
              <h2 className={cx("name")}>{seekerDetail.fullName || "N/A"}</h2>
              <p className={cx("jobTitle")}>{title || "Website Designer (UI/UX)"}</p>
            </div>
          </div>

          <section className={cx("section")}>
            <h3 className={cx("sectionTitle")}>COVER LETTER</h3>
            <p className={cx("sectionText")}>{coverLetterDisplay}</p>
          </section>

          <section className={cx("socialMedia")}>
            <span>Follow me on Social Media</span>
            <div className={cx("socialIcons")}>
              <a href="#" aria-label="Facebook" className={cx("socialIcon")}>
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter" className={cx("socialIcon")}>
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn" className={cx("socialIcon")}>
                <FaLinkedinIn />
              </a>
              <a href="#" aria-label="Reddit" className={cx("socialIcon")}>
                <FaRedditAlien />
              </a>
              <a href="#" aria-label="Instagram" className={cx("socialIcon")}>
                <FaInstagram />
              </a>
              <a href="#" aria-label="YouTube" className={cx("socialIcon")}>
                <FaYoutube />
              </a>
            </div>
          </section>
        </div>

        <div className={cx("right")}>
          <div className={cx("infoBox")}>
            <div className={cx("infoRow")}>
            </div>

            <div className={cx("infoRow")}>
              <div className={cx("infoItem")}>

              </div>
              <div className={cx("infoItem")}>

              </div>
            </div>

            <div className={cx("infoRow")}>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>EXPERIENCE</p>
                <p className={cx("infoValue")}>
                  {experienceName || seekerDetail.experienceName || "N/A"}
                </p>
              </div>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>EDUCATION</p>
                <p className={cx("infoValue")}>
                  {educationName || seekerDetail.educationName || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className={cx("infoBox", "resumeBox")}>
            <h3 className={cx("resumeTitle")}>View Resume</h3>
            <p className={cx("resumeName")}>{seekerDetail.fullName || "N/A"}</p>
            <button
              className={cx("downloadBtn")}
              aria-label="Download Resume"
              onClick={() => {
                if (seekerDetail.resumeUrl) {
                  window.open(seekerDetail.resumeUrl, "_blank");
                } else {
                  alert("Resume not available");
                }
              }}
            >
              ⬇
            </button>
          </div>

          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button
              className={cx("downloadBtn")}
              aria-label="View Resume Summary"
              onClick={handleShowResumeSummary}
            >
              📄Resume Summary
            </button>
          </div>

          {showSummary && (
            <div className={cx("modalOverlay")}>
              <div className={cx("modalContent")}>
                <button
                  className={cx("closeBtn")}
                  aria-label="Close Resume Summary"
                  onClick={() => setShowSummary(false)}
                >
                  ×
                </button>
                <ResumeProfile applicationId={applicationId} />
              </div>
            </div>
          )}

          <div className={cx("infoBox")}>
            <h3 className={cx("contactTitle")}>Contact Information</h3>
            <div className={cx("contactItem")}>
              <span className={cx("icon")}>✉️</span>
              <span className={cx("contactText")}>{email || "N/A"}</span>
            </div>
            <div className={cx("contactItem")}>
              <span className={cx("icon")}>📞</span>
              <span className={cx("contactText")}>{phone || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDetail;
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./SeekerDetail.module.scss";
import EmployerService from "~/services/EmployerService";
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
        <React.Fragment key={idx}>
          {parts.map((part, pi) => {
            if (/^\*\*(.+)\*\*$/.test(part)) {
              const strongText = part.replace(/^\*\*(.+)\*\*$/, "$1");
              return <strong key={pi}>{strongText}</strong>;
            }
            return part;
          })}
          <br />
        </React.Fragment>
      );
    });

    return <p key={i}>{jsxLines}</p>;
  });
}

const SeekerDetail = ({ applicant }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [resumeSummary, setResumeSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  if (!applicant) {
    alert("Không có dữ liệu ứng viên.");
    return null;
  }

  // Lấy ID từ applicant (kiểm tra cả applicationId, id và _id)
  const {
    SeekerDetail = {},
    coverLetter,
    experienceName,
    educationName,
    email,
    phone,
    id: applicationId, // applicationId từ applicant
    title,
  } = applicant;

  // Kiểm tra applicationId
  const validApplicationId = applicationId || applicant.applicationId || applicant._id || applicant.id || applicant.userId ;

  if (!validApplicationId) {
    alert("No valid application ID found.");
    return null;
  }

  const handleShowResumeSummary = async () => {
    if (!validApplicationId) {
      alert("Application ID not found.");
      return;
    }

    setLoadingSummary(true);
    try {
      const data = await EmployerService.fetchApplicationData(validApplicationId, "application"); // Dùng validApplicationId để fetch
      if (data && data.resumeSummary) {
        setResumeSummary(data.resumeSummary);
        setShowSummary(true);
      } else {
        alert("No resume summary available.");
      }
    } catch (error) {
      alert("Failed to load resume summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className={cx("outerContainer")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div className={cx("header")}>
            <div className={cx("avatar")}>
              {SeekerDetail.avatarUrl && (
                <img src={SeekerDetail.avatarUrl} alt={SeekerDetail.fullName} />
              )}
            </div>
            <div className={cx("basic-info")}>
              <h2 className={cx("name")}>{SeekerDetail.fullName || "N/A"}</h2>
              <p className={cx("jobTitle")}>
                {title || "Website Designer (UI/UX)"}
              </p>
            </div>
          </div>

          <section className={cx("section")}>
            <h3 className={cx("sectionTitle")}>BIOGRAPHY</h3>
            <p className={cx("sectionText")}>
              {SeekerDetail.biography ||
                "I've been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time."}
            </p>
          </section>

          <section className={cx("section")}>
            <h3 className={cx("sectionTitle")}>COVER LETTER</h3>
            <p className={cx("sectionText")}>{coverLetter || "N/A"}</p>
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
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>DATE OF BIRTH</p>
                <p className={cx("infoValue")}>
                  {SeekerDetail.dateOfBirth || "N/A"}
                </p>
              </div>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>NATIONALITY</p>
                <p className={cx("infoValue")}>
                  {SeekerDetail.nationality || "N/A"}
                </p>
              </div>
            </div>

            <div className={cx("infoRow")}>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>MARITAL STATUS</p>
                <p className={cx("infoValue")}>
                  {SeekerDetail.maritalStatus || "N/A"}
                </p>
              </div>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>GENDER</p>
                <p className={cx("infoValue")}>{SeekerDetail.gender || "N/A"}</p>
              </div>
            </div>

            <div className={cx("infoRow")}>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>EXPERIENCE</p>
                <p className={cx("infoValue")}>
                  {experienceName || SeekerDetail.experienceName || "N/A"}
                </p>
              </div>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>EDUCATION</p>
                <p className={cx("infoValue")}>
                  {educationName || SeekerDetail.educationName || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className={cx("infoBox", "resumeBox")}>
            <h3 className={cx("resumeTitle")}>Download My Resume</h3>
            <p className={cx("resumeName")}>{SeekerDetail.fullName || "N/A"}</p>
            <button
              className={cx("downloadBtn")}
              aria-label="Download Resume"
              onClick={() => {
                if (SeekerDetail.resumeUrl) {
                  window.open(SeekerDetail.resumeUrl, "_blank");
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
              disabled={loadingSummary}
            >
              {loadingSummary ? "Loading..." : "📄 View Resume Summary"}
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
                <div style={{ whiteSpace: "normal", textAlign: "left" }}>
                  {formatResumeSummary(resumeSummary)}
                </div>
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

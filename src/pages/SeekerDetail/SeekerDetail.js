import React, { useState } from "react";
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

const SeekerDetail = ({ applicant }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [resumeSummary, setResumeSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  if (!applicant) return null;

  const {
    jobSeeker = {},
    coverLetter,
    experienceName,
    educationName,
    email,
    phone,
    id: applicationId,
  } = applicant;

  const handleShowResumeSummary = async () => {
    if (!applicationId) {
      alert("Application ID not found.");
      return;
    }
    setLoadingSummary(true);
    try {
      const data = await EmployerService.fetchApplicationFake(applicationId);
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

  function formatResumeSummary(text) {
  if (!text) return null;

  // Tách block theo 2 dấu \n\n
  const blocks = text.split(/\n\n+/);

  return blocks.map((block, i) => {
    const trimmedBlock = block.trim();

    // Nếu block có nhiều dòng bắt đầu bằng **...: thì xử lý từng dòng riêng
    if (/^\*\*.+:\*\*/.test(trimmedBlock) || trimmedBlock.includes("**")) {
      const lines = trimmedBlock.split("\n").filter(Boolean);

      return (
        <div key={i}>
          {lines.map((line, idx) => {
            // Tìm đoạn bắt đầu bằng **text:** (in đậm phần đầu)
            const match = line.match(/^\*\*(.+?:)\*\*\s*(.*)/);
            if (match) {
              const [, boldPart, rest] = match;
              return (
                <p key={idx}>
                  <strong>{boldPart}</strong> {rest}
                </p>
              );
            }

            // Các dòng khác, có thể có **text** giữa câu
            // Thay thế các **text** thành strong
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

    // Nếu block là tiêu đề (ví dụ **Heading**)
    if (/^\*\*(.+)\*\*$/.test(trimmedBlock)) {
      const headingText = trimmedBlock.replace(/^\*\*(.+)\*\*$/, "$1");
      return <h3 key={i}>{headingText}</h3>;
    }

    // Nếu block là list (bắt đầu bằng dấu * )
    if (/^\* /.test(trimmedBlock)) {
      const items = trimmedBlock
        .split("\n")
        .map(line => line.replace(/^\* /, "").trim());

      return (
        <ul key={i}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }

    // Block thường, có xuống dòng thì <br/>
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

  return (
    <div className={cx("outerContainer")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div className={cx("header")}>
            <div className={cx("avatar")}>
              {jobSeeker.avatarUrl && (
                <img src={jobSeeker.avatarUrl} alt={jobSeeker.fullName} />
              )}
            </div>
            <div className={cx("basic-info")}>
              <h2 className={cx("name")}>{jobSeeker.fullName || "N/A"}</h2>
              <p className={cx("jobTitle")}>
                {applicant.title || "Website Designer (UI/UX)"}
              </p>
            </div>
          </div>

          <section className={cx("section")}>
            <h3 className={cx("sectionTitle")}>BIOGRAPHY</h3>
            <p className={cx("sectionText")}>
              I've been passionate about graphic design and digital art from an
              early age with a keen interest in Website and Mobile Application
              User Interfaces. I can create high-quality and aesthetically
              pleasing designs in a quick turnaround time. Check out the
              portfolio section of my profile to see samples of my work and feel
              free to discuss your designing needs. I mostly use Adobe Photoshop,
              Illustrator, XD and Figma. *Website User Experience and Interface
              (UI/UX) Design - for all kinds of Professional and Personal
              websites. *Mobile Application User Experience and Interface Design
              - for all kinds of IOS/Android and Hybrid Mobile Applications.
              *Wireframe Designs.
            </p>
          </section>

          <section className={cx("section")}>
            <h3 className={cx("sectionTitle")}>COVER LETTER</h3>
            <p className={cx("sectionText")}>{coverLetter || "N/A"}</p>
          </section>

          <section className={cx("socialMedia")}>
            <span>Follow me Social Media</span>
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
                <p className={cx("infoValue")}>14 June, 2021</p>
              </div>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>NATIONALITY</p>
                <p className={cx("infoValue")}>Bangladesh</p>
              </div>
            </div>

            <div className={cx("infoRow")}>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>MARITAL STATUS</p>
                <p className={cx("infoValue")}>Single</p>
              </div>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>GENDER</p>
                <p className={cx("infoValue")}>Male</p>
              </div>
            </div>

            <div className={cx("infoRow")}>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>EXPERIENCE</p>
                <p className={cx("infoValue")}>
                  {experienceName || jobSeeker.experienceName || "N/A"}
                </p>
              </div>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>EDUCATIONS</p>
                <p className={cx("infoValue")}>
                  {educationName || jobSeeker.educationName || "Master Degree"}
                </p>
              </div>
            </div>
          </div>

          <div className={cx("infoBox", "resumeBox")}>
            <h3 className={cx("resumeTitle")}>Download My Resume</h3>
            <p className={cx("resumeName")}>{jobSeeker.fullName || "N/A"}</p>
            <button
              className={cx("downloadBtn")}
              aria-label="Download Resume"
              onClick={() => {
                if (jobSeeker.resumeUrl) {
                  window.open(jobSeeker.resumeUrl, "_blank");
                } else {
                  alert("Resume not available");
                }
              }}
            >
              ⬇
            </button>

             <div style={{ textAlign: "center" }}>
            
          </div>
          </div>

         

          {showSummary && (
            <div className={cx("modalOverlay")}>
              <div className={cx("modalContent")}>
                <button
                  className={cx("modalCloseBtn")}
                  aria-label="Close Resume Summary"
                  onClick={() => setShowSummary(false)}
                >
                  ×
                </button>
                
                <div style={{ whiteSpace: "normal", textAlign: "left", fontSize: "16px" }}>
                  {formatResumeSummary(resumeSummary)}
                </div>
                <button
                  className={cx("closeBtn")}
                  onClick={() => setShowSummary(false)}
                  style={{ padding : "10px 20px", marginTop: "20px" }}
                >
                  
                </button>
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
            <div className={cx("contactItem")}>
              <span className={cx("icon")}>🌐</span>
              <span className={cx("contactText")}>www.estherhoward.com</span>
            </div>
            <div className={cx("contactItem")}>
              <span className={cx("icon")}>📍</span>
              <span className={cx("contactText")}>
                Beverly Hills, California 90202 <br />
                Zone/Block Basement 1 Unit B2, 1372 Spring Avenue, Portland,
              </span><button
              className={cx("downloadBtn")}
              aria-label="View Resume Summary"
              onClick={handleShowResumeSummary}
              disabled={loadingSummary}
            >
              {loadingSummary ? "Loading..." : "📄 View Resume Summary"}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDetail;

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./SeekerDetail.module.scss";
import ResumeProfile from "../CreateCVSeeker/ResumeProfile";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaInstagram,
  FaGithub,
  FaPhoneAlt,
  FaRegUserCircle,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineWorkspacePremium, MdOutlineUpdate, MdVerified } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import useNotification from "~/hooks/userNotification";

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

const socialIconMap = {
  Facebook: FaFacebookF,
  Twitter: FaTwitter,
  LinkedIn: FaLinkedinIn,
  GitHub: FaRedditAlien, // sẽ sửa lại bên dưới
  "Personal Website": FaInstagram, // sẽ sửa lại bên dưới
};

const SeekerDetail = ({ applicant }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialTypes, setSocialTypes] = useState([]);

  const { showError, showInfo, showWarning } = useNotification();

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const [links, types] = await Promise.all([
          JobSeekerProfileService.getMySocialLinks(),
          JobSeekerProfileService.getSocialTypes(),
        ]);
        setSocialLinks(links);
        setSocialTypes(types);
        if (!links || links.length === 0) {
          showInfo("No social media links found for this user.");
        }
      } catch (err) {
        showWarning("Failed to fetch social media data.");
      }
    };
    fetchSocialData();
  }, []);


  if (!applicant) {
    showError("User not found");
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

  // Sửa lại icon map cho đúng
  const iconMap = {
    Facebook: FaFacebookF,
    Twitter: FaTwitter,
    LinkedIn: FaLinkedinIn,
    GitHub: FaGithub, // Bạn có thể import FaGithub nếu muốn
    "Personal Website": FaInstagram, // Bạn có thể import FaGlobe nếu muốn
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



          <section className={cx("socialMedia")}>
            <span>Follow me on Social Media</span>
            <div className={cx("socialIcons")}>
              {socialTypes.length > 0 ? (
                socialTypes.map((type) => {
                  // Tìm link theo id thay vì name
                  const link = socialLinks.find(
                    (l) => l.socialType && l.socialType.id === type.id
                  );
                  const Icon = iconMap[type.name] || FaRedditAlien;
                  return (
                    <a
                      key={type.id}
                      href={link ? link.url : undefined}
                      aria-label={type.name}
                      className={cx("socialIcon")}
                      target={link ? "_blank" : undefined}
                      rel={link ? "noopener noreferrer" : undefined}
                      onClick={e => {
                        if (!link) {
                          e.preventDefault();
                          showInfo(`No link for ${type.name}`);
                        }
                      }}
                    >
                      <Icon />
                    </a>
                  );
                })
              ) : (
                <span>No social media types found.</span>
              )}
            </div>
          </section>
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
                <IoCloudDownloadOutline />
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
                <span className={cx("icon")}> <TfiEmail /> </span>
                <span className={cx("contactText")}>{email || "N/A"}</span>
              </div>
              <div className={cx("contactItem")}>
                <span className={cx("icon")}> <FaPhoneAlt /> </span>
                <span className={cx("contactText")}>{phone || "N/A"}</span>
              </div>
              <div className={cx("contactItem")}>
                <span className={cx("icon")}> <FaMapLocationDot /> </span>
                <span className={cx("contactText")}>{seekerDetail.location || "N/A"}</span>
              </div>
            </div>
            {/* New infoBox for extra info */}
            <div className={cx("infoBox")}>
              <h3 className={cx("contactTitle")}>Account Details</h3>
              <div className={cx("contactItem")}>
                <span className={cx("icon")}> <FaRegUserCircle /> </span>
                <span className={cx("contactText")}>{seekerDetail.roleName || "N/A"}</span>
              </div>
              <div className={cx("contactItem")}>
                <span className={cx("icon")}> <MdOutlineWorkspacePremium /> </span>
                <span className={cx("contactText")}>{seekerDetail.isPremium ? "Premium" : "Normal"}</span>
              </div>
              <div className={cx("contactItem")}>
                <span className={cx("icon")}> <MdVerified /> </span>
                <span className={cx("contactText")}>{seekerDetail.verified === 1 ? "Verified" : "Not Verified"}</span>
              </div>
              <div className={cx("contactItem")}>
                <span className={cx("icon")}> <IoIosTime /> </span>
                <span className={cx("contactText")}>{seekerDetail.createdAt ? new Date(seekerDetail.createdAt).toLocaleString() : "N/A"}</span>
              </div>
              <div className={cx("contactItem")}>
                <span className={cx("icon")}> <MdOutlineUpdate /> </span>
                <span className={cx("contactText")}>{seekerDetail.updatedAt ? new Date(seekerDetail.updatedAt).toLocaleString() : "N/A"}</span>
              </div>
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
          </div>
        </div>




      </div>

    </div>
  );
};

export default SeekerDetail;
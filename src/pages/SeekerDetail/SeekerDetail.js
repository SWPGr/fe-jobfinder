import React from "react";
import classNames from "classnames/bind";
import styles from "./SeekerDetail.module.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import EmployerService from "~/services/EmployerService";

const cx = classNames.bind(styles);

const SeekerDetail = ({ applicant }) => {
  if (!applicant) return null;

  const {
    jobSeeker = {},
    coverLetter,
    experience,
    email,
    phone,
  } = applicant;

  return (
    <div className={cx("outerContainer")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div className={cx("header")}>
            <div className={cx("avatar")}>
              {/* Có thể thêm ảnh avatar nếu có URL */}
            </div>
            <div className={cx("basic-info")}>
              <h2 className={cx("name")}>{EmployerService.fetchApplicationFake.fullName }</h2>
              <p className={cx("jobTitle")}>Website Designer (UI/UX)</p>
            </div>
          </div>

          <section className={cx("section")}>
            <h3 className={cx("sectionTitle")}>BIOGRAPHY</h3>
            <p className={cx("sectionText")}>
              {/* Giữ nguyên phần biography mẫu nếu muốn hoặc để trống */}
              I've been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time. Check out the portfolio section of my profile to see samples of my work and feel free to discuss your designing needs. I mostly use Adobe Photoshop, Illustrator, XD and Figma. *Website User Experience and Interface (UI/UX) Design - for all kinds of Professional and Personal websites. *Mobile Application User Experience and Interface Design - for all kinds of IOS/Android and Hybrid Mobile Applications. *Wireframe Designs.
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
                  {experience?.name || "N/A"}
                </p>
              </div>
              <div className={cx("infoItem")}>
                <p className={cx("infoLabel")}>EDUCATIONS</p>
                <p className={cx("infoValue")}>Master Degree</p>
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
          </div>

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
            {/* Phần website và địa chỉ giữ nguyên nếu muốn */}
            <div className={cx("contactItem")}>
              <span className={cx("icon")}>🌐</span>
              <span className={cx("contactText")}>www.estherhoward.com</span>
            </div>
            <div className={cx("contactItem")}>
              <span className={cx("icon")}>📍</span>
              <span className={cx("contactText")}>
                Beverly Hills, California 90202 <br />
                Zone/Block Basement 1 Unit B2, 1372 Spring Avenue, Portland,
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDetail;

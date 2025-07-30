import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProfileSeeker.module.scss";
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
import JobSeekerProfileService from "~/services/JobSeekerProfileService";

const cx = classNames.bind(styles);

const socialIconMap = {
    Facebook: FaFacebookF,
    Twitter: FaTwitter,
    LinkedIn: FaLinkedinIn,
    GitHub: FaRedditAlien,
    "Personal Website": FaInstagram,
};

const ProfileSeeker = ({ profileData }) => {
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

    if (!profileData) {
        showError("Profile data not found");
        return null;
    }

    const {
        fullName,
        avatarUrl,
        location,
        phone,
        email,
        experienceName,
        educationName,
        resumeUrl,
        roleName,
        isPremium,
        verified,
        createdAt,
        updatedAt,
    } = profileData;

    const applicationId = profileData.id || profileData._id || 1;

    const handleShowResumeSummary = () => {
        setShowSummary(true);
    };

    const iconMap = {
        Facebook: FaFacebookF,
        Twitter: FaTwitter,
        LinkedIn: FaLinkedinIn,
        GitHub: FaGithub,
        "Personal Website": FaInstagram,
    };

    return (
        <div className={cx("profile-container")}>
            <div className={cx("profile-content")}>
                <div className={cx("left")}>
                    <div className={cx("header")}>
                        <div className={cx("avatar")}>
                            {avatarUrl && (
                                <img src={avatarUrl} alt={fullName} />
                            )}
                        </div>
                        <div className={cx("basic-info")}>
                            <h2 className={cx("name")}>{fullName || "N/A"}</h2>
                            <p className={cx("jobTitle")}>Job Seeker Profile</p>
                        </div>
                    </div>

                    <section className={cx("socialMedia")}>
                        <span>Follow me on Social Media</span>
                        <div className={cx("socialIcons")}>
                            {socialTypes.length > 0 ? (
                                socialTypes.map((type) => {
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
                </div>

                <div className={cx("right")}>
                    <div className={cx("infoBox")}>
                        <div className={cx("infoRow")}>
                            <div className={cx("infoItem")}>
                                <p className={cx("infoLabel")}>EXPERIENCE</p>
                                <p className={cx("infoValue")}>
                                    {experienceName || "N/A"}
                                </p>
                            </div>
                            <div className={cx("infoItem")}>
                                <p className={cx("infoLabel")}>EDUCATION</p>
                                <p className={cx("infoValue")}>
                                    {educationName || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cx("infoBox", "resumeBox")}>
                        <h3 className={cx("resumeTitle")}>View Resume</h3>
                        <p className={cx("resumeName")}>{fullName || "N/A"}</p>
                        <button
                            className={cx("downloadBtn")}
                            aria-label="Download Resume"
                            onClick={() => {
                                if (resumeUrl) {
                                    window.open(resumeUrl, "_blank");
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
                            <span className={cx("contactText")}>{location || "N/A"}</span>
                        </div>
                    </div>

                    <div className={cx("infoBox")}>
                        <h3 className={cx("contactTitle")}>Account Details</h3>
                        <div className={cx("contactItem")}>
                            <span className={cx("icon")}> <FaRegUserCircle /> </span>
                            <span className={cx("contactText")}>{roleName || "N/A"}</span>
                        </div>
                        <div className={cx("contactItem")}>
                            <span className={cx("icon")}> <MdOutlineWorkspacePremium /> </span>
                            <span className={cx("contactText")}>{isPremium ? "Premium" : "Normal"}</span>
                        </div>
                        <div className={cx("contactItem")}>
                            <span className={cx("icon")}> <IoIosTime /> </span>
                            <span className={cx("contactText")}>{createdAt ? new Date(createdAt).toLocaleString() : "N/A"}</span>
                        </div>
                        <div className={cx("contactItem")}>
                            <span className={cx("icon")}> <MdOutlineUpdate /> </span>
                            <span className={cx("contactText")}>{updatedAt ? new Date(updatedAt).toLocaleString() : "N/A"}</span>
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
    );
};

export default ProfileSeeker; 
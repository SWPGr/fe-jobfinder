import React, { useState, useEffect } from "react";
import styles from "./Application.module.scss";
import SeekerDetail from "../SeekerDetail/SeekerDetail";
import EmployerService from "~/services/EmployerService";
import ResumeProfile from "./ResumeProfile";

const Application = ({
  fullName,
  email,
  experience,
  education,
  resumeUrl,
  status,
  handleSelect,
  handleDownloadCV,
  handleAccept,
  handleRefuse,
}) => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [actionType, setActionType] = useState(null);

  const openMessageBox = (type) => {
    setActionType(type);
    setShowMessageBox(true);
    setMessageText("");
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessageText("");
    setActionType(null);
  };

  const handleSendMessage = () => {
    if (actionType === "accept") {
      handleAccept && handleAccept(messageText);
    } else if (actionType === "refuse") {
      handleRefuse && handleRefuse(messageText);
    }
    closeMessageBox();
  };

  return (
    <div className={`${styles.application} ${styles[status]}`} onClick={handleSelect}>
      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <div>
          <div className={styles.name}>{fullName}</div>
          <div className={styles.email}>{email}</div>
        </div>
      </div>
      <ul className={styles.details}>
        <li>Experience: {experience}</li>
        <li>Education: {education}</li>
      </ul>
      <button
        className={styles.download}
        onClick={(e) => {
          e.stopPropagation();
          handleDownloadCV();
        }}
      >
        Download CV
      </button>

      <div className={styles.actions}>
        <button
          className={`${styles.accept} ${status === "ACCEPTED" ? styles.disabled : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            openMessageBox("accept");
          }}
          disabled={status === "ACCEPTED"}
          style={{ display: status === "REJECTED" ? "none" : "inline-block" }}
        >
          Accept
        </button>
        <button
          className={`${styles.refuse} ${status === "REJECTED" ? styles.disabled : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            openMessageBox("refuse");
          }}
          disabled={status === "REJECTED"}
          style={{ display: status === "ACCEPTED" ? "none" : "inline-block" }}
        >
          Refuse
        </button>
      </div>

      {showMessageBox && (
        <>
          <div className={styles.messageOverlay} onClick={closeMessageBox} />
          <div
            className={styles.messageModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              Message
              <button onClick={closeMessageBox} aria-label="Close message box">
                &times;
              </button>
            </div>
            <textarea
              rows={6}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Enter your message here; it will be included in the email notification."
            />
            <button
              className={styles.sendBtn}
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const JobApplications = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    fullName: "",
    experience: "",
    education: "",
  });

  // state lưu options động
  const [educationOptions, setEducationOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);

  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [selectedApplicantDetail, setSelectedApplicantDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showResumeProfile, setShowResumeProfile] = useState(false);

  // Fetch danh sách education từ API
  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const data = await EmployerService.fetchEducationFake();
        setEducationOptions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching educations:", error);
        setEducationOptions([]);
      }
    };

    fetchEducations();
  }, []);

  // Fetch danh sách experience từ API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await EmployerService.fetchExperienceFake();
        setExperienceOptions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        setExperienceOptions([]);
      }
    };

    fetchExperiences();
  }, []);

  // Fetch danh sách ứng viên từ API với filter và sort
  useEffect(() => {
    if (!jobId) {
      setApplications([]);
      return;
    }

    const fetchCandidates = async () => {
      try {
        const content = await EmployerService.fetchFilteredCandidates(
          jobId,
          filters,
          sortOrder
        );

        const safeContent = Array.isArray(content)
          ? content
          : Array.isArray(content?.content)
          ? content.content
          : [];

        const mappedApps = safeContent.map((app) => {
          const appId =
            app.applicationId ||
            app.id ||
            app.userId ||
            app.seekerDetail?.userId ||
            null;

          return {
            id: appId,
            seekerDetail: app.seekerDetail,
            fullName: app.seekerDetail?.fullName || app.fullname || "No name",
            email: app.seekerDetail?.userEmail || app.email || "",
            experience: app.seekerDetail?.experienceName || "N/A",
            education: app.seekerDetail?.educationName || "N/A",
            resumeUrl: app.seekerDetail?.resumeUrl || "",
            coverLetter: app.seekerDetail?.coverLetter || "",
            phone: app.seekerDetail?.phone || "",
            applicationId: appId,
            status: app.status || "PENDING",
          };
        });

        setApplications(mappedApps);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, [jobId, filters, sortOrder]);

  // Fetch chi tiết ứng viên khi chọn
  useEffect(() => {
    if (!selectedApplicationId) {
      setSelectedApplicantDetail(null);
      return;
    }

    setLoadingDetail(true);

    const fetchApplicantDetail = async () => {
      try {
        const detail = await EmployerService.fetchCandidateDetail(
          selectedApplicationId
        );

        let applicant = detail;
        if (Array.isArray(detail)) {
          applicant = detail.find(
            (item) =>
              item.id === selectedApplicationId ||
              item.applicationId === selectedApplicationId ||
              item.userId === selectedApplicationId
          );
        }

        if (!applicant || !applicant.seekerDetail) {
          console.warn("API trả về thiếu seekerDetail, giữ nguyên dữ liệu cũ");
          return;
        }

        setSelectedApplicantDetail({
          ...applicant,
          applicationId: selectedApplicationId,
        });
      } catch (error) {
        console.error("Error fetching applicant details:", error);
        setSelectedApplicantDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchApplicantDetail();
  }, [selectedApplicationId]);

  const handleSelect = (app) => {
    if (!app.applicationId || isNaN(Number(app.applicationId))) {
      alert("No valid application ID found.");
      return;
    }
    setSelectedApplicationId(app.applicationId);
    setSelectedApplicantDetail(app);
    setShowResumeProfile(false);
  };

  const handleDownloadCV = (app) => {
    if (app.resumeUrl) {
      window.open(app.resumeUrl, "_blank");
    } else {
      alert(`CV of ${app.fullName} is not available.`);
    }
  };

  const handleUpdateStatus = async (applicationId, status, message) => {
    try {
      await EmployerService.fetchStatusJobFake(applicationId, status, message);

      alert(
        `Ứng viên đã được ${status === "ACCEPTED" ? "chấp nhận" : "từ chối"} thành công.`
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.applicationId === applicationId ? { ...app, status: status } : app
        )
      );
    } catch (error) {
      alert("Không thể cập nhật trạng thái ứng viên. Vui lòng thử lại.");
    }
  };

  const handleDownloadAll = () => {
    alert("Download all CV feature not implemented yet.");
  };

  const handleFilterToggle = (e) => {
    e.stopPropagation();
    setShowFilterPanel((prev) => !prev);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Job Applications</div>

      <div className={styles.tabs}>
        <button className={styles.active}>
          All Applicants ({applications.length})
        </button>
      </div>

      <div className={styles.sort}>
        <div className={styles.filterWrapper}>
          <button onClick={handleFilterToggle}>Filter</button>
          {showFilterPanel && (
            <div className={styles.filterPanel}>
              <div className={styles.filterHeader}>
                <input
                  name="fullName"
                  placeholder="Name"
                  value={filters.fullName}
                  onChange={handleFilterChange}
                />
                <select
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                >
                  <option value="">Experience</option>
                  {experienceOptions.map((exp) => (
                    <option key={exp.id} value={exp.name}>
                      {exp.name}
                    </option>
                  ))}
                </select>
                <select
                  name="education"
                  value={filters.education}
                  onChange={handleFilterChange}
                >
                  <option value="">Education</option>
                  {educationOptions.map((edu) => (
                    <option key={edu.id} value={edu.name}>
                      {edu.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <select
          name="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Sort A → Z</option>
          <option value="oldest">Sort Z → A</option>
        </select>
        <button className={styles.downloadAll} onClick={handleDownloadAll}>
          Download All
        </button>
      </div>

      <div className={styles.applications}>
        {applications.length > 0 ? (
          applications.map((app, index) => (
            <Application
              key={index}
              {...app}
              status={app.status}
              handleSelect={() => handleSelect(app)}
              handleDownloadCV={() => handleDownloadCV(app)}
              handleAccept={(message) =>
                handleUpdateStatus(app.applicationId, "ACCEPTED", message)
              }
              handleRefuse={(message) =>
                handleUpdateStatus(app.applicationId, "REJECTED", message)
              }
            />
          ))
        ) : (
          <div className={styles.noResults}>No applicants found</div>
        )}

        {selectedApplicantDetail && !loadingDetail && (
          <div
            className={styles.overlay}
            onClick={() => {
              setSelectedApplicationId(null);
              setSelectedApplicantDetail(null);
              setShowResumeProfile(false);
            }}
          >
            <div
              className={styles.seekerBox}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={() => {
                  setSelectedApplicationId(null);
                  setSelectedApplicantDetail(null);
                  setShowResumeProfile(false);
                }}
              >
                &times;
              </button>

              <SeekerDetail applicant={selectedApplicantDetail} />
            </div>
          </div>
        )}

        {loadingDetail && (
          <div className={styles.loading}>Loading applicant detail...</div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;

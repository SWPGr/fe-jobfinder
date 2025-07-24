import React, { useState, useEffect } from "react";
import styles from "./Application.module.scss";
import SeekerDetail from "../SeekerDetail/SeekerDetail";
import EmployerService from "~/services/EmployerService";
import ResumeProfile from "./ResumeProfile";

// Application Component
const Application = ({
  fullName,
  email,
  experience,
  education,
  resumeUrl,
  handleSelect,
  handleDownloadCV,
}) => (
  <div
    className={styles.application}
    onClick={handleSelect}
    style={{ cursor: "pointer" }}
  >
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
  </div>
);

const JobApplications = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    fullName: "",
    experience: "",
    education: "",
  });

  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [selectedApplicantDetail, setSelectedApplicantDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showResumeProfile, setShowResumeProfile] = useState(false);

  // Fetch danh sách ứng viên (candidates)
  useEffect(() => {
    if (!jobId) {
      setApplications([]);
      return;
    }

    let mounted = true;

    const fetchCandidates = async () => {
      try {
        console.log("Fetching candidates for jobId:", jobId);

        const res = await EmployerService.fetchApplicationData(jobId, "candidates");
        const apps = Array.isArray(res) ? res : [];

        if (mounted) {
          const mappedApps = apps.map((app) => {
            console.log("Raw app data:", app);
            const appId = app.id || app.applicationId || app._id || app.SeekerDetail?.applicationId || app.SeekerDetail?.id || app.SeekerDetail?._id || app.seekerDetail?.userId || app.userId ||null;

            return {
              id: appId,
              fullName: app.seekerDetail?.fullName || app.fullname || "",
              email: app.seekerDetail?.userEmail || app.email || "",
              experience: app.seekerDetail?.experienceName || "N/A",
              education: app.seekerDetail?.educationName || "N/A",
              resumeUrl: app.seekerDetail?.resumeUrl || "",
              applicationId: appId,
            };
          });

          setApplications(mappedApps);
          console.log("Mapped app:", mappedApps);
          console.log("Candidates loaded:", mappedApps.length);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();

    return () => {
      mounted = false;
    };
  }, [jobId]);

  // Khi selectedApplicationId thay đổi, fetch chi tiết ứng viên (application)
  useEffect(() => {
    if (!selectedApplicationId) {
      setSelectedApplicantDetail(null);
      return;
    }

    setLoadingDetail(true);

    const fetchApplicantDetail = async () => {
      try {
        const detail = await EmployerService.fetchCandidateDetail(
          jobId,
          selectedApplicationId
        );let applicant = detail;
        if (Array.isArray(detail)){
          applicant = detail.find(
        (item) =>
          item.id === selectedApplicationId ||
          item.applicationId === selectedApplicationId ||
          item.userId === selectedApplicationId
      );
        }

        setSelectedApplicantDetail({ ...applicant, applicationId: selectedApplicationId });
        console.log("Applicant detail:", { ...applicant, applicationId: selectedApplicationId });
      } catch (error) {
        console.error("Error fetching applicant details:", error);
        setSelectedApplicantDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchApplicantDetail();
  }, [selectedApplicationId, jobId]);

  const handleSelect = (app) => {
    console.log("Selected applicant ID:", app.applicationId);
    if (!app.applicationId) {
      alert("No application ID found.");
      return;
    }
    setSelectedApplicationId(app.applicationId);  // Set applicationId to fetch details
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

  const filteredApps = applications
    .filter(
      (app) =>
        (!filters.fullName ||
          app.fullName?.toLowerCase().includes(filters.fullName.toLowerCase())) &&
        (!filters.experience ||
          app.experience?.toLowerCase().includes(filters.experience.toLowerCase())) &&
        (!filters.education ||
          app.education?.toLowerCase().includes(filters.education.toLowerCase()))
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName)
    );

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
                  <option value="0-1 year">0-1 year</option>
                  <option value="1-3 year">1-3 year</option>
                  <option value="3-5 year">3-5 year</option>
                  <option value="5+ year">5+ year</option>
                </select>
                <select
                  name="education"
                  value={filters.education}
                  onChange={handleFilterChange}
                >
                  <option value="">Education</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
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
        {filteredApps.length > 0 ? (
          filteredApps.map((app, index) => (
            <Application
              key={index}
              {...app}
              handleSelect={() => handleSelect(app)}
              handleDownloadCV={() => handleDownloadCV(app)}
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
              style={{ position: "relative" }}
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

              <button
                className={styles.aiButton}
                onClick={() => setShowResumeProfile((prev) => !prev)}
                title="View Resume Profile"
              >
                AI
              </button>

              {showResumeProfile && <ResumeProfile applicationId={selectedApplicationId} />}
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

import React, { useState, useEffect } from "react";
import styles from "./Application.module.scss";
import SeekerDetail from "../SeekerDetail/SeekerDetail";
import EmployerService from "~/services/EmployerService";

const Application = ({
  fullName,
  email,
  appliedDate,
  handleSelect,
  handleDownloadCV,
}) => (
  <div className={styles.application} onClick={handleSelect}>
    <div className={styles.profile}>
      <div className={styles.avatar}></div>
      <div>
        <div className={styles.name}>{fullName}</div>
        <div className={styles.email}>{email}</div>
      </div>
    </div>
    <ul className={styles.details}>
      <li>Applied: {appliedDate}</li>
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
    title: "",
    experience: "",
    salary: "",
    jobType: "",
    education: "",
    jobLevel: "",
  });
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setApplications([]);
      return;
    }
    let mounted = true;
    const fetchData = async () => {
      const arr = await EmployerService.fetchApplicationFake(jobId);
      const apps = Array.isArray(arr) ? arr : arr ? [arr] : [];
      if (mounted) {
        setApplications(
          apps.map((app) => ({
            fullName: app.jobSeeker?.fullName || "",
            email: app.email || app.jobSeeker?.userEmail || "",
            title: app.title || app.jobSeeker?.title || "",
            experience: app.experience || app.jobSeeker?.experienceName || "",
            education: app.education || app.jobSeeker?.educationName || "",
            salary: app.salary || "",
            jobType: app.jobType || "",
            jobLevel: app.jobLevel || "",
            appliedDate: app.appliedAt
              ? new Date(app.appliedAt).toLocaleString()
              : "",
            originalData: app,
          }))
        );
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [jobId]);

  // Lấy chi tiết ứng viên
  const fetchCandidateDetail = async (jobId, applicationId) => {
    try {
      const res = await EmployerService.fetchCandidateDetail(jobId, applicationId);
      return res.result || null;
    } catch (error) {
      console.error("Lỗi fetch detail ứng viên:", error);
      return null;
    }
  };

  // Xử lý khi chọn ứng viên: gọi API lấy chi tiết rồi set
  const handleSelect = async (app) => {
    if (!jobId) return;
    const detail = await fetchCandidateDetail(jobId, app.originalData.id);
    if (detail) {
      setSelectedApplicant(detail);
    } else {
      setSelectedApplicant(app.originalData);
    }
  };

  const handleDownloadCV = (app) => {
    alert(`Download CV của ${app.fullName} (chưa có logic tải thực tế)`);
  };

  const handleDownloadAll = () => {
    alert("Tải tất cả CV (chưa có logic thực tế)");
  };

  const handleFilterToggle = (e) => {
    e.stopPropagation();
    setShowFilterPanel((prev) => !prev);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Lọc và sắp xếp
  const filteredApps = applications
    .filter(
      (app) =>
        (!filters.fullName ||
          app.fullName?.toLowerCase().includes(filters.fullName.toLowerCase())) &&
        (!filters.title ||
          app.title?.toLowerCase().includes(filters.title.toLowerCase())) &&
        (!filters.experience ||
          (app.experience && app.experience.includes(filters.experience))) &&
        (!filters.salary ||
          (app.salary && app.salary.toString().includes(filters.salary))) &&
        (!filters.jobType ||
          (app.jobType &&
            app.jobType.toLowerCase().includes(filters.jobType.toLowerCase()))) &&
        (!filters.education ||
          (app.education &&
            app.education.toLowerCase().includes(filters.education.toLowerCase()))) &&
        (!filters.jobLevel ||
          (app.jobLevel &&
            app.jobLevel.toLowerCase().includes(filters.jobLevel.toLowerCase())))
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.appliedDate) - new Date(a.appliedDate)
        : new Date(a.appliedDate) - new Date(b.appliedDate)
    );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Job Applications</div>

      <div className={styles.tabs}>
        <button className={styles.active}>
          All Applications ({applications.length})
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
                <input
                  name="title"
                  placeholder="Title"
                  value={filters.title}
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
                  name="salary"
                  value={filters.salary}
                  onChange={handleFilterChange}
                >
                  <option value="">Salary</option>
                  <option value="0-50k$">0-50k$</option>
                  <option value="50k-100k$">50k-100k$</option>
                  <option value="100k-200k$">100k-200k$</option>
                  <option value="200k$+">200k$+</option>
                </select>
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                >
                  <option value="">Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
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
                <select
                  name="jobLevel"
                  value={filters.jobLevel}
                  onChange={handleFilterChange}
                >
                  <option value="">Job Level</option>
                  <option value="Internship">Internship</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <select
          name="sortOrder"
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
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
          <div className={styles.noResults}>No results found</div>
        )}

        {selectedApplicant && (
          <div
            className={styles.overlay}
            onClick={() => setSelectedApplicant(null)}
          >
            <div
              className={styles.seekerBox}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedApplicant(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <SeekerDetail applicant={selectedApplicant} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;

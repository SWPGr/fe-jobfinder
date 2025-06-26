import React from "react";
import classNames from "classnames/bind";
import styles from "./Overview1.module.scss";
import { JobItemOwner } from "~/components";

const cx = classNames.bind(styles);

const jobs = [
  {
    title: "UI/UX Designer",
    type: "Full Time",
    remaining: "27 days remaining",
    status: "Active",
    applications: 798,
  },
  // ... các job khác
];

// Hàm chuyển chuỗi "27 days remaining" thành số 27
function parseRemainDay(remainStr) {
  const match = remainStr.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

const Overview1 = () => {
  return (
    <div className={cx("container")}>
      {/* Header */}
      <div className={cx("overview-header")}>
        <div className={cx("titleMain")}>Hello, Instagram</div>
        <p className={cx("desc")}>Here is your daily activities and applications</p>
      </div>

      {/* Info cards */}
      <div className={cx("info-cards")}>
        <div className={cx("info-card", "blue")}>
          <div className={cx("info-number")}>589</div>
          <div className={cx("info-label")}>Open Jobs</div>
          <div className={cx("info-icon")}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#2F80ED"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="7" width="18" height="14" rx="2" ry="2"></rect>
              <path d="M16 3h-8v4h8V3z"></path>
            </svg>
          </div>
        </div>
        <div className={cx("info-card", "yellow")}>
          <div className={cx("info-number")}>2,517</div>
          <div className={cx("info-label")}>Saved Candidates</div>
          <div className={cx("info-icon")}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#F2C94C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M7 21v-2a4 4 0 0 1 3-3.87"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>

      {/* Job list header */}
      <div className={cx("job-list-header")}>
        <div className={cx("sectionTitle")}>Recently Posted Jobs</div>
        <button className={cx("view-all-btn")}>
          View all <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Table header row */}
      <div className={cx("job-table-head")}>
        <span className={cx("jobs")}>JOBS</span>
        <span className={cx("status")}>STATUS</span>
        <span className={cx("applications")}>APPLICATIONS</span>
        <span className={cx("actions")}>ACTIONS</span>
      </div>

      {/* Job list */}
      <div className={cx("job-list")}>
        {jobs.map((job, idx) => {
          const jobDescription = {
            jobTitle: job.title,
            workTime: job.type,
            remainDay: parseRemainDay(job.remaining),
            isActive: job.status === "Active",
            numberApplications: job.applications,
          };

          return (
            <JobItemOwner
              key={idx}
              jobDescription={jobDescription}
              isVIP={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Overview1;
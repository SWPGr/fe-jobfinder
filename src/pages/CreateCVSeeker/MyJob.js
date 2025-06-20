import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./MyJob.module.scss";
import JobItemOwner from "~/components/JobItemOwner";

const cx = classNames.bind(styles);

const jobs = [
  {
    title: "UI/UX Designer",
    type: "Full Time",
    remaining: "27 days remaining",
    status: "Active",
    applications: 798,
    isVIP: true,
  },
  // ... các job khác như bạn đã cho ...
];

const jobsFormatted = jobs.map((job) => ({
  jobTitle: job.title,
  workTime: job.type,
  remainDay: job.remaining, // giữ nguyên string
  isActive: job.status === "Active",
  numberApplications: job.applications,
  isVIP: job.isVIP,
}));

const JobApplications = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("all");

  const applicationsData = {
    all: [
      {
        name: "Ronald Richards",
        role: "UI/UX Designer",
        experience: "7 Years Experience",
        education: "Master Degree",
        applied: "Jan 23, 2022",
        cvLink: "#",
      },
      // ... các ứng viên khác ...
    ],
    shortlisted: [
      {
        name: "Darren Elder",
        role: "UI/UX Designer",
        experience: "7 Years Experience",
        education: "Intermediate Degree",
        applied: "Jan 23, 2022",
        cvLink: "#",
      },
      // ... các ứng viên khác ...
    ],
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <button className={cx("closeBtn")} onClick={onClose}>
          ×
        </button>
        <div className={cx("breadcrumb")}>
          Home / Job / Senior UX Designer / <span>Applications</span>
        </div>
        <div className={cx("headingMain")}>Job Applications</div>

        <div className={cx("tabs")}>
          <button
            type="button"
            className={cx("tabBtn", { active: activeTab === "all" })}
            onClick={() => setActiveTab("all")}
          >
            All Application ({applicationsData.all.length})
          </button>
          <button
            type="button"
            className={cx("tabBtn", { active: activeTab === "shortlisted" })}
            onClick={() => setActiveTab("shortlisted")}
          >
            Shortlisted ({applicationsData.shortlisted.length})
          </button>
        </div>

        <div className={cx("applicationList")}>
          {(activeTab === "all"
            ? applicationsData.all
            : applicationsData.shortlisted
          ).map((app, idx) => (
            <div key={idx} className={cx("applicationCard")}>
              <div className={cx("avatar")}></div>
              <div className={cx("applicantInfo")}>
                <div className={cx("name")}>{app.name}</div>
                <div className={cx("role")}>{app.role}</div>
                <ul className={cx("details")}>
                  <li>• {app.experience}</li>
                  <li>• Education: {app.education}</li>
                  <li>• Applied: {app.applied}</li>
                </ul>
                <a href={app.cvLink} className={cx("downloadCv")}>
                  Download Cv
                </a>
              </div>
              <button className={cx("menuBtn")}>...</button>
            </div>
          ))}
        </div>

        <div className={cx("sortSection")}>
          <label>Sort Application</label>
          <div className={cx("sortOptions")}>
            <label>
              <input type="radio" name="sort" checked readOnly />
              Newest
            </label>
            <label>
              <input type="radio" name="sort" />
              Oldest
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyJob = () => {
  const [openJobApplications, setOpenJobApplications] = useState(false);

  return (
    <div className={cx("job-list-container")}>
      <div className={cx("header")}>
        <div className={cx("headingMain")}>
          My Jobs <span>({jobs.length})</span>
        </div>
      </div>

      <div className={cx("job-items-list")}>
        {jobsFormatted.map((job, idx) => (
          <JobItemOwner
            key={idx}
            jobDescription={{
              jobTitle: job.jobTitle,
              workTime: job.workTime,
              remainDay: job.remainDay,
              isActive: job.isActive,
              numberApplications: job.numberApplications,
            }}
            isVIP={job.isVIP}
            onViewApplications={() => setOpenJobApplications(true)}
          />
        ))}
      </div>

      <div className={cx("pagination")}>
        <button disabled>{"<"}</button>
        {[1, 2, 3, 4, 5].map((num) => (
          <button key={num} className={cx({ active: num === 1 })}>
            {num}
          </button>
        ))}
        <button>{">"}</button>
      </div>

      {openJobApplications && (
        <JobApplications onClose={() => setOpenJobApplications(false)} />
      )}
    </div>
  );
};

export default MyJob;

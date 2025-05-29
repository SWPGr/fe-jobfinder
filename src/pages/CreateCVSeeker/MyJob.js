import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./MyJob.module.scss";

const cx = classNames.bind(styles);

const jobs = [
  {
    title: "UI/UX Designer",
    type: "Full Time",
    remaining: "27 days remaining",
    status: "Active",
    applications: 798,
  },
  {
    title: "Senior UX Designer",
    type: "Internship",
    remaining: "8 days remaining",
    status: "Active",
    applications: 185,
  },
  {
    title: "Junior Graphic Designer",
    type: "Full Time",
    remaining: "24 days remaining",
    status: "Active",
    applications: 583,
  },
  {
    title: "Front End Developer",
    type: "Full Time",
    remaining: "Dec 7, 2019",
    status: "Expire",
    applications: 740,
  },
  {
    title: "Techical Support Specialist",
    type: "Part Time",
    remaining: "4 days remaining",
    status: "Active",
    applications: 556,
  },
  {
    title: "Interaction Designer",
    type: "Contract Base",
    remaining: "Feb 2, 2019",
    status: "Expire",
    applications: 426,
  },
  {
    title: "Software Engineer",
    type: "Temporary",
    remaining: "9 days remaining",
    status: "Active",
    applications: 922,
  },
  {
    title: "Product Designer",
    type: "Full Time",
    remaining: "7 days remaining",
    status: "Active",
    applications: 994,
  },
  {
    title: "Project Manager",
    type: "Full Time",
    remaining: "Dec 4, 2019",
    status: "Expire",
    applications: 196,
  },
  {
    title: "Marketing Manager",
    type: "Full Time",
    remaining: "4 days remaining",
    status: "Active",
    applications: 492,
  },
];

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
    {
      name: "Theresa Webb",
      role: "Product Designer",
      experience: "7 Years Experience",
      education: "High School Degree",
      applied: "Jan 23, 2022",
      cvLink: "#",
    },
    {
      name: "Devon Lane",
      role: "User Experience Designer",
      experience: "7 Years Experience",
      education: "Master Degree",
      applied: "Jan 23, 2022",
      cvLink: "#",
    },
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
    {
      name: "Jenny Wilson",
      role: "UI Designer",
      experience: "7 Years Experience",
      education: "Bachelor Degree",
      applied: "Jan 23, 2022",
      cvLink: "#",
    },
  ],
};

const JobApplications = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <button className={cx("closeBtn")} onClick={onClose}>
          ×
        </button>
        <div className={cx("breadcrumb")}>
          Home / Job / Senior UX Designer / <span>Applications</span>
        </div>
        <h2>Job Applications</h2>

        <div className={cx("tabs")}>
          <button
            className={activeTab === "all" ? cx("active") : ""}
            onClick={() => setActiveTab("all")}
          >
            All Application ({applicationsData.all.length})
          </button>
          <button
            className={activeTab === "shortlisted" ? cx("active") : ""}
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
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [openJobApplications, setOpenJobApplications] = useState(false);

  const toggleDropdown = (idx) => {
    setActiveDropdownId((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={cx("job-list-container")}>
      <div className={cx("header")}>
        <h2>
          My Jobs <span>(589)</span>
        </h2>
        <div className={cx("job-status-filter")}>
          <label>Job status</label>
          <select>
            <option>All Jobs</option>
            <option>Active</option>
            <option>Expired</option>
          </select>
        </div>
      </div>

      <table className={cx("job-table")}>
        <thead>
          <tr>
            <th>JOBS</th>
            <th>STATUS</th>
            <th>APPLICATIONS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, idx) => (
            <tr
              key={idx}
              className={cx("job-row", {
                expire: job.status === "Expire",
                active: job.status === "Active",
                hoverable: true,
              })}
            >
              <td className={cx("job-info")}>
                <div className={cx("job-title")}>{job.title}</div>
                <div className={cx("job-subtitle")}>
                  {job.type} • {job.remaining}
                </div>
              </td>
              <td
                className={cx("status", {
                  active: job.status === "Active",
                  expire: job.status === "Expire",
                })}
              >
                {job.status === "Active" ? "✓ Active" : "✗ Expire"}
              </td>
              <td className={cx("applications")}>
                {job.applications} Applications
              </td>
              <td className={cx("actions")}>
                <button
                  className={cx("view-btn")}
                  onClick={() => setOpenJobApplications(true)}
                >
                  View Applications
                </button>
                <div className={cx("dropdown")}>
                  <button
                    className={cx("more-btn")}
                    onClick={() => toggleDropdown(idx)}
                    aria-label="More options"
                  >
                    ⋮
                  </button>
                  {activeDropdownId === idx && (
                    <div className={cx("dropdown-content")}>
                      <a href="#">Promote Job</a>
                      <a href="#">View Detail</a>
                      <a href="#">Make it Expire</a>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Overview1.module.scss";

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
    title: "Techical Support Specialist",
    type: "Part Time",
    remaining: "4 days remaining",
    status: "Active",
    applications: 556,
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
];

const Overview1 = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div>
          <h3>Hello, Instagram</h3>
          <p>Here is your daily activities and applications</p>
        </div>
        <div className={cx("stats")}>
          <div className={cx("stat-box", "open-jobs")}>
            <div className={cx("number")}>589</div>
            <div className={cx("label")}>Open Jobs</div>
            <div className={cx("icon")}>📁</div>
          </div>
          <div className={cx("stat-box", "saved-candidates")}>
            <div className={cx("number")}>2,517</div>
            <div className={cx("label")}>Saved Candidates</div>
            <div className={cx("icon")}>👤</div>
          </div>
        </div>
      </div>

      <div className={cx("job-list")}>
        <div className={cx("job-list-header")}>
          <div>Recently Posted Jobs</div>
          <div className={cx("view-all")}>
            View all <span>→</span>
          </div>
        </div>

        <table className={cx("table")}>
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
                className={cx({
                  // Không còn highlight màu nền cố định nữa
                })}
              >
                <td>
                  <div className={cx("job-title")}>{job.title}</div>
                  <div className={cx("job-subtitle")}>
                    {job.type} • {job.remaining}
                  </div>
                </td>
                <td>
                  <span
                    className={cx(
                      "status",
                      job.status === "Active" ? "active" : "expired"
                    )}
                  >
                    {job.status === "Active" ? "✓ Active" : "✗ Expire"}
                  </span>
                </td>
                <td>
                  <span className={cx("applications")}>
                    {job.applications} Applications
                  </span>
                </td>
                <td>
                  <button className={cx("view-btn")}>View Applications</button>
                  <button
                    className={cx("dropdown-btn")}
                    onClick={() => toggleDropdown(idx)}
                    aria-label="More options"
                  >
                    ⋮
                  </button>
                  {activeDropdown === idx && (
                    <ul className={cx("dropdown-menu")}>
                      <li>Promote Job</li>
                      <li>View Detail</li>
                      <li>Mark as expired</li>
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview1;

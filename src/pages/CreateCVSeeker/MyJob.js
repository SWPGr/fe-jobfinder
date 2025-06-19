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
  {
    title: "Senior UX Designer",
    type: "Internship",
    remaining: "8 days remaining",
    status: "Active",
    applications: 185,
    isVIP: false,
  },
  {
    title: "Junior Graphic Designer",
    type: "Full Time",
    remaining: "24 days remaining",
    status: "Active",
    applications: 583,
    isVIP: false,
  },
  {
    title: "Front End Developer",
    type: "Full Time",
    remaining: "Dec 7, 2019",
    status: "Expire",
    applications: 740,
    isVIP: false,
  },
  {
    title: "Techical Support Specialist",
    type: "Part Time",
    remaining: "4 days remaining",
    status: "Active",
    applications: 556,
    isVIP: true,
  },
  {
    title: "Interaction Designer",
    type: "Contract Base",
    remaining: "Feb 2, 2019",
    status: "Expire",
    applications: 426,
    isVIP: false,
  },
  {
    title: "Software Engineer",
    type: "Temporary",
    remaining: "9 days remaining",
    status: "Active",
    applications: 922,
    isVIP: false,
  },
  {
    title: "Product Designer",
    type: "Full Time",
    remaining: "7 days remaining",
    status: "Active",
    applications: 994,
    isVIP: false,
  },
  {
    title: "Project Manager",
    type: "Full Time",
    remaining: "Dec 4, 2019",
    status: "Expire",
    applications: 196,
    isVIP: true,
  },
  {
    title: "Marketing Manager",
    type: "Full Time",
    remaining: "4 days remaining",
    status: "Active",
    applications: 492,
    isVIP: false,
  },
];

// Định dạng dữ liệu cho JobItemOwner
const jobsFormatted = jobs.map((job) => ({
  jobTitle: job.title,
  workTime: job.type,
  remainDay: parseInt(job.remaining) || 0,
  isActive: job.status === "Active",
  numberApplications: job.applications,
  isVIP: job.isVIP,
}));

const JobApplications = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("all");

  // Ví dụ dữ liệu ứng viên giữ nguyên như bạn đã cung cấp
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
  const [openJobApplications, setOpenJobApplications] = useState(false);

  return (
    <div className={cx("job-list-container")}>
      <div className={cx("header")}>
        <h2>
          My Jobs <span>({jobs.length})</span>
        </h2>
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

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Overview1.module.scss";
import { JobItemOwner } from "~/components";
import EmployerService from "~/services/EmployerService";

const cx = classNames.bind(styles);

const Overview1 = () => {
  const [jobs, setJobs] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await EmployerService.fetchTotalJobs();

        // Lấy mảng job chi tiết
        const jobList = result.content || [];

        // Tính tổng ứng tuyển từ jobApplicationCounts
        const totalApps = jobList.reduce(
          (sum, job) => sum + (job.jobApplicationCounts || 0),
          0
        );

        setJobs(jobList);
        setTotalApplications(totalApps);

        console.log("API result:", result);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchJobs();
  }, []);

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
          <div className={cx("info-number")}>{jobs.length}</div>
          <div className={cx("info-label")}>Open Jobs</div>
          <div className={cx("info-icon")}>{/* SVG icon here */}</div>
        </div>
        <div className={cx("info-card", "yellow")}>
          <div className={cx("info-number")}>{totalApplications}</div>
          <div className={cx("info-label")}>Total Applications</div>
          <div className={cx("info-icon")}>{/* SVG icon here */}</div>
        </div>
      </div>

      {/* Job list */}
      <div className={cx("job-list-header")}>
        <div className={cx("sectionTitle")}>Recently Posted Jobs</div>
      </div>

      <div className={cx("job-table-head")}>
        <span className={cx("jobs")}>JOBS</span>
        <span className={cx("status")}>STATUS</span>
        <span className={cx("applications")}>APPLICATIONS</span>
        <span className={cx("actions")}>ACTIONS</span>
      </div>

      <div className={cx("job-list")}>
        {jobs.map((job, idx) => {
          // Chuẩn bị dữ liệu truyền cho JobItemOwner
          const jobDescription = {
            id: job.id, // THÊM ID Ở ĐÂY để component con nhận đúng
            jobTitle: job.title,
            workTime: job.jobType?.name || "Full Time",
            remainDay: 30, 
            isActive: true,
            numberApplications: job.jobApplicationCounts || 0,
          };

          return (
            <JobItemOwner
              key={job.id || idx}
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

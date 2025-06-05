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
  return match ? Number(match[0]) : 0; // Nếu không tìm thấy, trả về 0
}

const Overview1 = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("job-list")}>
        {jobs.map((job, idx) => {
          // Chuyển đổi dữ liệu
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
              isVIP={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Overview1;
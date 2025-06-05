import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./FindJob.module.scss";

const cx = classNames.bind(styles);

const jobData = [
  {
    id: 1,
    company: "Reddit",
    title: "Marketing Officer",
    tags: ["Featured", "Design"],
    location: "United Kingdom of Great Britain",
    jobType: "Full Time",
    salary: "$30K-$35K",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Windows_Logo_2012.svg/120px-Windows_Logo_2012.svg.png",
    logoBg: "#FF4500",
  },
  {
    id: 2,
    company: "Dribbble",
    title: "Senior UX Designer",
    tags: ["Featured"],
    location: "California",
    jobType: "Full-Time",
    salary: "$50k-$80k/month",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    logoBg: "#EA4C89",
  },
  {
    id: 3,
    company: "Freepik",
    title: "Visual Designer",
    tags: ["Featured"],
    location: "China",
    jobType: "Full Time",
    salary: "$10K-$15K",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Uber_logo_2018.svg",
    logoBg: "#0057FF",
  },
  // ...thêm các job khác tương tự
];

const JobCard = ({ job, isSelected, onSelect, placeholder }) => {
  if (placeholder) {
    return <div className={cx("jobCard", "placeholder")} />;
  }
  return (
    <div
      className={cx("jobCard", { selected: isSelected })}
      onClick={() => onSelect(job.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(job.id)}
      aria-pressed={isSelected}
    >
      <div
        className={cx("logo")}
        style={{ backgroundColor: job.logoBg || "#ddd" }}
      >
        <img src={job.logo} alt={`${job.company} logo`} />
      </div>
      <div className={cx("jobContent")}>
        <div className={cx("companyName")}>
          {job.company}
          {job.tags.includes("Featured") && (
            <span className={cx("tagFeatured")}>Featured</span>
          )}
        </div>
        <div className={cx("location")}>{job.location}</div>
        <h4 className={cx("jobTitle")}>{job.title}</h4>
        <div className={cx("jobMeta")}>
          <span>{job.jobType}</span> • <span>{job.salary}</span>
        </div>
      </div>
    </div>
  );
};

const FindJob = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [filters, setFilters] = useState(["Design", "New York"]);
  const [sortOption, setSortOption] = useState("Latest");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [layout, setLayout] = useState("grid");

  const perPage = itemsPerPage;

  // Xóa filter tag
  const removeFilter = (tag) => {
    setFilters(filters.filter((f) => f !== tag));
  };

  // Lọc và sắp xếp jobs
  const filteredJobs = jobData
    .filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        (category === "" || job.tags.includes(category)) &&
        filters.every((f) =>
          [job.title, job.location, ...job.tags].some((field) =>
            field.toLowerCase().includes(f.toLowerCase())
          )
        )
    )
    .sort((a, b) => {
      if (sortOption === "Latest") return b.id - a.id;
      if (sortOption === "Oldest") return a.id - b.id;
      return 0;
    });

  const totalPages = Math.ceil(filteredJobs.length / perPage);
  const displayedJobs = filteredJobs.slice((page - 1) * perPage, page * perPage);
  const placeholdersCount = perPage - displayedJobs.length;

  return (
    <div className={cx("findJobContainer")}>
      <h2 className={cx("pageTitle")}>Find Job</h2>

      {/* Thanh filter tags và lựa chọn sắp xếp, items per page, layout */}
      <div className={cx("filterTagsBar")}>
        <div className={cx("tagsList")}>
          {filters.map((filter) => (
            <div key={filter} className={cx("filterTag")}>
              {filter}
              <button
                className={cx("removeTagBtn")}
                onClick={() => removeFilter(filter)}
                aria-label={`Remove filter ${filter}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className={cx("sortItemsLayout")}>
          <select
            className={cx("sortSelect")}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Latest</option>
            <option>Oldest</option>
          </select>

          <select
            className={cx("itemsPerPageSelect")}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={6}>6 per page</option>
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
          </select>

          <div className={cx("layoutToggle")}>
            <button
              className={cx({ active: layout === "grid" })}
              onClick={() => setLayout("grid")}
              aria-label="Grid view"
              type="button"
            >
              &#x25A3;
            </button>
            <button
              className={cx({ active: layout === "list" })}
              onClick={() => setLayout("list")}
              aria-label="List view"
              type="button"
            >
              &#x2630;
            </button>
          </div>
        </div>
      </div>

      {/* Filters tìm kiếm cơ bản */}
      <div className={cx("filters")}>
        <input
          type="text"
          placeholder="Job title, keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cx("inputSearch")}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={cx("inputLocation")}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={cx("selectCategory")}
        >
          <option value="">Select Category</option>
          <option value="Featured">Featured</option>
          <option value="Remote">Remote</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract Base">Contract Base</option>
          <option value="Temporary">Temporary</option>
        </select>
        <button onClick={() => setPage(1)} className={cx("btnFind")}>
          Find Job
        </button>
      </div>

      {/* Danh sách job */}
      <div className={cx(layout === "grid" ? "jobGrid" : "jobList")}>
        {displayedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={selectedJobId === job.id}
            onSelect={setSelectedJobId}
          />
        ))}

        {/* Placeholder cho đủ 12 ô */}
        {placeholdersCount > 0 &&
          Array.from({ length: placeholdersCount }).map((_, idx) => (
            <JobCard key={`placeholder-${idx}`} placeholder />
          ))}
      </div>

      {/* Phân trang */}
      <div className={cx("pagination")}>
        <button
          className={cx("pageArrow")}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          aria-label="Previous page"
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              className={cx("pageBtn", { active: page === pageNum })}
              onClick={() => setPage(pageNum)}
              type="button"
            >
              {pageNum}
            </button>
          );
        })}
        <button
          className={cx("pageArrow")}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          aria-label="Next page"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FindJob;

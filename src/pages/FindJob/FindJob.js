import React, { useState } from "react";
import styles from "./FindJob.module.scss";

const jobData = [
  {
    id: 1,
    title: "Marketing Manager",
    tags: ["Featured", "Remote"],
    location: "New Mexico, USA",
    salary: "$50K-$60k/month",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Windows_Logo_2012.svg/120px-Windows_Logo_2012.svg.png",
  },
  {
    id: 2,
    title: "Project Manager",
    tags: ["Featured", "Full Time"],
    location: "Dhaka, Bangladesh",
    salary: "$60k-$80k/month",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: 3,
    title: "Interaction Designer",
    tags: ["Featured", "Full Time"],
    location: "New York, USA",
    salary: "$50k-$60k/month",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Logo_Figma_2021.svg",
  },
  {
    id: 4,
    title: "Networking Engineer",
    tags: ["Full Time"],
    location: "Washington, USA",
    salary: "$30k-$35k",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Uber_logo_2018.svg",
  },
  {
    id: 5,
    title: "Product Designer",
    tags: ["Full Time"],
    location: "Ohio, USA",
    salary: "$50k-$60k/month",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Uber_Logo_2018.svg",
  },
  {
    id: 6,
    title: "Junior Graphic Designer",
    tags: ["Full Time"],
    location: "Nature, Bangladesh",
    salary: "$30k-$40k",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Upwork_Logo.svg/120px-Upwork_Logo.svg.png",
  },
  {
    id: 7,
    title: "Software Engineer",
    tags: ["Part Time"],
    location: "Moretomo, USA",
    salary: "$30k-$33k",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Twitter_icon.svg/120px-Twitter_icon.svg.png",
  },
  {
    id: 8,
    title: "Front End Developer",
    tags: ["Contract Base"],
    location: "Silva, Turkey",
    salary: "$30k-$35k",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png",
  },
  {
    id: 9,
    title: "Technical Support Specialist",
    tags: ["Full Time"],
    location: "Chattogram, Bangladesh",
    salary: "$30k-$35k",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Instagram_icon.png",
  },
  {
    id: 10,
    title: "Visual Designer",
    tags: ["Full Time"],
    location: "Konya, Turkey",
    salary: "$20k-$25k",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Instagram_icon.png",
  },
  {
    id: 11,
    title: "Marketing Officer",
    tags: ["Temporary"],
    location: "Penn, USA",
    salary: "$30k-$35k",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Uber_logo_2018.svg",
  },
  {
    id: 12,
    title: "Senior UX Designer",
    tags: ["Full Time"],
    location: "Mymensingh, Bangladesh",
    salary: "$50k-$60k/month",
    daysRemaining: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Uber_logo_2018.svg",
  },
];

const tagClassMap = {
  Featured: styles.Featured,
  Remote: styles.Remote,
  "Full Time": styles.FullTime,
  "Part Time": styles.PartTime,
  "Contract Base": styles.ContractBase,
  Temporary: styles.Temporary,
};

const JobCard = ({ job }) => (
  <div className={styles.jobCard}>
    <div className={styles.leftSide}>
      <img src={job.logo} alt="logo" />
      <div className={styles.jobInfo}>
        <h3>{job.title}</h3>
        <div className={styles.tags}>
          {job.tags.map((tag) => (
            <span key={tag} className={tagClassMap[tag]}>
              {tag}
            </span>
          ))}
        </div>
        <p>
          {job.location} | {job.salary}
        </p>
        <small>{job.daysRemaining} Days Remaining</small>
      </div>
    </div>
    <button>Apply Now</button>
  </div>
);

const FindJob = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filteredJobs = jobData.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase()) &&
      (category === "" || job.tags.includes(category))
  );

  const totalPages = Math.ceil(filteredJobs.length / perPage);
  const displayedJobs = filteredJobs.slice((page - 1) * perPage, page * perPage);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Find Job</h2>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Job title, keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Featured">Featured</option>
          <option value="Remote">Remote</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract Base">Contract Base</option>
          <option value="Temporary">Temporary</option>
        </select>
        <button onClick={() => setPage(1)}>Find Job</button>
      </div>

      {displayedJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      <div className={styles.pagination}>
        <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FindJob;

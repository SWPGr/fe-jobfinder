import React from "react";
import styles from "./Single.module.scss";
import classNames from "classnames/bind";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineLink, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const companyInfo = {
  name: "Twitter",
  industry: "Information Technology (IT)",
  description: `Fusce et erat in nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem. Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisl, quis fringilla orci. Donec quis orci, iaculis et rutrum dolor, ultricies purus erat. Etiam vulputate quam mi et felis. Sed ut posuere risus, vitae commodo erat. Nullam in lorem dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla tincidunt ac quam eu vehicula. Quisque suscipit elementum neque. Vivamus elementum ex nec orci gravida. Sed dignissim placerat donec, ac laoreet eros rutrum sit amet. Donec imperdiet in leo at imperdiet. In hac habitasse platea dictumst. Sed quis nisi molestie diam ullamcorper condimentum. Sed aliquet, orci eget rutrum bibendum, odio enim rutrum arcu, quis suscipit mauris turpis in neque. Vestibulum id vestibulum odio. Sed dolor felis, iaculis eget turpis eu, lobortis imperdiet massa.`,
  benefits: [
    "In hac habitasse platea dictumst.",
    "Sed aliquet, orci eget rutrum bibendum, odio enim rutrum arcu.",
    "Vestibulum id vestibulum odio.",
    "Etiam lorem ante accumsan id iaculis venenatis mollis vulputate nefft.",
    "Nam condimentum sit amet ipsum in malesuada."
  ],
  vision: `Praesent ultrices mauris et nisl ultricies, et venenatis augue blandit. Etiam massa risus, accumsan nec tempus nec, venenatis in nisi. Maecenas nulla ex, blandit in magna id, pellentesque facilisis sapien. In feugiat auctor mi, eget commodo lectus convallis ac.`,
  contact: {
    website: "www.estherhoward.com",
    phone: "+1-202-555-0141",
    email: "esther.howard@gmail.com"
  },
  details: {
    date: "14 June, 2021",
    type: "Private Company",
    vacancies: "120-300 Candidates",
    industry: "Technology"
  },
  social: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    youtube: "#"
  }
};

const openPositions = [
  {
    id: 1,
    company: "Freepik",
    location: "China",
    role: "Visual Designer",
    type: "Full Time",
    salary: "$109-$15K",
    featured: true,
    icon: (
      <svg width="16" height="16" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 13h-3v3h-4v-3H7v-4h3V8h4v3h3v4z" />
      </svg>
    )
  },
  {
    id: 2,
    company: "Instagram",
    location: "Australia",
    role: "Front End Developer",
    type: "Contract Base",
    salary: "$90K-$60K",
    icon: (
      <svg width="16" height="16" fill="#E4405F" viewBox="0 0 24 24">
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm5 3a5 5 0 110 10 5 5 0 010-10zm5-.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
      </svg>
    )
  },
  {
    id: 3,
    company: "Upwork",
    location: "France",
    role: "Technical Support Specialist",
    type: "Full Time",
    salary: "$35K-$40K",
    icon: (
      <svg width="16" height="16" fill="#7AC70C" viewBox="0 0 24 24">
        <path d="M21.78 3.22a1.75 1.75 0 00-2.474 0l-8.132 8.13-4.32-4.32a1.75 1.75 0 00-2.475 2.475l6.017 6.018a1.75 1.75 0 002.474 0l9.27-9.27a1.75 1.75 0 000-2.473z" />
      </svg>
    )
  },
  {
    id: 4,
    company: "Facebook",
    location: "United Kingdom of Great Britain",
    role: "Software Engineer",
    type: "Part Time",
    salary: "$19K-$20K",
    icon: <FaFacebookF color="#1877F2" />
  },
  {
    id: 5,
    company: "Microsoft",
    location: "Australia",
    role: "Product Designer",
    type: "Full Time",
    salary: "$40K-$50K",
    icon: (
      <svg width="16" height="16" fill="#f25022" viewBox="0 0 24 24">
        <path d="M0 0h10v10H0V0zm12 0h10v10h-10V0zM0 12h10v10H0v-10zm12 0h10v10h-10v-10z" />
      </svg>
    )
  }
];

function JobCard({ job }) {
  return (
    <Link to={`/job/${job.id}`} className={cx("jobCard", { featured: job.featured })}>
      <div className={cx("jobHeader")}>
        <div className={cx("jobCompany")}>
          {job.icon}
          {job.company}
        </div>
        {job.featured && <div className={cx("featuredTag")}>Featured</div>}
      </div>
      <div className={cx("jobLocation")}>{job.location}</div>
      <div className={cx("jobTitle")}>{job.role}</div>
      <div className={cx("jobTypeSalary")}>
        {job.type} • {job.salary}
      </div>
    </Link>
  );
}

export default function Single() {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapperBox")}>
        {/* Header */}
        <div className={cx("header")}>
          <div className={cx("companyInfo")}>
            <div className={cx("companyLogo")}>
              <FaInstagram size={28} />
            </div>
            <div className={cx("companyDetails")}>
              <div className={cx("companyName")}>{companyInfo.name}</div>
              <div className={cx("industry")}>{companyInfo.industry}</div>
            </div>
          </div>
          <button className={cx("btnOpenPosition")}>
            View Open Position <span style={{ marginLeft: 6 }}>→</span>
          </button>
        </div>

        <div className={cx("section")}>
          {/* Left Column */}
          <div className={cx("leftColumn")}>
            <h3>Description</h3>
            <p className={cx("description")}>{companyInfo.description}</p>

            <h4>Company Benefits</h4>
            <ul className={cx("benefitsList")}>
              {companyInfo.benefits.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h4>Company Vision</h4>
            <p className={cx("companyVision")}>{companyInfo.vision}</p>

            <div className={cx("shareProfile")}>
              <button><FaFacebookF /> Facebook</button>
              <button><FaTwitter /> Twitter</button>
              <button><FaInstagram /> Pinterest</button>
            </div>
          </div>

          {/* Right Column */}
          <div className={cx("rightColumn")}>
            <div className={cx("card")}>
              <div className={cx("cardRow")}>
                <div className={cx("cardLabel")}><AiOutlineCalendar /> Founded</div>
                <div className={cx("cardValue")}>{companyInfo.details.date}</div>
              </div>
              <div className={cx("cardRow")}>
                <div className={cx("cardLabel")}><AiOutlineLink /> Organization Type</div>
                <div className={cx("cardValue")}>{companyInfo.details.type}</div>
              </div>
              <div className={cx("cardRow")}>
                <div className={cx("cardLabel")}>Team Size</div>
                <div className={cx("cardValue")}>{companyInfo.details.vacancies}</div>
              </div>
              <div className={cx("cardRow")}>
                <div className={cx("cardLabel")}>Industry Type</div>
                <div className={cx("cardValue")}>{companyInfo.details.industry}</div>
              </div>
            </div>

            <div className={cx("card")}>
              <h4>Contact Information</h4>
              <div className={cx("contactRow")}>
                <AiOutlineLink className={cx("contactIcon")} />
                <a href={`https://${companyInfo.contact.website}`} target="_blank" rel="noreferrer">
                  {companyInfo.contact.website}
                </a>
              </div>
              <div className={cx("contactRow")}>
                <AiOutlinePhone className={cx("contactIcon")} />
                <span>{companyInfo.contact.phone}</span>
              </div>
              <div className={cx("contactRow")}>
                <AiOutlineMail className={cx("contactIcon")} />
                <a href={`mailto:${companyInfo.contact.email}`}>{companyInfo.contact.email}</a>
              </div>
              <div className={cx("followUs")}>Follow us on:</div>
              <div className={cx("socialLinks")}>
                <a href={companyInfo.social.facebook} className={cx("socialLink")}><FaFacebookF /></a>
                <a href={companyInfo.social.twitter} className={cx("socialLink")}><FaTwitter /></a>
                <a href={companyInfo.social.instagram} className={cx("socialLink")}><FaInstagram /></a>
                <a href={companyInfo.social.youtube} className={cx("socialLink")}><FaYoutube /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <section className={cx("openPositions")}>
          <div className={cx("openPositionsHeader")}>Open Position ({openPositions.length})</div>
          <div className={cx("jobsGrid")}>
            {openPositions.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

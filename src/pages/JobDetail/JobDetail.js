import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./JobDetail.module.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import PostJob from "../CreateCVSeeker/PostJob";

const cx = classNames.bind(styles);

const noop = () => undefined;

const JobDetail = ({ job = null, editable = false, onSave = noop, onCancel = noop }) => {
  const defaultJob = {
    jobTitle: "Senior UX Designer",
    badges: { featured: true, fulltime: true },
    contactUrl: "https://instagram.com",
    phone: "(406) 555-0120",
    email: "career@instagram.com",
    jobDescription: [
      "Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante at, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.",
      "Nam dapibus consectetur erat in euismod. Cras urna augue, mollis venenatis augue sed, porttitor aliquet nibh. Sed tristique dictum elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in neque sit amet orci interdum tincidunt.",
    ],
    responsibilities: [
      "Quisque semper gravida est et consectetur.",
      "Curabitur blandit lorem velit, vitae pretium leo placerat eget.",
      "Morbi mattis in ipsum ac tempus.",
      "Curabitur eu vehicula libero. Vestibulum sed purus ullamcorper, lobortis lectus nec.",
      "Vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.",
      "Lobortis vel lectus. Nulla at risus ut diam.",
      "Commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.",
      "Odio metus posuere lorem, id condimentum erat velit nec neque.",
      "Dui sodales ut. Curabitur tempus augue.",
    ],
    overview: {
      posted: "14 June, 2021",
      expire: "14 July, 2021",
      education: "Graduation",
      salary: "$50k-$80k/month",
      location: "New York, USA",
      jobType: "Full Time",
      experience: "10-15 Years",
    },
    company: {
      name: "Instagram",
      description: "Social networking service",
      founded: "March 21, 2006",
      organization: "Private Company",
      size: "120-300 Employers",
      phone: "(406) 555-0120",
      email: "twitter@gmail.com",
      website: "https://twitter.com",
    },
  };

  const mergeWithDefault = (jobData) => ({
    ...defaultJob,
    ...jobData,
    badges: { ...defaultJob.badges, ...(jobData?.badges || {}) },
    overview: { ...defaultJob.overview, ...(jobData?.overview || {}) },
    company: { ...defaultJob.company, ...(jobData?.company || {}) },
    jobDescription: jobData?.jobDescription || defaultJob.jobDescription,
    responsibilities: jobData?.responsibilities || defaultJob.responsibilities,
  });

  const [formData, setFormData] = useState(mergeWithDefault(job));

  useEffect(() => {
    setFormData(mergeWithDefault(job));
  }, [job, editable]);

  const handleChange = (e, idx = null, section = null) => {
    const name = e.target.name;
    const value = e.target.value;

    if (section === "jobDescription") {
      const newArr = [...formData.jobDescription];
      newArr[idx] = value;
      setFormData((prev) => ({ ...prev, jobDescription: newArr }));
      return;
    }

    if (section === "responsibilities") {
      const newArr = [...formData.responsibilities];
      newArr[idx] = value;
      setFormData((prev) => ({ ...prev, responsibilities: newArr }));
      return;
    }

    if (name.startsWith("overview.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        overview: { ...prev.overview, [key]: value },
      }));
      return;
    }

    if (name.startsWith("company.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (section) => {
    if (section === "responsibilities") {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, ""],
      }));
    } else if (section === "jobDescription") {
      setFormData((prev) => ({
        ...prev,
        jobDescription: [...prev.jobDescription, ""],
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <div className={cx("header")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png"
            alt={formData.company.name || "Company Logo"}
            className={cx("logo")}
          />
          <div className={cx("job-info")}>
            {editable ? (
              <input
                className={cx("job-info__title", "job-title")}
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            ) : (
              <div className={cx("job-info__title")}>
                {formData.jobTitle}{" "}
                {formData.badges?.featured && (
                  <span className={cx("job-info__badge", "job-info__badge--featured")}>Featured</span>
                )}
                {formData.badges?.fulltime && (
                  <span className={cx("job-info__badge", "job-info__badge--fulltime")}>Full Time</span>
                )}
              </div>
            )}

            <div className={cx("contact")}>
              {editable ? (
                <>
                  <input
                    type="text"
                    name="contactUrl"
                    value={formData.contactUrl}
                    onChange={handleChange}
                    className={cx("contact__link")}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <a
                    href={formData.contactUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cx("contact__link")}
                  >
                    {formData.contactUrl}
                  </a>
                  <span>📞 {formData.phone}</span>
                  <span>✉️ {formData.email}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={cx("job-description")}>
          <div className={cx("job-description__title")}>Job Description</div>
          {editable ? (
            <>
              {formData.jobDescription.map((para, idx) => (
                <textarea
                  key={idx}
                  value={para}
                  onChange={(e) => handleChange(e, idx, "jobDescription")}
                  rows={4}
                  className={cx("editable-textarea", "job-description__paragraph")}
                />
              ))}
              <button
                type="button"
                onClick={() => handleAddItem("jobDescription")}
                className={cx("add-item-btn")}
              >
                + Add Job Description Paragraph
              </button>
            </>
          ) : (
            formData.jobDescription.map((para, idx) => (
              <p key={idx} className={cx("job-description__paragraph")}>
                {para}
              </p>
            ))
          )}
        </div>

        <div className={cx("responsibilities")}>
          <div className={cx("responsibilities__title")}>Responsibilities</div>
          {editable ? (
            <>
              <ul className={cx("responsibilities__list")}>
                {formData.responsibilities.map((item, idx) => (
                  <li key={idx} className={cx("responsibilities__item")}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleChange(e, idx, "responsibilities")}
                      className={cx("editable-input")}
                    />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleAddItem("responsibilities")}
                className={cx("add-item-btn")}
              >
                + Add Responsibility
              </button>
            </>
          ) : (
            <ul className={cx("responsibilities__list")}>
              {formData.responsibilities.map((item, idx) => (
                <li key={idx} className={cx("responsibilities__item")}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={cx("share")}>
          <span className={cx("share__label")}>Share this job:</span>
          <div className={cx("share-buttons")}>
            <button className={cx("share-buttons__btn", "facebook")}>Facebook</button>
            <button className={cx("share-buttons__btn", "twitter")}>Twitter</button>
            <button className={cx("share-buttons__btn", "pinterest")}>Pinterest</button>
          </div>
        </div>
      </div>

      <div className={cx("right")}>
        <div className={cx("job-overview")}>
          <div className={cx("job-overview__title")}>Job Overview</div>
          {Object.entries(formData.overview).map(([key, value]) => (
            <div key={key} className={cx("overview-item")}>
              <span className={cx("overview-item__icon")}>
                {{
                  posted: "📅",
                  expire: "⏰",
                  education: "🎓",
                  salary: "💰",
                  location: "📍",
                  jobType: "💼",
                  experience: "🕒",
                }[key] || "ℹ️"}
              </span>
              <div>
                <p className={cx("overview-item__label")}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                  :
                </p>
                {editable ? (
                  <input
                    type="text"
                    name={`overview.${key}`}
                    value={value}
                    onChange={handleChange}
                    className={cx("editable-input", "overview-item__value")}
                  />
                ) : (
                  <strong className={cx("overview-item__value")}>{value}</strong>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={cx("company-info")}>
          <div className={cx("company-info__title")}>{formData.company.name}</div>
          <p className={cx("company-info__desc")}>
            {editable ? (
              <input
                type="text"
                name="company.description"
                value={formData.company.description}
                onChange={handleChange}
                className={cx("editable-input")}
              />
            ) : (
              formData.company.description
            )}
          </p>
          <div className={cx("company-details")}>
            {[
              ["Founded in:", "founded"],
              ["Organization type:", "organization"],
              ["Company size:", "size"],
              ["Phone:", "phone"],
              ["Email:", "email"],
              ["Website:", "website"],
            ].map(([label, key]) => (
              <p key={key}>
                <b>{label}</b>{" "}
                {editable ? (
                  <input
                    type="text"
                    name={`company.${key}`}
                    value={formData.company[key]}
                    onChange={handleChange}
                    className={cx("editable-input")}
                  />
                ) : (
                  formData.company[key]
                )}
              </p>
            ))}
          </div>

          <div className={cx("social-icons")}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={cx("social-icon")}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className={cx("social-icon")}
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={cx("social-icon")}
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className={cx("social-icon")}
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {editable && (
          <div style={{ marginTop: 20 }}>
            <button onClick={handleSave} className={cx("save-btn")}>
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className={cx("cancel-btn")}
              style={{ marginLeft: 10 }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;

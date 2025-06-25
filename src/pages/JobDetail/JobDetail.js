import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./JobDetail.module.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import SimpleRichTextEditor from "src/components/RichTextEditor/RichTextEditor.js";

const cx = classNames.bind(styles);

const noop = () => undefined;

const JobDetail = ({ job = null, editable = false, onSave = noop, onCancel = noop }) => {
  const defaultJob = {
    jobTitle: "Senior UX Designer",
    tags: "UX, Design, Senior",
    jobRole: "Senior",
    badges: { featured: true, fulltime: "Full Time" },
    minSalary: "50000",
    maxSalary: "80000",
    salaryType: "monthly",
    education: "Bachelor",
    experience: "10-15 Years",
    jobType: "Full Time",
    vacancies: "2-5",
    expirationDate: "2025-07-31",
    jobLevel: "Senior",
    contactUrl: "https://instagram.com",
    phone: "(555) 123-4567",
    email: "career@instagram.com",
    jobDescription: `
      <p><strong>Job Description:</strong> We are seeking a highly skilled Senior UX Designer to join our team at Instagram. In this role, you will be responsible for creating user-centered designs by understanding business requirements, user needs, and technical constraints. You will collaborate with product managers, engineers, and other designers to deliver intuitive and engaging user experiences across our mobile and web platforms.</p>
      <p>Key tasks include conducting user research, designing wireframes, prototypes, and high-fidelity mockups, as well as iterating on designs based on feedback. The ideal candidate will have a strong portfolio showcasing expertise in UX design, with a focus on usability and visual aesthetics.</p>
    `,
    responsibilities: `
      <ul>
        <li>Lead the design process from concept to final deliverable, ensuring alignment with business goals.</li>
        <li>Conduct user research and usability testing to gather insights and validate design decisions.</li>
        <li>Design wireframes, prototypes, and high-fidelity mockups using tools like Figma or Sketch.</li>
        <li>Collaborate with product managers and developers to implement designs effectively.</li>
        <li>Present design concepts and iterate based on stakeholder feedback.</li>
        <li>Maintain and evolve the design system to ensure consistency across products.</li>
      </ul>
    `,
    overview: {
      posted: "24 June, 2025",
      expire: "24 July, 2025",
      education: "Bachelor",
      salary: "$50k-$80k/month",
      location: "New York, USA",
      jobType: "Full Time",
      experience: "10-15 Years",
      vacancies: "2-5",
      jobLevel: "Senior",
    },
    company: {
      name: "Instagram",
      description: "Social networking service",
      founded: "March 21, 2006",
      organization: "Private Company",
      size: "120-300 Employers",
      phone: "(555) 123-4567",
      email: "career@instagram.com",
      website: "https://instagram.com",
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
  }, [job]);

  const handleChange = (e, section = null) => {
    const name = e.target?.name;
    const value = e.target?.value;

    if (section === "jobDescription" || section === "responsibilities") {
      setFormData((prev) => ({ ...prev, [section]: value }));
      return;
    }

    if (name?.startsWith("overview.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        overview: { ...prev.overview, [key]: value },
      }));
      return;
    }

    if (name?.startsWith("company.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
      return;
    }

    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
                  <span className={cx("job-info__badge", "job-info__badge--fulltime")}>
                    {formData.badges.fulltime}
                  </span>
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
            {editable ? (
              <>
                <div className={cx("inputGroup")}>
                  <label>Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Job keyword, tags etc..."
                  />
                </div>
                <div className={cx("inputGroup")}>
                  <label>Job Role</label>
                  <select name="jobRole" value={formData.jobRole} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="Designer">Designer</option>
                    <option value="Developer">Developer</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </>
            ) : (
              <div className={cx("additional-info")}>
                <p><strong>Tags:</strong> {formData.tags}</p>
                <p><strong>Job Role:</strong> {formData.jobRole}</p>
              </div>
            )}
          </div>
        </div>

        <div className={cx("job-description")}>
          <div className={cx("job-description__title")}>Job Description</div>
          {editable ? (
            <SimpleRichTextEditor
              placeholder="Add your job description..."
              onChange={(value) => handleChange({ target: { value } }, "jobDescription")}
              content={formData.jobDescription}
            />
          ) : (
            <div
              className={cx("job-description__content")}
              dangerouslySetInnerHTML={{ __html: formData.jobDescription }}
            />
          )}
        </div>

        <div className={cx("responsibilities")}>
          <div className={cx("responsibilities__title")}>Responsibilities</div>
          {editable ? (
            <SimpleRichTextEditor
              placeholder="Add your job responsibilities..."
              onChange={(value) => handleChange({ target: { value } }, "responsibilities")}
              content={formData.responsibilities}
            />
          ) : (
            <div
              className={cx("responsibilities__content")}
              dangerouslySetInnerHTML={{ __html: formData.responsibilities }}
            />
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
          {[
            { key: "posted", label: "Posted", icon: "📅" },
            { key: "expire", label: "Expire", icon: "⏰" },
            { key: "education", label: "Education", icon: "🎓" },
            { key: "salary", label: "Salary", icon: "💰" },
            { key: "location", label: "Location", icon: "📍" },
            { key: "jobType", label: "Job Type", icon: "💼" },
            { key: "experience", label: "Experience", icon: "🕒" },
            { key: "vacancies", label: "Vacancies", icon: "👥" },
            { key: "jobLevel", label: "Job Level", icon: "📊" },
          ].map(({ key, label, icon }) => (
            <div key={key} className={cx("overview-item")}>
              <span className={cx("overview-item__icon")}>{icon}</span>
              <div>
                <p className={cx("overview-item__label")}>{label}:</p>
                {key === "posted" ? (
                  <strong className={cx("overview-item__value")}>
                    {formData.overview[key]}
                  </strong>
                ) : editable ? (
                  key === "education" ? (
                    <select
                      name={`overview.${key}`}
                      value={formData.overview[key]}
                      onChange={handleChange}
                      className={cx("editable-input", "overview-item__value")}
                    >
                      <option value="">Select...</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Master">Master</option>
                    </select>
                  ) : key === "jobType" ? (
                    <select
                      name={`overview.${key}`}
                      value={formData.overview[key]}
                      onChange={handleChange}
                      className={cx("editable-input", "overview-item__value")}
                    >
                      <option value="">Select...</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  ) : key === "experience" ? (
                    <select
                      name={`overview.${key}`}
                      value={formData.overview[key]}
                      onChange={handleChange}
                      className={cx("editable-input", "overview-item__value")}
                    >
                      <option value="">Select...</option>
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3+ years">3+ years</option>
                    </select>
                  ) : key === "vacancies" ? (
                    <select
                      name={`overview.${key}`}
                      value={formData.overview[key]}
                      onChange={handleChange}
                      className={cx("editable-input", "overview-item__value")}
                    >
                      <option value="">Select...</option>
                      <option value="1">1</option>
                      <option value="2-5">2-5</option>
                      <option value="5+">5+</option>
                    </select>
                  ) : key === "jobLevel" ? (
                    <select
                      name={`overview.${key}`}
                      value={formData.overview[key]}
                      onChange={handleChange}
                      className={cx("editable-input", "overview-item__value")}
                    >
                      <option value="">Select...</option>
                      <option value="Junior">Junior</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior">Senior</option>
                    </select>
                  ) : key === "expire" ? (
                    <input
                      type="date"
                      name={`overview.${key}`}
                      value={formData.overview[key]}
                      onChange={handleChange}
                      className={cx("editable-input", "overview-item__value")}
                    />
                  ) : (
                    <input
                      type="text"
                      name={`overview.${key}`}
                      value={formData.overview[key]}
                      onChange={handleChange}
                      className={cx("editable-input", "overview-item__value")}
                    />
                  )
                ) : (
                  <strong className={cx("overview-item__value")}>
                    {formData.overview[key]}
                  </strong>
                )}
              </div>
            </div>
          ))}
          <div className={cx("overview-item")}>
            <span className={cx("overview-item__icon")}>💵</span>
            <div>
              <p className={cx("overview-item__label")}>Salary Details:</p>
              {editable ? (
                <div className={cx("salary-details")}>
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="Min Salary"
                    className={cx("editable-input")}
                  />
                  <input
                    type="number"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="Max Salary"
                    className={cx("editable-input")}
                  />
                  <select
                    name="salaryType"
                    value={formData.salaryType}
                    onChange={handleChange}
                    className={cx("editable-input")}
                  >
                    <option value="">Select...</option>
                    <option value="monthly">Monthly</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>
              ) : (
                <strong className={cx("overview-item__value")}>
                  {formData.minSalary} - {formData.maxSalary} USD/{formData.salaryType}
                </strong>
              )}
            </div>
          </div>
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
              { label: "Founded in:", key: "founded" },
              { label: "Organization type:", key: "organization" },
              { label: "Company size:", key: "size" },
              { label: "Phone:", key: "phone" },
              { label: "Email:", key: "email" },
              { label: "Website:", key: "website" },
            ].map(({ label, key }) => (
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
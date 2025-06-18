import React from "react";
import classNames from "classnames/bind";
import styles from "./JobDetail.module.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const cx = classNames.bind(styles);

const JobDetail = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <div className={cx("header")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png"
            alt="Instagram"
            className={cx("logo")}
          />
          <div className={cx("job-info")}>
            <h2 className={cx("job-title")}>
              Senior UX Designer{" "}
              <span className={cx("badge", "featured")}>Featured</span>
              <span className={cx("badge", "fulltime")}>Full Time</span>
            </h2>
            <div className={cx("contact")}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={cx("link")}>
                https://instagram.com
              </a>
              <span>📞 (406) 555-0120</span>
              <span>✉️ career@instagram.com</span>
            </div>
          </div>
          
          {/* Nút Apply Now đã bị loại bỏ */}
          
        </div>

        <div className={cx("job-description")}>
          <h3>Job Description</h3>
          <p>
            Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante at, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.
          </p>
          <p>
            Nam dapibus consectetur erat in euismod. Cras urna augue, mollis venenatis augue sed, porttitor aliquet nibh. Sed tristique dictum elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in neque sit amet orci interdum tincidunt.
          </p>
        </div>

        <div className={cx("responsibilities")}>
          <h3>Responsibilities</h3>
          <ul>
            <li>Quisque semper gravida est et consectetur.</li>
            <li>Curabitur blandit lorem velit, vitae pretium leo placerat eget.</li>
            <li>Morbi mattis in ipsum ac tempus.</li>
            <li>Curabitur eu vehicula libero. Vestibulum sed purus ullamcorper, lobortis lectus nec.</li>
            <li>Vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.</li>
            <li>Lobortis vel lectus. Nulla at risus ut diam.</li>
            <li>Commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.</li>
            <li>Odio metus posuere lorem, id condimentum erat velit nec neque.</li>
            <li>Dui sodales ut. Curabitur tempus augue.</li>
          </ul>
        </div>

        <div className={cx("share")}>
          <span>Share this job:</span>
          <div className={cx("share-buttons")}>
            <button className={cx("facebook")}>Facebook</button>
            <button className={cx("twitter")}>Twitter</button>
            <button className={cx("pinterest")}>Pinterest</button>
          </div>
        </div>
      </div>

      <div className={cx("right")}>
        <div className={cx("job-overview")}>
          <h3>Job Overview</h3>
          <div className={cx("overview-item")}>
            <span className={cx("icon")}>📅</span>
            <div>
              <p>Job Posted:</p>
              <strong>14 June, 2021</strong>
            </div>
          </div>
          <div className={cx("overview-item")}>
            <span className={cx("icon")}>⏰</span>
            <div>
              <p>Job Expire In:</p>
              <strong>14 July, 2021</strong>
            </div>
          </div>
          <div className={cx("overview-item")}>
            <span className={cx("icon")}>🎓</span>
            <div>
              <p>Education:</p>
              <strong>Graduation</strong>
            </div>
          </div>
          <div className={cx("overview-item")}>
            <span className={cx("icon")}>💰</span>
            <div>
              <p>Salary:</p>
              <strong>$50k-$80k/month</strong>
            </div>
          </div>
          <div className={cx("overview-item")}>
            <span className={cx("icon")}>📍</span>
            <div>
              <p>Location:</p>
              <strong>New York, USA</strong>
            </div>
          </div>
          <div className={cx("overview-item")}>
            <span className={cx("icon")}>💼</span>
            <div>
              <p>Job Type:</p>
              <strong>Full Time</strong>
            </div>
          </div>
          <div className={cx("overview-item")}>
            <span className={cx("icon")}>🕒</span>
            <div>
              <p>Experience:</p>
              <strong>10-15 Years</strong>
            </div>
          </div>
        </div>

        <div className={cx("company-info")}>
          <h3>Instagram</h3>
          <p className={cx("social-desc")}>Social networking service</p>
          <div className={cx("company-details")}>
            <p><b>Founded in:</b> March 21, 2006</p>
            <p><b>Organization type:</b> Private Company</p>
            <p><b>Company size:</b> 120-300 Employers</p>
            <p><b>Phone:</b> (406) 555-0120</p>
            <p><b>Email:</b> twitter@gmail.com</p>
            <p><b>Website:</b> https://twitter.com</p>
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
      </div>
    </div>
  );
};

export default JobDetail;

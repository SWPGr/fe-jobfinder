import React from "react";
import styles from "./Home.module.scss";

import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

import TextInputCustom from '../../components/TextInputCustom';

const Home = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClick = (e) => e.preventDefault();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        {/* Top info bar */}
        <div className={styles.topBar}>
          <nav className={styles.topNav}>
            <button className={styles.topNavItem} onClick={handleClick}>Home</button>
            <button className={styles.topNavItem} onClick={handleClick}>Find Job</button>
            <button className={styles.topNavItem} onClick={handleClick}>Employers</button>
            <button className={styles.topNavItem} onClick={handleClick}>Candidates</button>
            <button className={styles.topNavItem} onClick={handleClick}>Pricing Plans</button>
            <button className={styles.topNavItem} onClick={handleClick}>Customer Supports</button>
          </nav>

          <div className={styles.contactLang}>
            <div className={styles.phone}>
              <span>📞</span> +1-202-555-0178
            </div>
            <div className={styles.languageSelector}>
              <img src="https://flagcdn.com/us.svg" alt="English" className={styles.flagIcon} />
              English ▼
            </div>
          </div>
        </div>

        {/* Main header content */}
        <div className={styles.mainHeader}>
          <div className={styles.logoSection}>
            <button className={styles.logoButton} onClick={handleClick}>
              <span className={styles.logoIcon}>📁</span> MyJob
            </button>

            <select className={styles.countrySelect} defaultValue="India">
              <option value="India">🇮🇳 India</option>
              <option value="USA">🇺🇸 USA</option>
              <option value="UK">🇬🇧 UK</option>
            </select>
          </div>

          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder="Job tittle, keyword, company"
              className={styles.searchInput}
            />
          </div>

          <div className={styles.authButtons}>
            <button className={styles.signIn} onClick={open}>Sign In</button>
            <button className={styles.postJob}>Post A Jobs</button>
          </div>
        </div>
      </header>

      {/* Modal */}
      <Modal opened={opened} onClose={close} title="Sign In">
        <TextInputCustom
          icon={<IconAt />}
          placeholder="Your email"
          label="Email"
          required
        />
        <Button fullWidth mt="md" onClick={close}>
          Submit
        </Button>
      </Modal>

      {/* Phần nội dung bên dưới giữ nguyên, ví dụ: search section, vacancies, etc. */}

      {/* Main search section */}
      <section className={styles.heroSection}>
  <div className={styles.heroLeft}>
    <h1>Find a job that suits <br /> your interest & skills.</h1>
    <p>Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.</p>

    <form className={styles.searchFormHero}>
      <input
        type="text"
        placeholder="Job tittle, Keyword..."
        className={styles.searchInputHero}
      />
      <input
        type="text"
        placeholder="Your Location"
        className={styles.searchInputHero}
      />
      <button type="submit" className={styles.findJobBtn}>Find Job</button>
    </form>

    <p className={styles.suggestion}>
      Suggestion: Designer, Programing, <span>Digital Marketing</span>, Video, Animation.
    </p>

    <div className={styles.statsHero}>
      <div className={styles.statItemHero}>
        <div className={styles.statIcon}><img src="/icons/briefcase.svg" alt="Live Job" /></div>
        <div>
          <strong>1,75,324</strong>
          <span>Live Job</span>
        </div>
      </div>
      <div className={styles.statItemHero}>
        <div className={styles.statIconActive}><img src="/icons/building.svg" alt="Companies" /></div>
        <div>
          <strong>97,354</strong>
          <span>Companies</span>
        </div>
      </div>
      <div className={styles.statItemHero}>
        <div className={styles.statIcon}><img src="/icons/group.svg" alt="Candidates" /></div>
        <div>
          <strong>38,47,154</strong>
          <span>Candidates</span>
        </div>
      </div>
      <div className={styles.statItemHero}>
        <div className={styles.statIcon}><img src="/icons/briefcase.svg" alt="New Jobs" /></div>
        <div>
          <strong>7,532</strong>
          <span>New Jobs</span>
        </div>
      </div>
    </div>
  </div>

  
</section>

      {/* Most popular vacancies */}
      <section className={styles.popularVacanciesSection}>
  <h2>Most Popular Vacancies</h2>
  <div className={styles.vacanciesGrid}>
    <div className={styles.vacancyColumn}>
      <div><strong>Anesthesiologists</strong></div>
      <div className={styles.openPositions}>45,904 Open Positions</div>
      <div><strong>Maxillofacial Surgeons</strong></div>
      <div className={styles.openPositions}>74,875 Open Positions</div>
      <div><strong>Financial Manager</strong></div>
      <div className={styles.openPositions}>61,391 Open Positions</div>
    </div>
    <div className={styles.vacancyColumn}>
      <div><strong>Surgeons</strong></div>
      <div className={styles.openPositions}>50,364 Open Positions</div>
      <div><strong>Software Developer</strong></div>
      <div className={styles.openPositions}>43,359 Open Positions</div>
      <div><strong>Management Analysis</strong></div>
      <div className={styles.openPositions}>93,046 Open Positions</div>
    </div>
    <div className={styles.vacancyColumn}>
      <div><strong>Obstetricians-Gynecologists</strong></div>
      <div className={styles.openPositions}>4,339 Open Positions</div>
      <div><strong>Psychiatrists</strong></div>
      <div className={styles.openPositions}>18,599 Open Positions</div>
      <div><strong>IT Manager</strong></div>
      <div className={styles.openPositions}>50,963 Open Positions</div>
    </div>
    <div className={styles.vacancyColumn}>
      <div><strong>Orthodontists</strong></div>
      <div className={styles.openPositions}>20,079 Open Positions</div>
      <div><strong> <a href="#" className={styles.vacancyLink}>Data Scientist</a> </strong></div>
      <div className={styles.openPositions}>28,200 Open Positions</div>
      <div><strong>Operations Research Analysis</strong></div>
      <div className={styles.openPositions}>16,627 Open Positions</div>
    </div>
  </div>
</section>


      {/* How it works */}
      <section className={styles.howItWorksSection}>
  <h2>How jobpilot work</h2>
  <div className={styles.steps}>
    <div className={styles.step}>
      <div className={styles.iconCircle}>
        <svg width="24" height="24" fill="none" stroke="#1a58fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.stepIcon}>
          <circle cx="12" cy="12" r="10" />
          <path d="M16 12a4 4 0 1 0-8 0" />
          <line x1="12" y1="16" x2="12" y2="12" />
        </svg>
      </div>
      <h3>Create account</h3>
      <p>Aliquam facilisis egestas sapien, nec tempor leo tristique at.</p>
    </div>

    <div className={`${styles.step} ${styles.activeStep}`}>
      <div className={`${styles.iconCircle} ${styles.activeIcon}`}>
        <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.stepIcon}>
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          <polyline points="8 12 12 16 16 12" />
          <line x1="12" y1="16" x2="12" y2="8" />
        </svg>
      </div>
      <h3>Upload CV/Resume</h3>
      <p>Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales.</p>
    </div>

    <div className={styles.step}>
      <div className={styles.iconCircle}>
        <svg width="24" height="24" fill="none" stroke="#1a58fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.stepIcon}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h3>Find suitable job</h3>
      <p>Phasellus quis eleifend ex. Morbi nec fringilla nibh.</p>
    </div>

    <div className={styles.step}>
      <div className={styles.iconCircle}>
        <svg width="24" height="24" fill="none" stroke="#1a58fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.stepIcon}>
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6" />
          <path d="M16 5a2 2 0 0 1 2 2v1" />
        </svg>
      </div>
      <h3>Apply job</h3>
      <p>Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus.</p>
    </div>
  </div>
</section>
<section className={styles.popularCategorySection}>
  <div className={styles.categoryHeader}>
    <h2>Popular category</h2>
    <button className={styles.viewAllBtn}>
      View All <span>→</span>
    </button>
  </div>

  <div className={styles.categoryList}>
    {[
      { icon: "🖌️", name: "Graphics & Design", count: 357 },
      { icon: "</>", name: "Code & Programing", count: 312 },
      { icon: "📢", name: "Digital Marketing", count: 297 },
      { icon: "🎬", name: "Video & Animation", count: 247 },
      { icon: "🎵", name: "Music & Audio", count: 204 },
      { icon: "📊", name: "Account & Finance", count: 167 },
      { icon: "💉", name: "Health & Care", count: 125 },
      { icon: "🧪", name: "Data & Science", count: 57, active: true },
    ].map(({ icon, name, count, active }, idx) => (
      <button
        key={idx}
        className={`${styles.categoryItem} ${active ? styles.activeCategory : ''}`}
      >
        <div className={styles.categoryIcon}>{icon}</div>
        <div className={styles.categoryText}>
          <strong>{name}</strong>
          <span>{count} Open position</span>
        </div>
      </button>
    ))}
  </div>
</section>
<section className={styles.testimonialSection}>
  <h2>Clients Testimonial</h2>
  <div className={styles.testimonialList}>
    {[
      {
        text: "“Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.”",
        name: "Robert Fox",
        role: "UI/UX Designer",
        avatar: "/avatars/robert-fox.jpg",
      },
      {
        text: "“Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante”",
        name: "Bessie Cooper",
        role: "Creative Director",
        avatar: "/avatars/bessie-cooper.jpg",
      },
      {
        text: "“Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci. Duis vestibulum bibendum dapibus.”",
        name: "Jane Cooper",
        role: "Photographer",
        avatar: "/avatars/jane-cooper.jpg",
      },
    ].map((item, idx) => (
      <div key={idx} className={styles.testimonialItem}>
        <div className={styles.stars}>
          {"⭐".repeat(5)}
        </div>
        <p>{item.text}</p>
        <div className={styles.testimonialFooter}>
          <img src={item.avatar} alt={item.name} className={styles.avatar} />
          <div>
            <div className={styles.clientName}>{item.name}</div>
            <div className={styles.clientRole}>{item.role}</div>
          </div>
          <div className={styles.quoteIcon}>"</div>
        </div>
      </div>
    ))}
  </div>
  <div className={styles.testimonialNav}>
    <button className={styles.navArrow} aria-label="Previous testimonial">←</button>
    <div className={styles.navDots}>
      <span className={`${styles.dot} ${styles.activeDot}`}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
    <button className={styles.navArrow} aria-label="Next testimonial">→</button>
  </div>
</section>
<section className={styles.becomeSection}>
  <div className={styles.becomeCandidate}>
    <h3>Become a Candidate</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.</p>
    <button className={styles.registerBtn}>Register Now <span>→</span></button>
  </div>

  <div className={styles.becomeEmployer}>
    <h3>Become a Employers</h3>
    <p>Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliqu.</p>
    <button className={styles.registerBtnWhite}>Register Now <span>→</span></button>
  </div>
</section>
<footer className={styles.footer}>
  <div className={styles.footerTop}>
    <div className={styles.footerBrand}>
      <div className={styles.footerLogo}>📁 MyJob</div>
      <p>
        Call now: <span className={styles.phone}> (319) 555-0115</span><br />
        6391 Elgin St. Celina, Delaware 10299, New York, United States of America
      </p>
    </div>

    <div className={styles.footerLinks}>
      <div className={styles.footerColumn}>
        <h4>Quick Link</h4>
        <ul>
          <li>About</li>
          <li><strong>Contact</strong></li>
          <li>Pricing</li>
          <li>Blog</li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h4>Candidate</h4>
        <ul>
          <li>Browse Jobs</li>
          <li>Browse Employers</li>
          <li>Candidate Dashboard</li>
          <li>Saved Jobs</li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h4>Employers</h4>
        <ul>
          <li>Post a Job</li>
          <li>Browse Candidates</li>
          <li>Employers Dashboard</li>
          <li>Applications</li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h4>Support</h4>
        <ul>
          <li>Faqs</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </div>
  </div>

  <div className={styles.footerBottom}>
    <p>@ 2024 MyJob - Job Portal. All rights Reserved</p>
    <div className={styles.socialIcons}>
      <span className={styles.socialIcon}>f</span>
      <span className={styles.socialIcon}>▶</span>
      <span className={styles.socialIcon}>📸</span>
      <span className={styles.socialIcon}>🐦</span>
    </div>
  </div>
</footer>





      {/* Các phần mở rộng khác bạn đã yêu cầu có thể thêm vào dưới đây */}

      {/* Popular category */}
      {/* ... Phần này bạn có thể thêm như trước */}
      
      {/* ... và các phần khác tương tự như đã cung cấp ở các bước trước */}
    </div>
  );
};

export default Home;
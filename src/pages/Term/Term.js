import React from 'react';
import classNames from 'classnames/bind';
import styles from './Term.module.scss';
import img152 from '~/assets/Images/152.jpg';
import { IconArrowDownDashed } from '@tabler/icons-react';
import img124 from '~/assets/Images/124.jpg';

// Ảnh đại diện thành viên (đã import sẵn)
import timCook from '~/assets/Images/111.png';
import katherineAdams from '~/assets/Images/111.png';
import eddyCue from '~/assets/Images/111.png';
import craigFed from '~/assets/Images/111.png';
import member5 from '~/assets/Images/111.png';

const cx = classNames.bind(styles);


const ImageComponent = () => {
  return (
    <div>
      {/* Phần ảnh nền và overlay */}
      <div className={cx('image-container')}>
        <img src={img152} alt="Background 152" className={cx('background')} />

        <div className={cx('overlay-text')}>
          <div>
            Chào mừng bạn đến <br /> JOBFINDER<br />
            Nền tảng tìm việc lớn nhất Việt Nam
          </div>
          <div className={cx('arrow-icon')}>
            <IconArrowDownDashed size={80} />
          </div>
        </div>

        <div className={cx('img124-container')}>
          <img src={img124} alt="About Us Background" className={cx('img124-background')} />

          <div className={cx('img124-overlay-text')}>
            <h3>Về chúng tôi</h3>
            <p>
              Từ khởi nguyên thay đổi mọi chiếc CV đến nền tảng công nghệ tuyển dụng hàng đầu Việt Nam, sau 10 năm nghiên cứu, hình thành và phát triển, với hướng đi rõ ràng, giải đúng bài toán tuyển dụng đang “nhức nhối” của hầu hết doanh nghiệp Việt Nam trên hành trình chuyển đổi số, TopCV Việt Nam nhanh chóng vươn mình trở thành công ty hàng đầu trong lĩnh vực HR Tech với mức tăng trưởng 300% mỗi năm.
            </p>
          </div>
        </div>
      </div>

      {/* Phần hồ sơ Ban Điều Hành cứng */}
      <div className={cx('member-section')}>
        <h2>Hồ Sơ Ban Điều Hành</h2>

        <div className={cx('member-grid')}>
          {/* Hàng trên 2 ô cứng */}
          <div className={cx('member-row')}>
            <div className={cx('member-card')}>
              <img src={timCook} alt="Tim Cook"  className={cx('img-timcook')}/>
              <div className={cx('member-name')}>Tim Cook</div>
              <div className={cx('member-title')}>CEO</div>
            </div>
            <div className={cx('member-card')}>
              <img src={katherineAdams} alt="Katherine Adams" />
              <div className={cx('member-name')}>Katherine Adams</div>
              <div className={cx('member-title')}>Senior Vice President and General Counsel</div>
            </div>
          </div>

          {/* Hàng dưới 3 ô cứng */}
          <div className={cx('member-row')}>
            <div className={cx('member-card')}>
              <img src={eddyCue} alt="Eddy Cue" />
              <div className={cx('member-name')}>Eddy Cue</div>
              <div className={cx('member-title')}>Senior Vice President Services</div>
            </div>
            <div className={cx('member-card')}>
              <img src={craigFed} alt="Craig Federighi" />
              <div className={cx('member-name')}>Craig Federighi</div>
              <div className={cx('member-title')}>Senior Vice President Software Engineering</div>
            </div>
            <div className={cx('member-card')}>
              <img src={member5} alt="Fifth Member" />
              <div className={cx('member-name')}>Fifth Member</div>
              <div className={cx('member-title')}>Title of Fifth Member</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;

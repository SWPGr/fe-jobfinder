import React from 'react';
import classNames from 'classnames/bind';
import styles from './Term.module.scss';
import timCook from '~/assets/Images/128.jpg';
import katherineAdams from '~/assets/Images/result_result_254.jpg';
import eddyCue from '~/assets/Images/785.png';
import craigFed from '~/assets/Images/111.png';
import member5 from '~/assets/Images/111.png';
import logo from '~/assets/Images/152.jpg'
import hinh from '~/assets/Images/145.png'


const cx = classNames.bind(styles);

const ImageComponent = () => {
  return (
    <div>

      {/* Phần hồ sơ Ban Điều Hành cứng */}
      <div className={cx('member-section')}>
        <h2>Ban Điều Hành Phần Mềm</h2>

        <div className={cx('member-grid')}>
          {/* 1 hàng duy nhất, 5 ô thành viên */}
          <div className={cx('member-row')}>
            <div className={cx('member-card')}>
              <img src={timCook} alt="Tim Cook" className={cx('img-timcook')} />
              <div className={cx('member-name')}>Nguyễn Hồ Hồng Nam</div>
              <div className={cx('member-title')}>Member</div>
            </div>
            <div className={cx('member-card')}>
              <img src={katherineAdams} alt="Katherine Adams" />
              <div className={cx('member-name')}>Lê Trí Trung</div>
              <div className={cx('member-title')}>
                Member
              </div>
            </div>
            <div className={cx('member-card')}>
              <img src={eddyCue} alt="Eddy Cue" />
              <div className={cx('member-name')}>Nguyễn Phi Hùng </div>
              <div className={cx('member-title')}>Leader</div>
            </div>
            <div className={cx('member-card')}>
              <img src={craigFed} alt="Craig Federighi" />
              <div className={cx('member-name')}>Nguyễn Tiến Anh</div>
              <div className={cx('member-title')}>
                Member
              </div>
            </div>
            <div className={cx('member-card')}>
              <img src={member5} alt="Fifth Member" />
              <div className={cx('member-name')}>Mai Nguyễn Tiến Đạt</div>
              <div className={cx('member-title')}>Member</div>
            </div>
          </div>
        </div>
        <div className={cx('content')}>
          JobFinder được thành lập từ năm 2025, là đơn vị tiên phong phát triển phần mềm cùng nền tảng kết nối thông minh giữa người tìm việc và doanh nghiệp. Với JobFinder, doanh nghiệp dễ dàng tiếp cận nguồn nhân lực chất lượng, còn người lao động nhanh chóng tìm được công việc phù hợp, hỗ trợ phát triển sự nghiệp bền vững. JobFinder cam kết mang đến các giải pháp công nghệ hiện đại, an toàn và đa dạng, đáp ứng nhu cầu ngày càng cao của thị trường trong nước và quốc tế.</div>
        <div className={cx('logo')}>
          <img src={logo} alt="Logo Toàn Cầu Xanh" />
        </div>
        <div className={cx('overlay')}>
          Hoạt động theo phương châm
        </div>
        <div className={cx('phuongcham')}>
          Act Local, Think Global
        </div>
        <div className={cx('overlay-text')}>
          JobFinder đã nhanh chóng nắm bắt cơ hội trên cả thị trường trong nước và quốc tế, trở thành đối tác tin cậy trong nhiều dự án quy mô lớn. Với đội ngũ kỹ sư giàu kinh nghiệm và tâm huyết, chúng tôi không ngừng đổi mới, mang đến những giải pháp công nghệ sáng tạo và hiệu quả cho khách hàng. JobFinder cam kết liên tục học hỏi, hoàn thiện và tận dụng mọi cơ hội để phát triển các giải pháp CNTT đột phá, nhằm trở thành người bạn đồng hành đáng tin cậy nhất của quý doanh nghiệp và người tìm việc.

          <img src={hinh} alt="Bang gia tri cot loi" />
        </div>
        <div className={cx('overlay-text-title')}>
          Quý khách vui lòng liên hệ với chúng tôi qua các thông tin dưới đây:

        </div>
        <div className={cx('contact-info')}>
          <p>
            Điện thoại: 028 3813 0501
          </p>
          <p>
            Email: contact@careerlink.vn
          </p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.287379542852!2d105.79056711488507!3d21.02851129330874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9e61a1c1a1%3A0x89b2c6b6a1b2a7f1!2zSOG7jWMgQ-G7lSBUaeG7h3QsIEjhu41jIEjGsMahbmc!5e0!3m2!1svi!2s!4v1680241987194!5m2!1svi!2s"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
        <div className={cx('overlay-text')}>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;

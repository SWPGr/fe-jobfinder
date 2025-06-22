import React from 'react';
import classNames from 'classnames/bind';
import styles from './Term.module.scss';

const cx = classNames.bind(styles);

const Term = () => {
  return (
    <div className={cx('termsContainer')}>
      <div className={cx('content')}>
        <div className={cx('pageTitle')}>01. Terms & Condition</div>
        <p>
          Praesent placerat dictum eleifend. Nam pulvinar urna vel tellus maximus, eget faucibus
          turpis hendrerit. Sed lacinia molestie arcu, et accumsan nisi. Quisque molestie velit vitae
          ligula luctus bibendum. Duis ut lorem ornare, viverra ipsum sed, convallis sapien. Donec
          justo erat, pulvinar vitae dui ut, finibus euismod enim. Donec velit
          tortor, mollis at tortor aliquam, gravida facilisis arcu.
        </p>
        <ul>
          <li>In ac turpis. Donec quis semper neque. Nulla cursus gravida interdum.</li>
          <li>
            Curabitur luctus sapien sed mattis faucibus nisi vehicula nec. Mauris et scelerisque lorem.
            Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.
          </li>
          <li>
            Aenean vel metus leo. Vivamus nec neque a libero sodales aliquet a et dolor.
            Vestibulum rhoncus sagittis dolor vel finibus.
          </li>
          <li>Integer feugiat lacinia ut efficitur mattis. Sed quis molestie velit.</li>
        </ul>

        <div className={cx('pageTitle')}>02. Limitations</div>
        <p>
          In pretium est sit amet diam feugiat eleifend. Curabitur consectetur fringilla metus. Morbi
          hendrerit facilisis odio, Sed condimentum lacinia arcu. Ut ut lacinia metus. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Fusce vel erat elit. In vitae turpis tempor,
          accumsan sapien vitae, rutrum eros. Integer pulvinar mattis libero at Nam bibendum lacinia
          tristique eu. Donec nec eros commodo, malesuada leo at mollis libero. Ut scelerisque lacinia
          interdum consectetur sodales.
        </p>
        <ul>
          <li>In ac turpis. Donec quis semper neque. Nulla cursus gravida interdum.</li>
          <li>Curabitur luctus sapien sed mattis.</li>
          <li>
            Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et. Aenean vel metus leo.
          </li>
          <li>Vivamus nec neque a libero sodales aliquet a et dolor.</li>
        </ul>

        <div className={cx('pageTitle')}>03. Security</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu
          blandit in, pharetra ac elit. Phasellus id pellentesque nulla. Cras erat nisi, mattis
          facilisis ut, lacinia a lacinia. Fusce gravida augue ut leo facilisis.
        </p>

        <div className={cx('pageTitle')}>04. Privacy Policy</div>
        <p>
          Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam. Aliquam metus mauris, sem
          eu eros vitae, blandit tristique metus. Vestibulum maximus nec justo sed maximus. Vivamus
          sit amet turpis ut, integer vitae tortor ac scelerisque facilisis ac vitae urna. In hac
          habitasse platea dictumst. Maecenas imperdiet tortor arcu, nec iaculis
          molestie vulputat.
        </p>
        <ul>
          <li>
            Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate
            et.
          </li>
          <li>
            Aenean vel metus leo.
            Vestibulum rhoncus sagittis dolor vel finibus.
          </li>
          <li>Integer feugiat lacinia ut efficitur mattis. Sed quis molestie velit.</li>
        </ul>
      </div>
      <div className={cx('tableOfContents')}>
        <div className={cx('sectionTitle')}>TABLE OF CONTENTS</div>
        <ul>
          <li>01. Terms & Condition</li>
          <li>02. Limitations</li>
          <li>03. Security</li>
          <li>04. Privacy Policy</li>
        </ul>
      </div>
    </div>
  );
};

export default Term;

import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { ChatbotButton } from '~/components';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const { user } = useAuth();
    const role = user?.role;

    return (
        <div className={cx('wrapper')}>
            <NavBar />
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer dark />
            {role && <ChatbotButton />}
        </div>
    );
}
HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderOnly;

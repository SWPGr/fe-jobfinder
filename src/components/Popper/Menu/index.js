import Tippy from '@tippyjs/react/headless'; // different import path!
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './Menu.module.scss';
import { PopperWrapper } from '~/components';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
    children,
    items = [],
    visible = false,
    // hideOnClick = false,
    onChange = defaultFn,
    onClickOutside = defaultFn,
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            delay={[0, 700]}
            visible={visible}
            interactive
            offset={[16, 8]}
            // hideOnClick={hideOnClick}
            onClickOutside={onClickOutside}
            placement="bottom-end"
            render={(attrs) => {
                return (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('menu-popper')}>
                            {history.length > 1 && (
                                <Header
                                    title={current.title}
                                    onBack={() => {
                                        setHistory((prev) => prev.slice(0, history.length - 1));
                                    }}
                                />
                            )}

                            <div className={cx('menu-body')}>{renderItem()}</div>
                        </PopperWrapper>
                    </div>
                );
            }}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;

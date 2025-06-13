import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

//a - Link - button

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    leftIcon,
    rightIcon,
    type = 'button',

    // Button types
    primary = true,
    blue_lighter = false,
    blue_white = false,
    black = false,
    black_lighter = false,
    black_white = false,
    green = false,
    green_lighter = false,
    green_white = false,
    red = false,
    red_lighter = false,
    red_white = false,
    yellow = false,
    yellow_lighter = false,
    yellow_white = false,

    rounded = false,
    text,

    // Button sizes
    medium = true,
    large = false,

    disabled = false,

    children,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = { onClick, ...passProps };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            console.log(key, ' : ', typeof props[key]);
            if (key.startsWith('on') || typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        blue_lighter,
        blue_white,
        black,
        black_lighter,
        black_white,
        green,
        green_lighter,
        green_white,
        red,
        red_lighter,
        red_white,
        yellow,
        yellow_lighter,
        yellow_white,

        rounded,
        text,
        medium,
        large,
        disabled,

        [className]: className,
    });

    return (
        <Comp className={classes} {...props} type={type}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,

    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;

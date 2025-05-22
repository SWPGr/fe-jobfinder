import React from 'react';
import { TextInput } from '@mantine/core';
import classNamesStyle from 'classnames'; // thư viện nối class string
import classNamesBind from 'classnames/bind'; // thư viện bind CSS module
import styles from './TextInputCustom.module.scss'; // import CSS module

const cx = classNamesBind.bind(styles);

function TextInputCustom({
    // Các prop cơ bản để điều khiển input
    label = 'Enter your label', // Nhãn cho input
    placeholder = 'Enter your placeholder', // Văn bản hiển thị khi input rỗng
    value = '', // Giá trị hiện tại của input
    onChange = () => {}, // Hàm gọi khi người dùng thay đổi giá trị
    leftSectionPointerEvents = 'none', // CSS pointer-events cho phần leftSection (icon bên trái)
    leftSection = null, // React node hiển thị bên trái input (thường là icon)
    rightSectionPointerEvents = 'none', // CSS pointer-events cho phần rightSection (icon bên phải)
    rightSection = null, // React node hiển thị bên phải input
    error, // Chuỗi lỗi để hiển thị thông báo lỗi, nếu có
    disabled = false, // Vô hiệu hóa input khi true
    required = false, // Đánh dấu input bắt buộc khi true
    classNames = {}, // Object truyền class tùy chỉnh cho các phần con
    ...props
}) {
    // Lấy các class tùy chỉnh hoặc undefined nếu không truyền
    const { wrapper, input, section, root, labelInput, errorInput } = classNames;

    return (
        <TextInput
            label={label} // Hiển thị nhãn bên trên input
            placeholder={placeholder} // Văn bản placeholder trong input
            value={value} // Giá trị input
            onChange={onChange} // Hàm xử lý khi thay đổi giá trị
            leftSectionPointerEvents={leftSectionPointerEvents} // Điều khiển sự kiện chuột phần leftSection
            leftSection={leftSection} // Nội dung phần leftSection (icon, text...)
            rightSectionPointerEvents={rightSectionPointerEvents} // Tương tự cho rightSection
            rightSection={rightSection}
            error={error || null} // Hiển thị lỗi nếu có, ngược lại null
            disabled={disabled} // Vô hiệu hóa input nếu true
            required={required} // Đánh dấu bắt buộc nếu true
            // Áp dụng các class CSS kết hợp giữa mặc định (cx('...')) và class tùy chỉnh truyền vào props
            classNames={{
                input: classNamesStyle(cx('input'), input, error && cx('inputError')), // Class cho phần input chính
                label: classNamesStyle(cx('label'), labelInput), // Class cho phần nhãn
                section: classNamesStyle(cx('section'), section, error && cx('iconError')), // Class cho phần bao quanh left/right section
                wrapper: classNamesStyle(cx('wrapper'), wrapper), // Class cho wrapper (bao ngoài input)
                root: classNamesStyle(cx('root'), root), // Class root bao quanh toàn bộ component
                error: classNamesStyle(cx('error'), errorInput), // Class cho thông báo lỗi
            }}
            {...props}
        />
    );
}

// **** LƯU Ý ****
// - khi muốn ghi đè CSS cho các phần tử con của TextInput, cần truyền tên class cha bao bọc tên class của phần tử con
//  Ví dụ khi muốn ghi đè CSS cho phần input mà phần từ cha của input là .form
//thì truyền như sau :
/*
.form {
    & .input {
        padding: 1.2rem;
    }
}
*/
// - Để có thể ghi đè hiệu quả

export default TextInputCustom;

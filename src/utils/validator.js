function validateEmail(email) {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
    return null;
}

function validatePasswordStrong(password) {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter';
    if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must include at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must include at least one special character';
    return null;
}
function validateLoginPassword(password) {
    if (!password) return 'Password is required';
    return null;
}

function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) return 'Confirm password is required';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
}
function validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) return 'Phone number is required';
    if (!/^\d{10}$/.test(phoneNumber)) return 'Invalid phone number format';
    return null;
}
function validateUsername(username) {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    return null;
}

function validationTextArea(nameField, text) {
    console.log(text);

    if (!text) return `${nameField} is required`;
    if (text.length < 100) return `${nameField} must be at least 100 characters`;
    return null;
}
function validationText(nameField, text) {
    if (!text) return `${nameField} is required`;
    return null;
}
function validateFutureDate(dateString) {
    if (!dateString) return 'Date is required';

    const inputDate = new Date(dateString);
    const today = new Date();

    // Đặt thời gian về 00:00:00 để so sánh chính xác ngày
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
        return 'Date must be today or in the future';
    }

    return ''; // hợp lệ
}

const validator = {
    validateEmail,
    validatePasswordStrong,
    validateLoginPassword,
    validateConfirmPassword,
    validatePhoneNumber,
    validateUsername,
    validationTextArea, validationText, validateFutureDate
};

export default validator;

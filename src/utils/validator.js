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

function validationTextArea(text) {
    if (!text) return 'Text is required';
    if (text.length < 100) return 'Text must be at least 100 characters';
    return null;
}

const validator = {
    validateEmail,
    validatePasswordStrong,
    validateLoginPassword,
    validateConfirmPassword,
    validatePhoneNumber,
    validateUsername,
    validationTextArea,
};

export default validator;

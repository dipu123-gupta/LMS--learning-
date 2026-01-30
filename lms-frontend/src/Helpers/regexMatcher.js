export function isEmail(String) {
    return String.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

export function isPassword(String) {
    return String.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
}
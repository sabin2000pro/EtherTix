export const validateRegisterData = (username: string, email: string, password: string, passwordConfirm: string) => {
    if (!username) {
        throw new Error('Username is required');
    }

    if (!email) {
        throw new Error('Email is required');
    }

    if (!password) {
        throw new Error('Password is required');
    }

    if (password !== passwordConfirm) {
        throw new Error('Password and confirm password do not match');
    }

    if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error('Invalid email format');
    }

    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }

}
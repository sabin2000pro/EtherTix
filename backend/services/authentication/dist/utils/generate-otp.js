"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTPVerificationToken = void 0;
const generateOTPVerificationToken = (otp_length = 6) => {
    let OTP = '';
    let RANDOM_LENGTH = 9;
    for (let i = 1; i <= otp_length; i++) {
        const randomOTP = Math.round(Math.random() * RANDOM_LENGTH);
        OTP += randomOTP;
    }
    return OTP;
};
exports.generateOTPVerificationToken = generateOTPVerificationToken;
//# sourceMappingURL=generate-otp.js.map
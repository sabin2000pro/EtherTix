"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTPVerificationToken = void 0;
var generateOTPVerificationToken = function (otp_length) {
    if (otp_length === void 0) { otp_length = 6; }
    var OTP = '';
    var RANDOM_LENGTH = 9;
    for (var i = 1; i <= otp_length; i++) {
        var randomOTP = Math.round(Math.random() * RANDOM_LENGTH);
        OTP += randomOTP;
    }
    return OTP;
};
exports.generateOTPVerificationToken = generateOTPVerificationToken;

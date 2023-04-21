
export const generateOTPVerificationToken = (otp_length = 6): String => {

    let OTP = ''
    let RANDOM_LENGTH = 9;

    for(let i = 1; i <= otp_length; i++) {
       const randomOTP = Math.round(Math.random() * RANDOM_LENGTH)
       OTP += randomOTP;
    }

    return OTP;

}
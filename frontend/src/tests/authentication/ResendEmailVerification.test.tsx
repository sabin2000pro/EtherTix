require('react')
const resendEmailVerification = require('../../api/auth/auth-api')

describe("Email re-verification test suite", () => {
    it("Returns success confirmation", async () => {
        const var1 = await resendEmailVerification({userID: "63f89e9c635c9c67d481f756", otp: "123456"});

        expect(var1.message).toBe("E-mail Verification Re-sent");
    })
    it("Returns error when wrong Id", async () => {
        const var1 = await resendEmailVerification({userID: "63f89e9c635c9c67d481f75", otp: "123456"});

        expect(var1.message).toBe("Owner ID invalid. Check again");
    })
    it("Returns error when no otp", async () => {
        const var1 = await resendEmailVerification({userID: "63f89e9c635c9c67d481f756", otp: ""});

        expect(var1.message).toBe("OTP Not found. Please check again");
    })
}

)
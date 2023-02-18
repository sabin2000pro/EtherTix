import { resendEmailVerification } from '../../api/auth/auth-api'

describe("Email re-verification test suite", () => {
    it("Returns success confirmation", async () => {
        const var1 = await resendEmailVerification({userID: "hello@mail.com", otp: "123456"});

        expect(var1.data.message).toBe("E-mail Verification Re-sent");
    })
    it("Returns error when wrong Id", async () => {
        const var1 = await resendEmailVerification({userID: "hell@mail.com", otp: "123456"});

        expect(var1.data.message).toBe("Owner ID invalid. Check again");
    })
    it("Returns error when no otp", async () => {
        const var1 = await resendEmailVerification({userID: "hello@mail.com", otp: ""});

        expect(var1.data.message).toBe("OTP Not found. Please check again");
    })
}

)
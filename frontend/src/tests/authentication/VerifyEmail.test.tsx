import { verifyEmailAddress } from '../../api/auth/auth-api'

describe("Email verification test suite", () => {
    it("Returns success confirmation", async () => {
        const var1 = await verifyEmailAddress({userID: "hello@mail.com", otp: "123456"});

        expect(var1.data.message).toBe("E-mail Address verified");
    })
    it("Returns error when wrong Id", async () => {
        const var1 = await verifyEmailAddress({userID: "hell@mail.com", otp: "123456"});

        expect(var1.data.message).toBe("User ID not found. Please check your entry again.");
    })
    it("Returns error when no otp", async () => {
        const var1 = await verifyEmailAddress({userID: "hello@mail.com", otp: ""});

        expect(var1.data.message).toBe("OTP Entered not found. Please check your entry");
    })
}

)
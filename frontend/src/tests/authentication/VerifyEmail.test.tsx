require('react')
const verifyEmailAddress = require(`../../api/auth/auth-api`)

describe("Email verification test suite", () => {
    it("Returns success confirmation", async () => {
        const var1 = await verifyEmailAddress({userID: "63f89e9c635c9c67d481f756", otp: "123456"});

        expect(var1.message).toBe("E-mail Address verified");
    })
    it("Returns error when wrong Id", async () => {
        const var1 = await verifyEmailAddress({userID: "63f89e9c635c9c67d481f75", otp: "123456"});

        expect(var1.message).toBe("User ID not found. Please check your entry again.");
    })
    it("Returns error when no otp", async () => {
        const var1 = await verifyEmailAddress({userID: "63f89e9c635c9c67d481f756", otp: ""});

        expect(var1.message).toBe("OTP Entered not found. Please check your entry");
    })
}

)
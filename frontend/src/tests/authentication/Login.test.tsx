require('react')
const login = require('../../api/auth/auth-api')

describe("Logging in test suite", () => {
    it("Returns success confirmation", async () => {
        const var1 = await login({email: "mail@email.com", password: "Hello123"});

        expect(var1.success).toBe(true);
    })
    it("Returns error when wrong email", async () => {
        const var1 = await login({email: "mai@email.com", password: "Hello123"});

        expect(var1.message).toBe("Email not found. Please check your entry again.");
    })
    it("Returns error when no password", async () => {
        const var1 = await login({email: "mail@email.com", password: ""});

        expect(var1.message).toBe("Password entered not found. Please check your entry");
    })
}

)
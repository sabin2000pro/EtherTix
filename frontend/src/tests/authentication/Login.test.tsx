import React from 'react';
import { login } from '../../api/auth/auth-api'

describe("Logging in test suite", () => {
    it("Returns success confirmation", async () => {
        const var1 = await login({email: "hello@mail.com", password: "123456"});

        expect(var1.data.success).toBe(true);
    })
    it("Returns error when wrong email", async () => {
        const var1 = await login({email: "hell@mail.com", password: "123456"});

        expect(var1.data.message).toBe("Email not found. Please check your entry again.");
    })
    it("Returns error when no password", async () => {
        const var1 = await login({email: "hello@mail.com", password: ""});

        expect(var1.data.message).toBe("Password entered not found. Please check your entry");
    })
}

)
import Joi from "joi";

export const registerAccountSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().required()
});

// @description: Login Validation
export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().required()

})

export const verifyEmailAddressSchema = Joi.object({

})

export const loginMfaSchema = Joi.object({

})

export const resetPasswordSchema = Joi.object({

})

export const updateUserPasswordSchema = Joi.object({

})

export const updateUserProfileSchema = Joi.object({

})
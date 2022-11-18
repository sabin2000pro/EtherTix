import Joi from "joi";

export const registerUserValidationAgent = Joi.object({
    username: Joi.string().required(),
    forename: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().required()
});

// @description: Login Validation
export const loginValidationAgent = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export const forgotPasswordValidationAgent = Joi.object({
    email: Joi.string().required()
})

export const emailValidationAgent = Joi.object({
    email: Joi.string().required()
})

export const resetPasswordValidationAgent = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})

export const updateUserPasswordValidationAgent = Joi.object({
    
})

export const updateUserProfileValidationAgent = Joi.object({

})
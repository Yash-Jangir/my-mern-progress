import Joi from "joi";

const login = Joi.object({
    username: Joi.string().trim().required().messages({
        "string.base": "Username must be a type of 'text'",
        "string.empty": "Username is required field",
        "any.required": "Username is a required field"
    }),
    password: Joi.string().min(8).max(32).required().messages({
        "string.base": "Password must be a type of 'text'",
        "string.empty": "Password is a required field",
        "any.required": "Password is a required field",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password can't be more than 32 characters"
    })
}).options({ allowUnknown: true, abortEarly: false })

const register = Joi.object({
    fullName: Joi.string().trim().required().messages({
        "string.base": "Full Name must be a type of 'text'",
        "string.empty": "Full Name must not be empty",
        "any.required": "Full Name is a required field"
    }),
    email: Joi.string().trim().email().required().messages({
        "string.base": "Email must be a type of 'text'",
        "string.empty": "Email must not be empty",
        "any.required": "Email is a required field",
        "string.email": "Please provide a valid email address"
    }),
    password: Joi.string().min(8).max(32).required().messages({
        "string.base": "Password must be a type of 'text'",
        "string.empty": "Password must not be empty",
        "any.required": "Password is a required field",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password can't be more than 32 characters"
    })
}).options({ allowUnknown: true, abortEarly: false })

const update = Joi.object({
    value: Joi.string().trim().required().messages({
        "string.base": "Value must be a type of 'text'",
        "string.empty": "Value is a required field",
        "any.required": "Value is a required field"
    })
}).options({ allowUnknown: true, abortEarly: false })

const changePassword = Joi.object({
    oldPassword: Joi.string().min(8).max(32).required().messages({
        "string.base": "Old Password must be a type of 'text'",
        "string.empty": "Old Password is a required field",
        "any.required": "Old Password is a required field",
        "string.min": "Old Password must be at least 8 characters",
        "string.max": "Old Password can't be more than 32 characters",
    }),
    newPassword: Joi.string().min(8).max(32).required().messages({
        "string.base": "New Password must be a type of 'text'",
        "string.empty": "New Password is a required field",
        "any.required": "New Password is a required field",
        "string.min": "New Password must be at least 8 characters",
        "string.max": "New Password can't be more than 32 characters",
    })
}).options({ allowUnknown: true, abortEarly: false })


export default {
    login,
    register,
    update,
    changePassword
}


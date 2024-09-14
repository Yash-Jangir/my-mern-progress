import Joi from "joi"

const mailValidation = Joi.object({
    sender: Joi.string().trim().required().messages({
        "string.base": "Sender must be a type of 'text'",
        "string.empty": "Sender is a required field",
        "any.required": "Sender is a required field",
    }),
    email: Joi.string().trim().email().required().messages({
        "string.base": "Email must be a type of 'text'",
        "string.empty": "Email is a required field",
        "any.required": "Email is a required field",
        "string.email": "Please provide a valid email address"
    }),
    subject: Joi.string().trim().required().messages({
        "string.base": "Subject must be a type of 'text'",
        "string.empty": "Subject is a required field",
        "any.required": "Subject is a required field"
    }),
    message: Joi.string().trim().required().messages({
        "string.base": "Message must be a type of 'text'",
        "string.empty": "Message is a required field",
        "any.required": "Message is a required field"
    })
}).options({ abortEarly: false })

export default mailValidation

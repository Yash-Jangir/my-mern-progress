import Joi from "joi"

export default Joi.object({
    title: Joi.string().trim().required().messages({
        "string.base": "Title must be a type of 'text'",
        "string.empty": "Title is a required field",
        "any.required": "Title is a required field"
    }),
    color: Joi.string().trim().required().messages({
        "string.base": "Color must be a type of 'text'",
        "string.empty": "Color is a required field",
        "any.required": "Color is a required field"
    })
}).options({ allowUnknown: true, abortEarly: false })

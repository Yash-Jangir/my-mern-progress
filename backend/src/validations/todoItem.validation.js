import Joi from "joi"

export default Joi.object({
    todo: Joi.string().trim().required().messages({
        "string.base": "Todo must be a type of 'text'",
        "string.empty": "Todo is a required field",
        "any.required": "Todo is a required field"
    }),
    collectionId: Joi.string().trim().length(24).required().messages({
        "string.base": "Collection Id must be a type of 'text'",
        "string.empty": "Collection Id is a required",
        "any.required": "Collection Id is a required",
        "string.length": "Collection Id must be 16 characters"
    }),
    status: Joi.boolean().messages({
        "boolean.base": "Status must be a type of 'boolean'",
    })
}).options({ allowUnknown: true, abortEarly: false })

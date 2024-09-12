
const formatValidationError = function (errors) {
    return errors.reduce((acc, { message, path }) => {
        acc[path[0]] = message
        return acc
    }, {})
}

const validator = function (rules, options = {}) {
    return async function (req, res, next) {
        try {
            const data = req.body
            const result = rules.validate(data)

            if (result?.error) {
                const errors = formatValidationError(result.error?.details || [])
                next({ status: 400, message: "Validation error", errors })
            }

            next()
        } catch (err) {
            next(err)
        }
    }
}

export default validator

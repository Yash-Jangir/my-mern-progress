

const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    const errors = err.errors

    return res.status(status).json({
        status: false,
        statusCode: status,
        message,
        errors
    })
}

export default errorMiddleware


const {
    JWT_SECRET,
    JWT_EXPIRY
} = process.env

const timeFormatter = (str) => {
    const placeholders = {
        d: 1000 * 60 * 60 * 24,
        h: 1000 * 60 * 60,
        m: 1000 * 60,
        s: 1000,
    }
    const nums = str.split(/[^\d]/g)
    const tokens = str.split(/[\d]/g)
    let result = 0
    for (let i = 0; i < tokens.length; i += 2) {
        result += nums[i] * (placeholders[tokens[i + 1]] || 1)
    }
    return result
}

export default {
    secret: JWT_SECRET,
    expires: JWT_EXPIRY,
    expiresInMs: timeFormatter(JWT_EXPIRY)
}

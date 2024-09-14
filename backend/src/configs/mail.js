
const {
    MAIL_HOST,
    MAIL_PORT,
    MAIL_SECURE,
    MAIL_USER,
    MAIL_PASSWORD,
    MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME,
} = process.env

export default {
    host:           MAIL_HOST,
    port:           Number(MAIL_PORT) || 587,
    secure:         !(MAIL_SECURE === 'false' || MAIL_SECURE === ''),
    user:           MAIL_USER,
    pass:           MAIL_PASSWORD,
    from_address:   MAIL_FROM_ADDRESS,
    from_name:      MAIL_FROM_NAME,
}


import nodemailer from "nodemailer"
import mailConfig from "../../configs/mail.js";

export default class Mail {
    constructor() {
        const { host, port, secure, user, pass, from_address, from_name } = mailConfig

        this._transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } })
        this._from = `"${from_name}" <${from_address || user}>`
    }

    subject(subject) {
        this._subject = subject
        return this
    }

    from(name, email) {
        this._from = `"${name || mailConfig.from_name}" <${email || mailConfig.from_address}>`
        return this
    }

    to(email) {
        this._to = email
        return this
    }

    text(text) {
        this._text = text
        return this
    }

    html(html) {
        this._html = html
        return this
    }

    sendMail() {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: this._from,
                to: this._to,
                subject: this._subject,
                text: this._text,
                html: this._html
            }
            this._transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(info)
                }
            })
        })
    }
}

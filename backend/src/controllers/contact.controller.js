import asyncExceptionWrapper from "../utils/asyncExceptionWrapper.js"
import Mail from "../services/mail/index.js"
import mailConfig from "../configs/mail.js"

const mail = asyncExceptionWrapper(
    async (req, res) => {
        const { sender, email, subject, message } = req.body
        const mail = new Mail()

        const content = `
            Sender: ${sender},
            Email: ${email},
            ---------------------------------------
            Message:
            ${message}
        `
        mail.from(sender)
            .to(mailConfig.user)
            .subject(subject)
            .text(content)

        await mail.sendMail()

        // A positive response to user
        new Mail().to(email)
            .subject("Thank you for contacting Me 🫂")
            .text("Thank you for contacting Me. I will get back to you shortly. 🦸")
            .sendMail()

        return res.status(200).json({
            status: true,
            message: "Mail sent successfully"
        })
    }
)


export default {
    mail
}

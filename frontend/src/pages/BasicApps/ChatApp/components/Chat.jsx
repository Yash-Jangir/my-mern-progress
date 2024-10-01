

export default function Chat({ chat, isSent = false }) {
    return (
        <div className={`chat ${isSent ? "sent" : ""}`}>
            <div className="message">{chat.text}</div>
            <div className="date-time">{new Date(chat.createdAt).toLocaleString("en-IN")}</div>
        </div>
    )
}
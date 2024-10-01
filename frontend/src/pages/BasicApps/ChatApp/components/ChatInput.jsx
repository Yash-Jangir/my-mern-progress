import { useState } from "react"

export default function ChatInput({ sendMsg }) {
    const [msg, setMsg] = useState("")

    const changeHandler = e => {
        setMsg(e.target.value)
    }

    const _sendMsg = (e) => {
        e.preventDefault()
        sendMsg(msg)
        setMsg("")
    }

    return (
        <div className="input-area">
            <form onSubmit={_sendMsg}>
                <input
                    type="text"
                    placeholder="Message..."
                    value={msg}
                    onChange={changeHandler}
                />
                <button><i className="fa-solid fa-paper-plane"></i></button>
            </form>
        </div>
    )
}
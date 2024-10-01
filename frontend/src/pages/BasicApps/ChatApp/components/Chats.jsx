import { useSelector } from "react-redux";
import Chat from "./Chat";
import { useAuth } from "../../../../contexts/Auth/Context";
import { useEffect, useRef } from "react";

export default function Chats() {
    const Auth = useAuth()
    const chats = useSelector(state => state.chatApp.chats ?? [])
    const chatBoxRef = useRef(null)

    useEffect(() => {
        if (chatBoxRef.current)
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }, [chats])

    return (
        <div className="chat-box" ref={chatBoxRef}>
            {
                chats.map(chat => <Chat
                    key={chat.id}
                    chat={chat}
                    isSent={chat.userId === Auth.user.id}
                />)
            }
        </div>
    )
}

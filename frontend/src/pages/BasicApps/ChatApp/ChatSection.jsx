import { useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import Chats from "./components/Chats";
import { useWS } from "../../../contexts/WebSocket/Provider";
import { useDispatch, useSelector } from "react-redux";
import { newMessage, setActiveRoom, setChats, unfriend } from "../../../store/reducers/chatApp";

export default function ChatSection() {
    const WS = useWS()
    const dispatch = useDispatch()
    const room = useSelector(state => state.chatApp.activeRoom)

    const sendMsg = (msg) => {
        if (msg.trim()) {
            WS.emit("request:send-message", { roomId: room?.id, message: msg.trim() })
        }
    }

    useEffect(() => {
        WS.on("response:unfriended", (resp) => {
            if (resp.status) {
                dispatch(setActiveRoom(null))
                dispatch(unfriend(resp.data.roomId))
            }
        })
        WS.on("response:messages", (resp) => {
            if (resp.status) {
                dispatch(setChats({ messages: resp.data }))
            }
        })
        WS.on("response:message", (message) => {
            dispatch(newMessage(message))
        })

        return () => {
            WS.off("response:unfriended")
            WS.off("response:messages")
            WS.off("response:message")
        }
    }, [])

    return (
        <div className="chat-section">
            <ChatHeader />
            <div className="chats">
                <Chats />

                <ChatInput sendMsg={sendMsg} />
            </div>
        </div>
    )
}
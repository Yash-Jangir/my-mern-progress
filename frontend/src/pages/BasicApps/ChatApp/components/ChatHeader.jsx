import { useSelector } from "react-redux"
import { useWS } from "../../../../contexts/WebSocket/Provider"

export default function ChatHeader() {
    const WS = useWS()
    const room = useSelector(state => state.chatApp.activeRoom)

    const _unfriend = () => {
        WS.emit("request:unfriend", { roomId: room?.id })
    }

    return (
        <div className="heading">
            {
                !room
                    ? <i className="fa-solid fa-comments" />
                    : <div className="thumbnail">
                        {
                            room?.users[0]?.avatar &&
                            <img src={room?.users[0]?.avatar} alt="" />
                        }
                    </div>
            }
            <h3>{room?.users[0]?.fullName ?? "Chat App"}</h3>
            <div className="close">
                {
                    room &&
                    <button
                        className="cancel"
                        onClick={_unfriend}
                    >Unfriend</button>
                }
            </div>
        </div>
    )
}
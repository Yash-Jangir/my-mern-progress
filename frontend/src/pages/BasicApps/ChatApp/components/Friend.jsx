import { useWS } from "../../../../contexts/WebSocket/Provider"
import { useDispatch, useSelector } from "react-redux"
import { setActiveRoom } from "../../../../store/reducers/chatApp"

export default function Friend({ user, room, isSearchResult = false, messageCount = 0 }) {
    const WS = useWS()
    const dispatch = useDispatch()
    const activeRoom = useSelector(state => state.chatApp.activeRoom)

    const _startChat = () => {
        if (room) {
            dispatch(setActiveRoom(room))
            WS.emit("request:getMessages", { roomId: room?.id })
        }
    }

    const _addFriend = () => {
        WS.emit("request:add-friend", { friendId: user.id })
    }


    return (
        <div className={`friend ${room && 'clickable'} ${room && room?.id === activeRoom?.id && 'active'}`} onClick={_startChat}>
            <div className="thumbnail">
                {
                    user?.avatar && <img src={user.avatar} alt="" />
                }
            </div>
            <div className="name">
                <div className="fullname">{user?.fullName}</div>
                <div className="username">{user?.username}</div>
            </div>
            <div className="options">
                {
                    isSearchResult
                        ? <button className="primary" onClick={_addFriend}>
                            <i className="fa-solid fa-plus" />
                        </button>
                        : (
                            messageCount > 0 &&
                            <button className="badge primary">{messageCount}</button>
                        )
                }
            </div>
        </div>
    )
}
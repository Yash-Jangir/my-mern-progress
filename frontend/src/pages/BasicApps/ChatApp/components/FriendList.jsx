import { useDispatch, useSelector } from "react-redux";
import Friend from "./Friend";
import NoFriends from "./NoFriends";
import Loader from "../../../../components/Loader";
import { useEffect } from "react";
import { useWS } from "../../../../contexts/WebSocket/Provider";
import { addFriend, setFriendList } from "../../../../store/reducers/chatApp";
import toast from "react-hot-toast";

export default function FriendList() {
    const WS = useWS()
    const dispatch = useDispatch()
    const {
        searchResult,
        friendList,
        isSearching,
        searchQuery
    } = useSelector(state => state.chatApp)


    useEffect(() => {
        if (!searchQuery)
            WS.emit("request:friend-list")
    }, [searchQuery])

    useEffect(() => {
        WS.on("response:add-friend", (resp) => {
            if (resp.status) {
                dispatch(addFriend(resp.data.id))
                toast.success(`Now you are friend with ${resp.data.fullName}`)
            }
        })
        WS.on("response:friend-list", (resp) => {
            dispatch(setFriendList(resp))
        })

        return () => {
            WS.off("response:add-friend")
            WS.off("response:friend-list")
        }
    }, [])

    return (
        <div className="friend-list">
            {
                isSearching && <Loader style={{ position: "absolute" }} />
            }

            {
                searchQuery && (
                    searchResult.length
                        ? searchResult.map(
                            user => <Friend
                                key={user.id}
                                user={user}
                                isSearchResult
                            />
                        )
                        : <NoFriends text="Search result not found" />
                )
            }
            {
                !searchQuery && (
                    friendList.length
                        ? friendList.map(
                            room => <Friend
                                key={room.id}
                                room={room}
                                user={room.users[0]}
                                messageCount={room.messageCount}
                            />
                        )
                        : <NoFriends />
                )
            }
        </div>
    )
}
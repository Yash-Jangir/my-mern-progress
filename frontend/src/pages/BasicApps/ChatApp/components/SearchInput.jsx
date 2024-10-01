import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsSearching, setSearchQuery, setSearchResult } from "../../../../store/reducers/chatApp"
import { useWS } from "../../../../contexts/WebSocket/Provider"

let timer = null
export default function SearchInput() {
    const searchQuery = useSelector(state => state.chatApp.searchQuery || "")
    const dispatch = useDispatch()
    const WS = useWS()

    const changeHandler = e => {
        dispatch(setSearchQuery(e.target.value))
        dispatch(setIsSearching(Boolean(e.target.value)))

        if (timer)
            clearTimeout(timer)

        if (e.target.value) {
            timer = setTimeout(() => {
                WS.emit("request:search:friends", { search: e.target.value.trim() })
                dispatch(setIsSearching())
            }, 800)
        }
    }

    const clearHandler = () => {
        dispatch(setSearchQuery(""))
        dispatch(setIsSearching())
        dispatch(setSearchResult([]))
    }

    useEffect(() => {
        WS.on("response:search:friends", (resp) => {
            dispatch(setSearchResult(resp.data))
        })

        return () => {
            WS.off("response:search:friends")
        }
    }, [])

    return (
        <div className="search-area">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={changeHandler}
            />
            {
                searchQuery && <button onClick={clearHandler}>
                    <i className="fa-solid fa-close"></i>
                </button>
            }
        </div>
    )
}
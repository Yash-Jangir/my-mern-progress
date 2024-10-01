import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const url = import.meta.env.VITE_API_HOST


const WSContext = createContext()
export const useWS = () => useContext(WSContext)



export default function WebSocketProvider(props) {
    const socket = io(url, {
        withCredentials: true,
    })

    const [ws, setWS] = useState({
        socket,
        emit: (evt, data) => socket?.emit(evt, data),
        on: (evt, fn) => socket?.on(evt, fn),
        off: (evt) => socket?.off(evt),
    })

    useEffect(() => {
        return () => {
            if (socket.connected)
                socket.disconnect()
        }
    }, [])


    return <WSContext.Provider
        value={ws}
        {...props}
    />
}

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: "",
    isSearching: false,
    friendList: [],
    searchResult: [],
    activeRoom: null,
    chats: [],
}

const chatAppSlice = createSlice({
    name: "chatApp",
    initialState,
    reducers: {
        setSearchQuery: (state, { payload }) => {
            state.searchQuery = payload
        },
        setIsSearching: (state, { payload }) => {
            state.isSearching = payload ?? false
        },
        setSearchResult: (state, { payload }) => {
            state.searchResult = payload
        },
        setFriendList: (state, { payload }) => {
            state.friendList = payload ?? []
        },
        addFriend: (state, { payload }) => {
            state.searchResult = state.searchResult.filter(user => user.id !== payload)
        },
        unfriend: (state, { payload }) => {
            state.friendList = state.friendList.filter(room => room.id !== payload)
            state.chats = []
        },
        setActiveRoom: (state, { payload }) => {
            state.activeRoom = payload
            if (payload) {
                state.friendList.map(room => {
                    if (room.id === payload.id) {
                        room.messageCount = 0
                    }
                    return room
                })
            }
        },
        setChats: (state, { payload }) => {
            const { messages, offset = false } = payload
            if (offset) {
                state.chats = [...messages, ...state.chats]
            } else {
                state.chats = messages
            }
        },
        newMessage: (state, { payload }) => {
            if (payload.roomId === state.activeRoom?.id) {
                state.chats = [...state.chats, payload]
            } else {
                state.friendList = state.friendList.map(room => {
                    if (room.id === payload.roomId) {
                        if (!room.messageCount) room.messageCount = 0
                        room.messageCount++
                    }
                    return room
                })
            }
        }
    }
})

export const {
    setSearchQuery,
    setIsSearching,
    setSearchResult,
    setFriendList,
    addFriend,
    setActiveRoom,
    unfriend,
    setChats,
    newMessage,
} = chatAppSlice.actions

export default chatAppSlice.reducer

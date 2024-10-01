import Message from "../models/message.modle.js"
import Room from "../models/room.model.js"
import User from "../models/user.model.js"

const getMessages = async function ({ wsServer, socket, data }) {
    const { roomId, offset = 0 } = data
    const messages = await Message.find({ roomId, deletedAt: null }).sort({ createdAt: -1 }).skip(offset).limit(20)

    socket.emit("response:messages", {
        status: true,
        data: messages.reverse()
    })
}

const getFriends = async function ({ wsServer, socket, data }) {
    const rooms = await Room.aggregate([
        {
            $match: {
                isGroup: false,
                users: {
                    $in: [socket.user._id]
                },
                deletedAt: null
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "users",
                foreignField: "_id",
                as: "users",
                pipeline: [
                    {
                        $match: {
                            _id: {
                                $ne: socket.user._id
                            },
                            deletedAt: null
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                users: {
                    $arrayElemAt: ["$users", 0]
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])

    socket.emit("response:friend-list", rooms.map(doc => {
        doc.users = User.hydrate(doc.users)
        return Room.hydrate(doc)
    }))
}

const searchFriends = async function ({ wsServer, socket, data }) {
    const search = data?.search?.trim() ?? ""
    if (!search)
        return

    const friends = await Room.aggregate([
        {
            $match: {
                isGroup: false,
                users: {
                    $in: [socket.user._id]
                },
                deletedAt: null
            }
        },
        {
            $unwind: "$users"
        },
        {
            $group: {
                _id: "$users"
            }
        },
        {
            $project: {
                _id: 1
            }
        }
    ])


    const result = await User.aggregate([
        {
            $match: {
                deletedAt: null,
                _id: {
                    $nin: [...friends.map(f => f._id), socket.user._id]
                },
                $or: [
                    { username: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { fullName: { $regex: search, $options: "i" } }
                ]
            }
        },
        {
            $project: {
                username: 1,
                email: 1,
                fullName: 1,
                avatar: 1,
            }
        }
    ])

    socket.emit("response:search:friends", {
        status: true,
        data: result.map(doc => User.hydrate(doc))
    })
}

const addFriend = async function ({ wsServer, socket, data }) {
    const { friendId } = data
    const friend = await User.findOne({ _id: friendId, deletedAt: null })

    if (!friend) {
        socket.emit("response:add-friend", {
            status: false,
            message: "Friend not found"
        })
        return
    }

    const room = await Room.findOne({ isGroup: false, deletedAt: null, users: { $all: [socket.user._id, friend._id] } })
    if (!room) {
        await Room.create({
            users: [socket.user._id, friend._id],
        })
    }
    socket.emit("response:add-friend", {
        status: true,
        data: friend
    })
}

const unfriend = async function ({ wsServer, socket, data }) {
    const { roomId } = data
    if (!roomId) {
        socket.emit("response:unfriended", {
            status: false,
            message: "Room not found"
        })
        return
    }

    const room = await Room.findOne({ _id: roomId, isGroup: false, deletedAt: null, users: { $in: [socket.user._id] } })
    if (room) {
        room.deletedAt = new Date()
        await room.save()
    }
    socket.emit("response:unfriended", {
        status: true,
        data: {
            roomId: room._id
        }
    })
}

const message = async function ({ wsServer, socket, data }) {
    const { roomId, message } = data
    if (!roomId || !message)
        return

    const room = await Room.findOne({ _id: roomId, users: { $in: [socket.user._id] }, deletedAt: null })
    if (!room)
        return

    const newMessage = await Message.create({
        text: message,
        roomId,
        userId: socket.user._id
    })

    wsServer.emit("response:message", newMessage)
}

export default {
    getMessages,
    getFriends,
    searchFriends,
    addFriend,
    unfriend,
    message,
}

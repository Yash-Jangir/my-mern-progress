import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
)

messageSchema.set("toJSON", {
    getters: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
        return ret
    }
})

const Message = model("Message", messageSchema)
export default Message

import { Schema, model } from "mongoose";

const roomSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        isGroup: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
)


roomSchema.set("toJSON", {
    versionKey: false,
    getters: true,
    transform: (doc, ret) => {
        delete ret._id

        return ret
    }
})

const Room = model("Room", roomSchema)
export default Room

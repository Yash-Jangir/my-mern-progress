import { Schema, model } from "mongoose";

const todoCollectionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        color: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
)

todoCollectionSchema.set("toJSON", {
    getters: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        return ret
    }
})

const TodoCollection = model("TodoCollection", todoCollectionSchema)

export default TodoCollection

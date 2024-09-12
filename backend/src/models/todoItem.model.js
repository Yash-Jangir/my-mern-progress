import { Schema, model } from "mongoose";

const todoItemSchema = new Schema(
    {
        todo: {
            type: String,
            required: true,
            trim: true,
        },
        collectionId: {
            type: Schema.Types.ObjectId,
            ref: "TodoCollection",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
)

todoItemSchema.set("toJSON", {
    getters: true,
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        return ret
    }
})

const TodoItem = model("TodoItem", todoItemSchema)

export default TodoItem

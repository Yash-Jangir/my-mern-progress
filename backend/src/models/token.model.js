import { Schema, model } from "mongoose";
import jwt from "../configs/jwt.js";

const tokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userAgent: {
            type: String,
        },
        expireBy: {
            type: Date,
            default: () => Date.now() + jwt.expiresInMs
        },
        status: {
            type: Boolean,
            default: true
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
)


const Token = model("Token", tokenSchema)

export default Token

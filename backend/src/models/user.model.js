import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import Token from "./token.model.js";
import jwtConfig from "../configs/jwt.js";
import { mediaPath } from "../utils/path.js";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        description: String,
        avatar: String,
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

userSchema.set("toJSON", {
    versionKey: false,
    getters: true,
    transform: (doc, ret) => {
        ret.avatar = ret.avatar && mediaPath(ret._id, ret.avatar)
        
        delete ret.password
        delete ret.status
        delete ret._id

        return ret
    }
})


userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function (ua) {
    const tokenInstance = await Token.create({ userId: this._id, userAgent: ua })
    return jwt.sign({ id: tokenInstance._id }, jwtConfig.secret, { expiresIn: jwtConfig.expires })
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10)

    next()
})

const User = model("User", userSchema)

export default User

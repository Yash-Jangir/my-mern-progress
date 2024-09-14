import fs from "node:fs"
import User from "../models/user.model.js";
import asyncExceptionWrapper from "../utils/asyncExceptionWrapper.js";
import { mediaPath, storagePath } from "../utils/path.js";

// helper functions
const generateUsername = (email) => email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "_").replace(/[_]+/g, "_") + `_${Math.random().toString(36).slice(2, 6)}`
const isValidEmail = (email) => email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)
const isValidUsername = username => username.match(/^[a-z0-9_]+$/)

// controllers
const getUser = asyncExceptionWrapper(
    async (req, res) => {
        return res.status(200).json({
            data: req.user,
            status: true,
        })
    }
)

const login = asyncExceptionWrapper(
    async (req, res) => {
        const ua = req.headers["user-agent"]
        const { username, password } = req.body

        const user = await User.findOne({ $or: [{ username }, { email: username }], status: true })
        if (!user || !(await user.isCorrectPassword(password))) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials"
            })
        }

        const _token = await user.generateToken(ua)

        return res
            .cookie("_token", _token, { secure: true, httpOnly: true })
            .json({
                status: true,
                statusCode: 200,
                message: "User loggedIn successfully",
                data: { _token }
            })
    }
)

const register = asyncExceptionWrapper(
    async (req, res) => {
        const { fullName, email, password } = req.body
        const username = generateUsername(email)

        const user = await User.create({ fullName, email, username, password })
        if (!user) {
            return res.status(500).json({
                status: false,
                message: "Failed to register user"
            })
        }

        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: "User registered successfully"
        })
    }
)

const logout = asyncExceptionWrapper(
    async (req, res) => {
        if (req.tokenInst) {
            req.tokenInst.status = false
            await req.tokenInst.save()
        }

        return res
            .clearCookie("_token", { httpOnly: true, secure: true })
            .json({
                status: true,
                statusCode: 200,
                message: "User logged out successfully"
            })
    }
)

const deleteAccount = asyncExceptionWrapper(
    async (req, res) => {
        const user = req.user
        const timestamp = Date.now()

        // soft delete user
        user.username = `${user.username}~deleted~${timestamp}`
        user.email = `${user.email}~deleted~${timestamp}`
        user.deletedAt = new Date()
        await user.save()

        // invalidate token
        req.tokenInst.status = false
        await req.tokenInst.save()

        return res
            .clearCookie("_token", { httpOnly: true, secure: true })
            .json({
                status: true,
                statusCode: 200,
                message: "User Account deleted successfully"
            })
    }
)

const update = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        let { field, value } = req.body

        // field validation
        if (!["fullName", "username", "email", "description"].includes(field)) {
            return next({
                status: 400,
                message: "Validation error",
                errors: {
                    field: "Invalid field"
                }
            })
        }

        // email validation
        if (field === "email") {
            value = value.toLowerCase().trim()
            if (!isValidEmail(value)) {
                return next({
                    status: 400,
                    message: "Validation error",
                    errors: {
                        value: "Please provide a valid email address"
                    }
                })
            }
            if (await User.findOne({ email: value, _id: { $ne: user._id } })) {
                return next({
                    status: 400,
                    message: "Validation error",
                    errors: {
                        value: "Email has already being used"
                    }
                })
            }
        }

        // username validation
        if (field === "username") {
            value = value.toLowerCase().trim()
            if (!isValidUsername(value)) {
                return next({
                    status: 400,
                    message: "Validation error",
                    errors: {
                        value: "Valid username can be formed using (a-z0-9_)"
                    }
                })
            }
            if (await User.findOne({ username: value, _id: { $ne: user._id } })) {
                return next({
                    status: 400,
                    message: "Validation error",
                    errors: {
                        value: "Username has already beening used"
                    }
                })
            }
        }

        // update user
        user[field] = value.trim()
        await user.save()

        return res
            .json({
                status: true,
                statusCode: 200,
                message: `${field[0].toUpperCase() + field.slice(1)} updated successfully`,
                data: {
                    [field]: user[field]
                }
            })
    }
)

const changePassword = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { oldPassword, newPassword } = req.body

        if (!await user.isCorrectPassword(oldPassword)) {
            return next({
                status: 400,
                message: "Password is incorrect",
                errors: {
                    oldPassword: "Old Password is incorrect"
                }
            })
        }

        if (oldPassword !== newPassword) {
            user.password = newPassword
            await user.save()
        }

        return res
            .json({
                status: true,
                statusCode: 200,
                message: "Password changed successfully",
            })
    }
)

const updateAvatar = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { filename } = req?.file || {}

        const oldFIle = storagePath(`uploads/${user._id}/${user.avatar}`)
        if (user.avatar && fs.existsSync(oldFIle)) {
            fs.unlinkSync(oldFIle)
        }

        user.avatar = filename
        await user.save()

        return res
            .json({
                status: true,
                statusCode: 200,
                message: filename
                    ? "Avatar updated successfully"
                    : "Avatar removed successfully",
                data: {
                    avatar: user.avatar ? mediaPath(user._id, user.avatar) : null
                }
            })
    }
)

export default {
    getUser,
    login,
    register,
    logout,
    deleteAccount,
    update,
    changePassword,
    updateAvatar
}

import jwt from "jsonwebtoken";
import asyncExceptionWrapper from "../utils/asyncExceptionWrapper.js";
import jwtConfig from "../configs/jwt.js";
import Token from "../models/token.model.js";

export const isAuthenticated = async (token) => {
    const result = {
        status: false,
        data: null
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret)
        const tokenInst = await Token.findOne({ _id: decoded.id, status: true }).populate("userId")
        if (!tokenInst || !tokenInst.userId || !tokenInst.userId.status || tokenInst.userId?.deletedAt) {
            result.data = { status: 401, message: "Unauthorized" }
            return result
        }

        result.status = true
        result.data = tokenInst
    } catch (error) {
        result.data = error
    }

    return result
}

const auth = asyncExceptionWrapper(
    async (req, res, next) => {
        const token = req.cookies?._token || (req.headers?.["authorization"]?.replace("Bearer ", "") || "")
        if (!token)
            next({ status: 401, message: "Unauthorized" })

        const isAuth  = await isAuthenticated(token)
        req.user      = isAuth?.data?.userId
        req.tokenInst = isAuth?.data

        next(!isAuth.status ? isAuth.data : null)
    }
)


export default auth

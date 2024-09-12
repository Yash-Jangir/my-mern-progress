import jwt from "jsonwebtoken";
import asyncExceptionWrapper from "../utils/asyncExceptionWrapper.js";
import jwtConfig from "../configs/jwt.js";
import Token from "../models/token.model.js";

const auth = asyncExceptionWrapper(
    async (req, res, next) => {
        const token = req.cookies?._token || (req.headers?.["authorization"]?.replace("Bearer ", "") || "")
        if (!token)
            next({ status: 401, message: "Unauthorized" })

        try {
            const decoded = jwt.verify(token, jwtConfig.secret)
            const tokenInst = await Token.findOne({ _id: decoded.id, status: true }).populate("userId")
            if (!tokenInst || !tokenInst.userId || !tokenInst.userId.status || tokenInst.userId?.deletedAt)
                next({ status: 401, message: "Unauthorized" })

            req.tokenInst = tokenInst
            req.user      = tokenInst.userId
            next()
        } catch (error) {
            next(error)
        }
    }
)

export default auth

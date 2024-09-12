import fs from "node:fs";
import asyncExceptionWrapper from "../utils/asyncExceptionWrapper.js";
import { storagePath } from "../utils/path.js";


const index = asyncExceptionWrapper(
    async (req, res, next) => {
        const { userId, filename } = req.params
        const path = storagePath(`${userId}/${filename}`)

        if (!fs.existsSync(path)) {
            return next({
                status: 404,
                message: "File not found"
            })
        }

        return res.sendFile(path)
    }
)

export default {
    index
}
import path from "node:path"
import app from "../configs/app.js"

const __dir__ = path.resolve()

export const storagePath = (url = "") => `${__dir__}/src/storage/${url}`
export const mediaPath = (userId, filename) => `${app.url}/media/${userId}/${filename}`

export default {
    storagePath,
    mediaPath
}

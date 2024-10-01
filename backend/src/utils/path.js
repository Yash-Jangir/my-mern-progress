import path from "node:path"
import app from "../configs/app.js"

const __dir__ = path.resolve()

export const storagePath = (url = "") => `${__dir__}/src/storage/${url}`
export const mediaPath = (id, avatar) => {
    if(!avatar) return null
    return `${app.url}/media/${id}/${avatar}`
}

export default {
    storagePath,
    mediaPath
}

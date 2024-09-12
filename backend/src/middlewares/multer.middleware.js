import multer from "multer"
import fs from "node:fs"
import { storagePath } from "../utils/path.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const user = req.user
        const path = storagePath(user._id)

        if (!fs.existsSync(path))
            fs.mkdirSync(path, { recursive: true })

        cb(null, path)
    },
    filename: function (req, file, cb) {
        const { fieldname, originalname } = file
        const ext = originalname.split(".").at(-1)
        const uniquename  = originalname.replace(/[^a-zA-Z0-9-\s]/, "-").replace(/[-]+/g, "-").split("-").slice(0, -1).join("-")
        const name = `${fieldname}-${Date.now()}-${uniquename}.${ext}`

        cb(null, name)
    }
})

const upload = multer({ storage })

export default upload

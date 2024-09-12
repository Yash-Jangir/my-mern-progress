import axios from "axios"
import { API_END_POINT } from "../api/config"

const AxiosInstance = axios.create({
    baseURL: API_END_POINT,
    withCredentials: true,
    validateStatus: () => true,
})

const HTTPRequest = async (url, method = "get", data = {}, isFile = false) => {
    if (!["post", "get", "put", "patch", "options", "delete"].includes(method))
        method = "get"

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    if (isFile)
        config.headers["Content-Type"] = "multipart/form-data"

    try {
        const resp = await AxiosInstance[method](url, data, config)
        return resp.data
    } catch (err) {
        console.log(err.message)
        return err.toJSON()
    }
}

export default HTTPRequest

import HTTPRequest from "./HTTPRequest"

const ControllerWrapper = (endPoint, placeholder = null) => {
    return async function (data, isFile = false) {
        let { url, method } = endPoint
        if (placeholder) {
            url = url.replace(placeholder, data?.[placeholder.substr(1, placeholder.length - 2)] || "")
        }
        return await HTTPRequest(url, method, data, isFile)
    }
}

export default ControllerWrapper

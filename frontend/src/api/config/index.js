const { VITE_API_HOST, VITE_API_VERSION } = import.meta.env
console.log(VITE_API_HOST, VITE_API_VERSION)

export const API_HOST = VITE_API_HOST
export const API_VERSION = VITE_API_VERSION
export const API_END_POINT = `${API_HOST}/api/${API_VERSION}/`

export default {
    API_END_POINT,
    API_VERSION,
    API_END_POINT,
}

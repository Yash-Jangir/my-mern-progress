
const {
    APP_NAME,
    APP_HOST,
    APP_PORT
} = process.env

export default {
    name: APP_NAME,
    host: APP_HOST,
    port: APP_PORT,
    url: `http://${APP_HOST}:${APP_PORT}`
}

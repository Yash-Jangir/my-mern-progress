import { Server } from "socket.io"
import corsConfig from "../../configs/cors.js"
import { isAuthenticated } from "../../middlewares/auth.middleware.js"
import eventEmitters from "./eventEmitters.js"

const WS = {
    createServer(httpServer, options = {
        cors: {
            origin: corsConfig.origin,
            credentials: true
        }
    }) {
        this.wsServer = new Server(httpServer, options)

        // auth
        this.wsServer.use(async (socket, next) => {
            const cookie = socket.handshake.headers?.cookie?.replace("_token=", "")
            if (!cookie) {
                next({ status: 401, message: "Unauthorized" })
            }

            const isAuth = await isAuthenticated(cookie)
            socket.user  = isAuth?.data?.userId

            next(!isAuth.status ? isAuth.data : null)
        })


        this.wsServer.on("connection", (socket) => {
            console.log(`Client connected: ${socket.id}`)

            this._registerEmitters(this.wsServer, socket)

            socket.on("disconnect", () => {
                console.log(`Client disconnected: ${socket.id}`)
            })
        })
    },


    _registerEmitters(wsServer, socket) {
        Object.entries(eventEmitters).forEach(emitter => {
            const [event, callback] = emitter
            socket.on(event, (data) => Promise.resolve(callback({ wsServer, socket, data })).catch(console.log))
        })
    },

    getActiveClients() {
        return this.wsServer?.engine?.clientsCount || 0
    }
}


export default WS

import "dotenv/config"
import http from "node:http"
import appConfig from "./configs/app.js"
import app from "./app.js"
import WS from "./services/websocket/index.js"


// create basic http server
const httpServer = http.createServer(app)

// web socket
WS.createServer(httpServer)

// start server
httpServer.listen(appConfig.port, () => {
    console.log(`Server running on ${appConfig.url}`)
})

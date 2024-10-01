import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// custom import
import corsConfig from "./configs/cors.js"
import routes from "./routes/index.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import { initDBConnection } from "./configs/db.js"
import mediaController from "./controllers/media.controller.js"


// database connection
await initDBConnection()


// app initialization
const app = express()


// basic app setup
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: corsConfig.origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
}));



// app router
app.get("/", (req, res) => res.send("Hello World"))
app.use("/api/v1", routes)
app.get("/media/:userId/:filename", mediaController.index)



// error middleware
app.use(errorMiddleware)


// exporting app
export default app

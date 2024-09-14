import { Router } from "express";
import authRouter from "./auth.route.js";
import todoCollectionRouter from "./todoCollection.route.js";
import todoItemRouter from "./todoItem.route.js";
import contactRouter from "./contact.route.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router()

router.use("/auth", authRouter)

router.use(auth)
router.use("/contact-me", contactRouter)
router.use("/todo-collections", todoCollectionRouter)
router.use("/todo-items", todoItemRouter)

export default router

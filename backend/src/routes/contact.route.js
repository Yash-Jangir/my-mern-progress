import { Router } from "express";
import validator from "../middlewares/validator.middleware.js";
import mailValidation from "../validations/mail.validation.js";
import contactController from "../controllers/contact.controller.js";

const router = Router()

router.post('/', validator(mailValidation), contactController.mail)

export default router

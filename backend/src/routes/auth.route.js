import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.middleware.js";
import validator from "../middlewares/validator.middleware.js";
import authValidation from "../validations/auth.validation.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router()

router.post('/login', validator(authValidation.login), authController.login)
router.post('/register', validator(authValidation.register), authController.register)

// auth protected routes
router.use(auth)
router.get('/', authController.getUser)
router.post('/logout', authController.logout)
router.post('/delete-account', authController.deleteAccount)
router.patch('/update/avatar', upload.single('avatar'), authController.updateAvatar)
router.patch('/update/:field', validator(authValidation.update), authController.update)
router.patch('/change-password', validator(authValidation.changePassword), authController.changePassword)

export default router

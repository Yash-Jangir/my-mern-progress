import { Router } from "express";
import todoItemController from "../controllers/todoItem.controller.js";
import validator from "../middlewares/validator.middleware.js";
import todoItemValidation from "../validations/todoItem.validation.js";

const router = Router()

router.post('/', validator(todoItemValidation), todoItemController.create)
router.get('/:id', todoItemController.show)
router.put('/:id', validator(todoItemValidation), todoItemController.update)
router.delete('/:id', todoItemController.remove)
router.patch('/:id/toggle-status', todoItemController.toggleStatus)


export default router

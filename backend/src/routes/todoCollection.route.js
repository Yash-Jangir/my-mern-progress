import { Router } from "express";
import todoCollectionController from "../controllers/todoCollection.controller.js";
import validator from "../middlewares/validator.middleware.js";
import todoCollectionValidation from "../validations/todoCollection.validation.js";

const router = Router()

router.get('/', todoCollectionController.index)
router.post('/', validator(todoCollectionValidation), todoCollectionController.create)
router.get('/:id', todoCollectionController.show)
router.put('/:id', validator(todoCollectionValidation), todoCollectionController.update)
router.delete('/:id', todoCollectionController.remove)


export default router

import ControllerWrapper from "../../utils/ControllerWrapper"
import TODO_ITEM_ROUTES from "../routes/todoItem.routes"


export default {
    create:         ControllerWrapper(TODO_ITEM_ROUTES.CREATE),
    show:           ControllerWrapper(TODO_ITEM_ROUTES.SHOW, "[id]"),
    update:         ControllerWrapper(TODO_ITEM_ROUTES.UPDATE, "[id]"),
    delete:         ControllerWrapper(TODO_ITEM_ROUTES.DELETE, "[id]"),
    toggleStatus:   ControllerWrapper(TODO_ITEM_ROUTES.TOGGLE_STATUS, "[id]"),
}

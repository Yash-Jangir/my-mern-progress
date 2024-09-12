import ControllerWrapper from "../../utils/ControllerWrapper"
import TODO_COLLECTION_ROUTES from "../routes/todoCollection.routes"

export default {
    index:  ControllerWrapper(TODO_COLLECTION_ROUTES.INDEX),
    create: ControllerWrapper(TODO_COLLECTION_ROUTES.CREATE),
    show:   ControllerWrapper(TODO_COLLECTION_ROUTES.SHOW, "[id]"),
    update: ControllerWrapper(TODO_COLLECTION_ROUTES.UPDATE, "[id]"),
    delete: ControllerWrapper(TODO_COLLECTION_ROUTES.DELETE, "[id]"),
}

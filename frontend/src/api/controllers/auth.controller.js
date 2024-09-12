import ControllerWrapper from "../../utils/ControllerWrapper"
import AUTH_ROUTES from "../routes/auth.routes"

export default {
    getUser:        ControllerWrapper(AUTH_ROUTES.GET_USER),
    login:          ControllerWrapper(AUTH_ROUTES.LOGIN),
    register:       ControllerWrapper(AUTH_ROUTES.REGISTER),
    logout:         ControllerWrapper(AUTH_ROUTES.LOGOUT),
    deleteAccount:  ControllerWrapper(AUTH_ROUTES.DELETE_ACCOUNT),
    changePassword: ControllerWrapper(AUTH_ROUTES.CHANGE_PASSWORD),
    updateUser:     ControllerWrapper(AUTH_ROUTES.UPDATE_USER, "[field]"),
    updateAvatar:   ControllerWrapper(AUTH_ROUTES.UPDATE_AVATAR),
}

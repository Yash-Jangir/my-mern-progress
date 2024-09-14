import ControllerWrapper from "../../utils/ControllerWrapper";
import CONTACT_ROUTES from "../routes/contact.routes";


export default {
    send:  ControllerWrapper(CONTACT_ROUTES.SEND),
}

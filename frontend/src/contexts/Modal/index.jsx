import ModalComponent from "./Components/Modal";
import ModalProvider from "./Provider";

export default function Modal(props) {
    return (
        <ModalProvider>
            <ModalComponent />
            {props.children}
        </ModalProvider>
    )
}

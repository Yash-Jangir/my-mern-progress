import { useModal } from "../Provider"

export default function ModalComponent() {
    const Modal = useModal()

    return (
        <div className="modal-wrapper" style={Modal.isOpen ? { top: 0 } : null} onClick={_ => Modal.close()}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                {Modal.component}


                {/* <p>Are you sure you want to delete your account?</p>
                <div className="button-group">
                    <button className="cancel">Cancel</button>
                    <button className="primary">Delete</button>
                </div> */}
            </div>
        </div>
    )
}

import { createContext, useContext, useState } from "react";

const ModalContext = createContext()
export const useModal = () => useContext(ModalContext)


export default function ModalProvider(props) {
    const [modal, useModal] = useState({
        isOpen: false,
        component: null,
        open: (component) => useModal(state => ({ ...state, isOpen: true, component })),
        close: () => useModal(state => ({ ...state, isOpen: false, component: null })),
    })

    return (
        <ModalContext.Provider value={modal} {...props} />
    )
}

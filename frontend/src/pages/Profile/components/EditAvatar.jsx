import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../../contexts/Auth/Context"
import toast from "react-hot-toast"
import { useModal } from "../../../contexts/Modal/Provider"

export default function EditAvatar() {
    const Modal = useModal()
    const Auth = useAuth()
    const [state, setState] = useState({
        imgUrl: Auth?.user?.avatar || "",
        avatar: "",
        err: "",
        isLoading: false,
        isChange: false,
    })
    const input = useRef(null)

    const successHandler = (resp) => {
        Modal.close()
        return resp?.message
    }
    const errorHandler = err => {
        setState(state => ({ ...state, isLoading: false }))
        setState(state => ({
            ...state,
            err: err.errors
        }))
        return err.message
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!state.isChange) return Modal.close()

        const file = input.current.files?.[0]
        const data = new FormData()
        if (file) {
            data.append("avatar", file)
        }

        setState(state => ({ ...state, isLoading: false }))
        toast.promise(
            Auth.updateUser(data, true),
            {
                loading: `Updating Avatar...`,
                success: successHandler,
                error: errorHandler,
            }
        )
    }

    const clickHandler = () => {
        if (!input.current.value)
            input.current.click()
    }

    const changeHandler = (e) => {
        const file = input.current.files?.[0];
        if (!file) return;

        const imgUrl = URL.createObjectURL(file);
        setState(state => ({
            ...state,
            imgUrl,
            avatar: e.target.value,
            err: "",
            isChange: true
        }));
    }

    const removeImg = (e) => {
        e.stopPropagation()
        setState(state => ({ ...state, imgUrl: "", avatar: "", err: "", isChange: true }))
    }


    useEffect(() => {
        return () => {
            if (state.imgUrl) {
                URL.revokeObjectURL(state.imgUrl);
            }
        };
    }, [state.imgUrl]);


    return (
        <div className="edit-form">
            <form onSubmit={submitHandler}>
                <h3>Avatar</h3>
                <div>
                    <div
                        className="thumbnail"
                        onClick={clickHandler}
                    >
                        {
                            state.imgUrl && (
                                <>
                                    <img src={state.imgUrl} alt="" />
                                    <span className="remove" onClick={removeImg}>
                                        <i className="fa-solid fa-trash-can" style={{ fontSize: "1.4rem" }}></i>
                                    </span>
                                </>
                            )
                        }
                    </div>
                    <input type="file" ref={input} name="avatar" accept="image/*" value={state.avatar} onChange={changeHandler} hidden />
                </div>
                {state.err && <p className="error">{state.err}</p>}
                <div className="button-group">
                    <button
                        type="button"
                        className="cancel"
                        onClick={Modal.close}
                        disabled={state.isLoading}
                    >Cancel</button>
                    <button
                        className="primary"
                        disabled={state.isLoading}
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

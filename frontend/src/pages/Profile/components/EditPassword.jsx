import { useState } from "react"
import { useAuth } from "../../../contexts/Auth/Context"
import toast from "react-hot-toast"
import { useModal } from "../../../contexts/Modal/Provider"

export default function EditPassword() {
    const Modal = useModal()
    const { changePassword } = useAuth()
    const [data, setData] = useState({ oldPassword: "", newPassword: "", confPassword: "" })
    const [err, setErr] = useState({ oldPassword: "", newPassword: "", confPassword: "" })
    const [isLoading, setIsLoading] = useState(false)


    const changeHandler = (e) => {
        setData(state => ({ ...state, [e.target.name]: e.target.value }))
        setErr(state => ({ ...state, [e.target.name]: "" }))
    }

    const successHandler = (resp) => {
        Modal.close()
        return resp?.message
    }
    const errorHandler = err => {
        setIsLoading(false)
        setErr(err?.errors)
        return err?.message
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (data.newPassword !== data.confPassword) {
            setErr(state => ({ ...state, confPassword: "Password does not match" }))
            return
        }

        setIsLoading(true)
        toast.promise(
            changePassword(data),
            {
                loading: `Updating Password...`,
                success: successHandler,
                error: errorHandler,
            }
        )
    }

    return (
        <div className="edit-form">
            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: "20px" }}>
                    <h3>Old Password</h3>
                    <div className="input-group">
                        <input type="password" name="oldPassword" value={data.oldPassword} onChange={changeHandler} className={err?.oldPassword && "invalid"} />
                    </div>
                    {err?.oldPassword && <p className="error">{err.oldPassword}</p>}
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <h3>New Password</h3>
                    <div className="input-group">
                        <input type="password" name="newPassword" value={data.newPassword} onChange={changeHandler} className={err?.newPassword && "invalid"} />
                    </div>
                    {err?.newPassword && <p className="error">{err.newPassword}</p>}
                </div>
                <div>
                    <h3>Re-enter Password</h3>
                    <div className="input-group">
                        <input type="password" name="confPassword" value={data.confPassword} onChange={changeHandler} className={err?.confPassword && "invalid"} />
                    </div>
                    {err?.confPassword && <p className="error">{err.confPassword}</p>}
                </div>
                <div className="button-group">
                    <button
                        type="button"
                        className="cancel"
                        onClick={Modal.close}
                        disabled={isLoading}
                    >Cancel</button>
                    <button
                        className="primary"
                        disabled={isLoading}
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

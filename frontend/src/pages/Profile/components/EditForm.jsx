import { useState } from "react"
import { useAuth } from "../../../contexts/Auth/Context"
import toast from "react-hot-toast"
import { useModal } from "../../../contexts/Modal/Provider"

export default function EditForm({ name, label, isTextarea = false }) {
    const Modal = useModal()
    const Auth = useAuth()
    const [value, setValue] = useState(Auth?.user?.[name] || "")
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const successHandler = (resp) => {
        Modal.close()
        return resp?.message
    }
    const errorHandler = err => {
        setIsLoading(false)
        setErr(err.errors?.value?.replace("Value", name[0].toUpperCase() + name.slice(1)))
        return err.message
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        toast.promise(
            Auth.updateUser({ field: name, value }),
            {
                loading: `Updating ${name}...`,
                success: successHandler,
                error: errorHandler,
            }
        )
    }

    const props = {
        name,
        value,
        onChange: (e) => {
            setValue(e.target.value);
            setErr("")
        },
        className: err && "invalid"
    }

    return (
        <div className="edit-form">
            <form onSubmit={submitHandler}>
                <h3>{label || ""}</h3>
                <div className="input-group">
                    {
                        isTextarea
                            ? <textarea {...props} ></textarea>
                            : <input {...props} />
                    }
                </div>
                {err && <p className="error">{err}</p>}
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

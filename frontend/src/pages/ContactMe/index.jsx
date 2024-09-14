import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../../contexts/Auth/Context"
import { mailSend, resetFormData, setFormData } from "../../store/reducers/contact"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"


export default function ContactMe() {
    const Auth = useAuth()
    const formData = useSelector(state => state.contact.formData)
    const errors = useSelector(state => state.contact.errors)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeHandler = e => {
        dispatch(setFormData({ key: e.target.name, value: e.target.value }))
    }

    const submitHandler = e => {
        e.preventDefault()
        const toastId = toast.loading("Sending Mail...")

        dispatch(mailSend({
            sender: Auth.user.username,
            email: Auth.user.email,
            ...formData
        })).then(({ payload }) => {
            toast.remove(toastId)
            if (!payload.status) {
                return toast.error(payload.message)
            }

            toast.success(payload.message)
            dispatch(resetFormData())
            navigate("/")
        })
    }

    return (
        <div id="mail" className="content">
            <h2>Contact Mail</h2>
            <div className="details">
                <form onSubmit={submitHandler}>
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="sender"
                            className={errors?.sender && "invalid"}
                            value={formData?.sender ?? Auth.user.fullName}
                            onChange={changeHandler}
                            placeholder="Sender name"
                        />
                    </div>
                    {errors?.sender && <p className="error">{errors?.sender}</p>}

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className={errors?.email && "invalid"}
                            value={formData?.email ?? Auth.user.email}
                            onChange={changeHandler}
                            placeholder="Email"
                        />
                    </div>
                    {errors?.email && <p className="error">{errors?.email}</p>}

                    <div className="input-group">
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            className={errors?.subject && "invalid"}
                            value={formData?.subject ?? ""}
                            onChange={changeHandler}
                            placeholder="Subject"
                        />
                    </div>
                    {errors?.subject && <p className="error">{errors?.subject}</p>}

                    <div className="input-group">
                        <label className="for-textarea">Message</label>
                        <textarea
                            name="message"
                            value={formData?.message ?? ""}
                            className={errors?.message && "invalid"}
                            onChange={changeHandler}
                            placeholder="Message..."
                        />
                    </div>
                    {errors?.message && <p className="error">{errors?.message}</p>}

                    <div className="input-group">
                        <label>&nbsp;</label>
                        <div className="button-group">
                            <button
                                type="button"
                                className="cancel"
                                onClick={() => dispatch(resetFormData())}
                            >Reset</button>
                            <button className="primary">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

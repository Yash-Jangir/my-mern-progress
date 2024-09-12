import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context";
import toast from "react-hot-toast";

export default function Register() {
    const [data, setData] = useState({ fullName: '', email: '', password: '', confPassword: '' })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const Auth = useAuth()
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setData(state => ({ ...state, [e.target.name]: e.target.value }))
        setErrors(state => ({ ...state, [e.target.name]: "" }))
    }

    const successHandler = (data) => {
        setIsLoading(false)
        navigate("/")
        return data?.message
    }

    const errorHandler = (err) => {
        setIsLoading(false)
        setErrors(err?.errors)
        return err?.message
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (data.password !== data.confPassword) {
            setErrors(state => ({ ...state, confPassword: "Password does not match" }))
            return
        }

        setIsLoading(true)
        toast.promise(
            Auth.register(data),
            {
                loading: "Logging in...",
                success: successHandler,
                error: errorHandler,
            }
        )
    }


    return (
        <section id="register">
            <form onSubmit={submitHandler}>
                <h1>Register</h1>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value={data.username}
                        onChange={changeHandler}
                        className={errors?.fullName && "invalid"}
                    />
                    {errors?.fullName && <p className="error">{errors?.fullName}</p>}
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        className={errors?.email && "invalid"}
                    />
                    {errors?.email && <p className="error">{errors?.email}</p>}
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        className={errors?.password && "invalid"}
                    />
                    {errors?.password && <p className="error">{errors?.password}</p>}
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Re-enter your password"
                        name="confPassword"
                        value={data.confPassword}
                        onChange={changeHandler}
                        className={errors?.confPassword && "invalid"}
                    />
                    {errors?.confPassword && <p className="error">{errors?.confPassword}</p>}
                </div>

                <div className="button-group">
                    <button disabled={isLoading} >Register</button>
                </div>
                <p>Already have an <Link to="/">account?</Link></p>
            </form>
        </section>
    )
}
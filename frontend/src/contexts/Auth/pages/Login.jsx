import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context";
import toast from "react-hot-toast";

export default function Login() {
    const [data, setData] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const Auth = useAuth()

    const changeHandler = (e) => {
        setData(state => ({ ...state, [e.target.name]: e.target.value }))
        setErrors(state => ({ ...state, [e.target.name]: "" }))
    }

    const successHandler = () => {
        setIsLoading(false)
        return `User Logged in successfully`
    }

    const errorHandler = (err) => {
        setIsLoading(false)
        setErrors(err?.errors)
        return err?.message
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        toast.promise(
            Auth.login(data),
            {
                loading: "Logging in...",
                success: successHandler,
                error: errorHandler,
            }
        )
    }

    return (
        <section id="login">
            <form onSubmit={submitHandler}>
                <h1>Login</h1>
                <div className="input-group">
                    <input
                        type="text"
                        className={errors?.username && "invalid"}
                        placeholder="Username or email"
                        name="username"
                        value={data.username}
                        onChange={changeHandler}
                    />
                    {errors?.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        className={errors?.password && "invalid"}
                        placeholder="Enter your password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                    />
                    {errors?.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="button-group">
                    <button
                        disabled={isLoading}
                    >Login</button>
                </div>
                <p>Don't have an <Link to="/register">account?</Link></p>
            </form>
        </section>
    )
}
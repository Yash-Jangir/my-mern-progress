import { RouterProvider } from "react-router-dom";
import AuthRouter from "../Router";
import { useAuth } from "../Context";

export default function AuthHandler(props) {
    const Auth = useAuth()

    if (Auth.isAuthenticated)
        return props.children

    return <RouterProvider router={AuthRouter} />
}
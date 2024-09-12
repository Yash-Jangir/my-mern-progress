import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
        </>
    )
)

export default router

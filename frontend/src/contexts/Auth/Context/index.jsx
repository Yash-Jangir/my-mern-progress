import { createContext, useContext, useEffect, useState } from "react";
import authController from "../../../api/controllers/auth.controller";
import Loader from "../../../components/Loader";

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [auth, setAuth] = useState({
        user: null,
        isAuthenticated: false,
        getUser: async () => await _getUser(),
        login: async (data) => await _login(data),
        register: async (data) => await _register(data),
        logout: async () => await _logout(),
        deleteAccount: async () => await _deleteAccount(),
        updateUser: async (data, isFile = false) => await _updateUser(data, isFile),
        changePassword: async (data) => await _changePassword(data),
    })


    // handler functions
    const _getUser = async () => {
        const resp = await authController.getUser()
        if (!resp?.status) {
            throw resp
        }

        setAuth(state => ({
            ...state,
            user: resp?.data,
            isAuthenticated: true,
        }))
        return resp
    }

    const _login = async (data) => {
        const resp = await authController.login(data)
        if (!resp.status) {
            throw resp
        }
        return await _getUser()
    }

    const _register = async (data) => {
        const resp = await authController.register(data)
        if (!resp.status) {
            throw resp
        }
        return resp
    }

    const _logout = async () => {
        const resp = await authController.logout()
        if (!resp.status) {
            throw resp
        }

        setAuth(state => ({
            ...state,
            user: null,
            isAuthenticated: false,
        }))
        return resp
    }

    const _deleteAccount = async () => {
        const resp = await authController.deleteAccount()
        if (!resp.status) {
            throw resp
        }

        setAuth(state => ({
            ...state,
            user: null,
            isAuthenticated: false,
        }))
        return resp
    }

    const _updateUser = async (data, isFile) => {
        const resp = isFile
            ? await authController.updateAvatar(data, true)
            : await authController.updateUser(data)

        if (!resp.status) {
            throw resp
        }

        setAuth(state => ({
            ...state,
            user: {
                ...state.user,
                ...resp?.data
            },
        }))
        return resp
    }

    const _changePassword = async (data) => {
        const resp = await authController.changePassword(data)
        if (!resp.status) {
            throw resp
        }
        return resp
    }


    // checking wether user is logged in or not
    useEffect(() => {
        auth.getUser()
            .catch((err) => console.log(err.message))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return <AuthContext.Provider value={auth} {...props} />
}

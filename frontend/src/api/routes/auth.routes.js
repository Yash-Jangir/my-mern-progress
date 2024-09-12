const AUTH_ROUTES = {
    GET_USER: {
        url: '/auth',
        method: "get"
    },
    LOGIN: {
        url: '/auth/login',
        method: "post"
    },
    REGISTER: {
        url: '/auth/register',
        method: "post"
    },
    LOGOUT: {
        url: '/auth/logout',
        method: "post"
    },
    DELETE_ACCOUNT: {
        url: '/auth/delete-account',
        method: "post"
    },
    CHANGE_PASSWORD: {
        url: '/auth/change-password',
        method: "patch"
    },
    UPDATE_USER: {
        url: '/auth/update/[field]',
        method: "patch"
    },
    UPDATE_AVATAR: {
        url: '/auth/update/avatar',
        method: "patch"
    },
}

export default AUTH_ROUTES

const TODO_ITEM_ROUTES = {
    CREATE: {
        url: '/todo-items',
        method: "post"
    },
    SHOW: {
        url: '/todo-items/[id]',
        method: "get"
    },
    UPDATE: {
        url: '/todo-items/[id]',
        method: "put"
    },
    DELETE: {
        url: '/todo-items/[id]',
        method: "delete"
    },
    TOGGLE_STATUS: {
        url: '/todo-items/[id]/toggle-status',
        method: "patch"
    },
}

export default TODO_ITEM_ROUTES

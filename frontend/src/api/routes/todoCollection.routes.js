const TODO_COLLECTION_ROUTES = {
    INDEX: {
        url: '/todo-collections',
        method: "get"
    },
    CREATE: {
        url: '/todo-collections',
        method: "post"
    },
    SHOW: {
        url: '/todo-collections/[id]',
        method: "get"
    },
    UPDATE: {
        url: '/todo-collections/[id]',
        method: "put"
    },
    DELETE: {
        url: '/todo-collections/[id]',
        method: "delete"
    },
}

export default TODO_COLLECTION_ROUTES

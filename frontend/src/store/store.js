import { configureStore } from "@reduxjs/toolkit";
import ticktactoe from "./reducers/ticktactoe";
import todo from "./reducers/todo";
import contact from "./reducers/contact";
import chatApp from "./reducers/chatApp";

const store = configureStore({
    reducer: {
        ticktactoe,
        todo,
        contact,
        chatApp
    },
})

export default store

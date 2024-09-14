import { configureStore } from "@reduxjs/toolkit";
import ticktactoe from "./reducers/ticktactoe";
import todo from "./reducers/todo";
import contact from "./reducers/contact";

const store = configureStore({
    reducer: {
        ticktactoe,
        todo,
        contact
    },
})

export default store

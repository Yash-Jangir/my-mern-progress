import { configureStore } from "@reduxjs/toolkit";
import ticktactoe from "./reducers/ticktactoe";
import todo from "./reducers/todo";

const store = configureStore({
    reducer: {
        ticktactoe,
        todo,
    },
})

export default store

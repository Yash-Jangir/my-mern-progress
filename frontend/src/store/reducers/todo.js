import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoCollectionController from "../../api/controllers/todoCollection.controller";
import todoItemController from "../../api/controllers/todoItem.controller";


// todo-collection api calls
export const getAllCollections = createAsyncThunk("todoCollection/getAllCollections", async (_, thunkAPI) => {
    const resp = await todoCollectionController.index()

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return resp
})

export const createCollection = createAsyncThunk("todoCollection/createCollection", async (data, thunkAPI) => {
    const resp = await todoCollectionController.create(data)

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return resp
})

export const updateCollection = createAsyncThunk("todoCollection/updateCollection", async (data, thunkAPI) => {
    const resp = await todoCollectionController.update(data)

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return resp
})

export const deleteCollection = createAsyncThunk("todoCollection/deleteCollection", async (data, thunkAPI) => {
    const resp = await todoCollectionController.delete(data)

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return { ...resp, ...data }
})


// todo-item api calls
export const createTodoItem = createAsyncThunk("todoItem/createTodoItem", async (data, thunkAPI) => {
    const resp = await todoItemController.create(data)

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return resp
})

export const updateTodoItem = createAsyncThunk("todoItem/updateTodoItem", async (data, thunkAPI) => {
    const resp = await todoItemController.update(data)

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return resp
})

export const deleteTodoItem = createAsyncThunk("todoItem/deleteTodoItem", async ({ id, collectionId }, thunkAPI) => {
    const resp = await todoItemController.delete({ id })

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return { id, collectionId, ...resp }
})

export const toggleItemStatus = createAsyncThunk("todoItem/toggleItemStatus", async ({ id, collectionId }, thunkAPI) => {
    const resp = await todoItemController.toggleStatus({ id })

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return { id, collectionId, ...resp }
})


const initialState = {
    collections: [],
    formData: {},
    errors: {},
}

const todoCollection = createSlice({
    name: "todoCollection",
    initialState,
    reducers: {
        setFormData: (state, { payload }) => {
            state.formData = payload
            state.errors = {}
        },
        handleFormDataChange: (state, { payload }) => {
            const { key, value } = payload
            state.formData[key] = value
            state.errors[key] = ""
        },
    },
    extraReducers: builder => {
        // collection actions
        builder.addCase(getAllCollections.fulfilled, (state, { payload }) => {
            state.collections = payload?.data || []
        })
        builder.addCase(createCollection.rejected, (state, { payload }) => {
            state.errors = payload.errors || {}
        })
        builder.addCase(updateCollection.rejected, (state, { payload }) => {
            state.errors = payload.errors || {}
        })
        builder.addCase(deleteCollection.fulfilled, (state, { payload }) => {
            state.collections = state.collections.filter(collection => collection.id !== payload.id)
        })

        // todo-item actions
        builder.addCase(createTodoItem.fulfilled, (state, { payload }) => {
            const collection = state.collections.find(collection => collection.id === payload.data.collectionId)
            if (collection) {
                collection.todoItems = [...collection.todoItems, payload.data]
            }
        })
        builder.addCase(updateTodoItem.fulfilled, (state, { payload }) => {
            const collection = state.collections.find(collection => collection.id === payload.data.collectionId)
            if (collection) {
                const item = collection.todoItems.find(todoItem => todoItem.id === payload.data.id)
                Object.assign(item, payload.data)
            }
        })
        builder.addCase(createTodoItem.rejected, (state, { payload }) => {
            state.errors = payload.errors || {}
        })
        builder.addCase(updateTodoItem.rejected, (state, { payload }) => {
            state.errors = payload.errors || {}
        })
        builder.addCase(deleteTodoItem.fulfilled, (state, { payload }) => {
            const collection = state.collections.find(collection => collection.id === payload.collectionId)
            if (collection) {
                collection.todoItems = collection.todoItems.filter(todoItem => todoItem.id !== payload.id)
            }
        })
        builder.addCase(toggleItemStatus.fulfilled, (state, { payload }) => {
            const todo = state.collections.find(collection => collection.id === payload.collectionId)
                ?.todoItems?.find(todoItem => todoItem.id === payload.id)

            if (todo)
                todo.status = payload.data.status
        })
    }
})

export const { setFormData, handleFormDataChange } = todoCollection.actions
export default todoCollection.reducer

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mailController from "../../api/controllers/contact.controller";

export const mailSend = createAsyncThunk("mail/send", async (data, thunkAPI) => {
    const resp = await mailController.send(data)

    if (!resp.status) {
        return thunkAPI.rejectWithValue(resp)
    }

    return resp

})

const initialState = {
    formData: {},
    errors: {},
}

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        resetFormData: (state, _) => {
            state.formData = {}
            state.errors = {}
        },
        setFormData: (state, { payload }) => {
            const { key, value } = payload
            state.formData[key] = value
            state.errors[key] = ""
        },
    },
    extraReducers: builder => {
        builder.addCase(mailSend.rejected, (state, { payload }) => {
            state.errors = payload.errors ?? {}
        })
    }
})

export const { setFormData, resetFormData } = contactSlice.actions
export default contactSlice.reducer

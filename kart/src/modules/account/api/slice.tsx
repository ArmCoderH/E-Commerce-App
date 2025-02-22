import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name : 'account',
    initialState : {
        user : null,
        loading : false,
        error : null
    },
    reducers : {
        setData : (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        setLoading : (state) => {
            state.loading = true;
        },
        setError : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { setData, setLoading, setError } = accountSlice.actions;

export default accountSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser } from '../../utils/api';

const initialState = {
    user: {},
    isLoading: false,
    error: null
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (form, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        try {
            const data = await createUser(form);
            if (!Array.isArray(data)) {
                throw new Error({ message: 'Ошибка в получении данных', statusCode: 404 })
            }
            return fulfillWithValue(data);
        } catch (error) {
            if (error.statusCode) {
                return rejectWithValue(error);
            }
            console.log(error)
            return rejectWithValue({ message: 'ошибка на стороне сервера' })
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default userSlice.reducer
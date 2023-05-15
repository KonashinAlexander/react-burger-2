import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser } from '../../utils/api';


const initialState = {
    user: {},
    isLoading: false,
    error: null
}

export const fetchUserLogin = createAsyncThunk(
    'user/fetchUser',
    async (form, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        try {
            const data = await loginUser(form);

            if (Object.prototype.toString.call(data) !== '[object Object]') {
                throw new Error({ message: 'Ошибка в получении данных', statusCode: 404 })
            }

            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('user', JSON.stringify(data.user))
            document.cookie = "token=123"

            return fulfillWithValue(data);
        } catch (error) {
            if (error.statusCode) {
                return rejectWithValue(error);
            }
            console.log('fetch error >>', error)
            return rejectWithValue({ message: 'ошибка на стороне сервера' })
        }
    }
)

export const fetchUserCreate = createAsyncThunk(
    'user/fetchUser',
    async (form, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        try {
            const data = await createUser(form);
            if (Object.prototype.toString.call(data) !== '[object Object]') {
                throw new Error({ message: 'Ошибка в получении данных', statusCode: 404 })
            }
            return fulfillWithValue(data);
        } catch (error) {
            if (error.statusCode) {
                return rejectWithValue(error);
            }
            console.log('fetch error >>', error)
            return rejectWithValue({ message: 'ошибка на стороне сервера' })
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLogin.pending, (state, action) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchUserLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null

            })
            .addCase(fetchUserLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCreate.pending, (state, action) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchUserCreate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null
            })
            .addCase(fetchUserCreate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
})

export default userSlice.reducer
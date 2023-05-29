import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getIngredients } from '../../utils/api'

const initialState = {
    data: [],
    isLoading: false,
    error: null
}

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const data = await getIngredients();
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

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default ingredientsSlice.reducer
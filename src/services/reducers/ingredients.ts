import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { getIngredients } from '../../utils/api'
import { TIngredientsType } from '../../utils/prop-types'

type TIngredientsState = {
    data: TIngredientsType[],
    isLoading: boolean,
    error: {message: string} | null
}

const initialState: TIngredientsState = {
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
                throw new Error()
                // throw new Error({ message: 'Ошибка в получении данных', options: 404 })
            }
            return fulfillWithValue(data);
        } catch (error: any) {
            if (error.options) {
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
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<TIngredientsType[]>) => {
                state.isLoading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(fetchIngredients.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
    
})

export default ingredientsSlice.reducer
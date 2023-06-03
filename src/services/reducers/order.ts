import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderDetails } from '../../utils/api';

interface IOrderState {
  orderId: number,
  orderName: string,
  isLoading: boolean,
  error: {message: string} | null
}

type TOrderInfo = {
  success: boolean;
  name: string;
  order: {
    number: number
  }
}

const initialState: IOrderState = {
  orderId: 0,
  orderName: '',
  isLoading: false,
  error: null
}

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    try {      
      const a: any = getState()
      const newOrder: string[] = a.constructorStore.ingredientsIds
      const data = await getOrderDetails({ ingredients: newOrder });
      if (Object.prototype.toString.call(data) !== '[object Object]') {
        throw new Error()
        // throw new Error({ message: 'Ошибка в получении данных', statusCode: 404 })
      }
      return fulfillWithValue(data);
    } catch (error: any) {
      if (error.statusCode) {
        return rejectWithValue(error);
      }
      return rejectWithValue({ message: 'ошибка на стороне сервера' })
    }
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<TOrderInfo>) => {
        state.isLoading = false;
        state.orderId += action.payload.order.number
        state.orderName = action.payload.name
        state.error = null
      })
      .addCase(fetchOrder.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export default orderSlice.reducer

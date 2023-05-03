import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderDetails } from '../../utils/api';

const initialState = {
  orderId: 0,
  orderName: '',
  isLoading: false,
  error: null
}

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (newOrder, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await getOrderDetails(newOrder);
      if (Object.prototype.toString.call(data) !== '[object Object]') {
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state, action) => {

        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {

        state.isLoading = false;
        state.orderId += action.payload.order.number
        state.orderName = action.payload.name
        state.error = null
      })
      .addCase(fetchOrder.rejected, (state, action) => {

        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export default orderSlice.reducer

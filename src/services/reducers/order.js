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
      console.log('fetchOrder >> getOrderDetails >>', data)
      // if (!Array.isArray(data)) {
      //   throw new Error({ message: 'Ошибка в получении данных', statusCode: 404 })
      // }
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
        console.log('fetchOrder.pending >>', action)
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        console.log('fetchOrder.fulfilled >>', action)
        state.isLoading = false;
        state.orderId += action.payload.order.number
        state.orderName = action.payload.name
        state.error = null
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        console.log('orderSlice rejected >>', action)
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})


// export const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     updateOrderDetails: (state, action) => {
//       state.orderId += action.payload.order.number
//       state.orderName = action.payload.name
//     },
//   }
// })

export default orderSlice.reducer
export const { updateOrderDetails } = orderSlice.actions;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: 0,
  orderName: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrderDetails: (state, action) => {
      state.orderId += action.payload.order.number
      state.orderName = action.payload.name
    }
  }
})

export default orderSlice.reducer
export const { updateOrderDetails } = orderSlice.actions;
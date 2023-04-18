import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: 0
} 

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {    
      icrementOrderId: (state) => {
        state.orderId += 1
      }
    }
})

export default orderSlice.reducer
export const { icrementOrderId } = orderSlice.actions;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndgredient: {}
}

export const currentSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    addCurrentIngredient: (state, action) => {
      state.currentIndgredient = action.payload
    },
    removeCurrentIngredient: (state, action) => {
      state.currentIndgredient = {}
    }
  }
})

export default currentSlice.reducer
export const { addCurrentIngredient, removeCurrentIngredient } = currentSlice.actions;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredientDetails: {}
}

export const detailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    addIngredientDetails: (state, action) => {
      state.ingredientDetails = action.payload
    },
    removeIngredientDetails: (state, action) => {
      state.ingredientDetails = {}
    }
  }
})

export default detailsSlice.reducer
export const { addIngredientDetails, removeIngredientDetails } = detailsSlice.actions;
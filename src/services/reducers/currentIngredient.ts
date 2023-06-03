import { createSlice } from '@reduxjs/toolkit';
import { TIngredientsDetailsType } from '../../utils/prop-types';

type TCurrentState = {
  currentIndgredient: TIngredientsDetailsType | {};
}

const initialState: TCurrentState = {
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
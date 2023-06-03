import { createSlice } from '@reduxjs/toolkit';
import { TIngredientsDetailsType } from '../../utils/prop-types';

type TDetailsState = {
  ingredientDetails: TIngredientsDetailsType | {_id: ''};
}

const initialState: TDetailsState = {
  ingredientDetails: {_id: ''},
}

export const detailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    addIngredientDetails: (state, action) => {
      state.ingredientDetails = action.payload
    },
    removeIngredientDetails: (state) => {
      state.ingredientDetails = {_id: ''}
    }
  }
})

export default detailsSlice.reducer
export const { addIngredientDetails, removeIngredientDetails } = detailsSlice.actions;
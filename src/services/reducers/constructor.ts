import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';
import { TConstructorIngredients } from '../../utils/prop-types';

type TConstructorState = {
  buns: TConstructorIngredients[],
  bunsIds: string[],
  ingredients: TConstructorIngredients[],
  ingredientsIds: string[],
}

const initialState: TConstructorState = {
  buns: [],
  bunsIds: [],
  ingredients: [],
  ingredientsIds: [],
}

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructor: (state, action) => {
      switch (action.payload.type) {
        case 'bun':
          state.buns.splice(0, 1, { ...action.payload, uuid: uuidv4() })
          state.bunsIds = state.buns.map(item => item._id)
          break;
        default:
          state.ingredients.push({ ...action.payload, uuid: uuidv4() });
          state.ingredientsIds = state.ingredients.map(item => item._id)
          break;
      }
    },
    removeConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter(item => { return item.uuid !== action.payload.uuid })
      state.ingredientsIds = state.ingredients.map(item => item._id)
    },
    moveIngredients: (state, action) => {
      state.ingredients = update(state.ingredients, {
        $splice: [
          [action.payload[0], 1],
          [action.payload[1], 0, state.ingredients[action.payload[0]]]
        ]
      })
    }
  }
})

export default constructorSlice.reducer
export const { addConstructor, removeConstructor, moveIngredients } = constructorSlice.actions;
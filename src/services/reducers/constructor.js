import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  buns: [],
  ingredients: [],
  ingredientsIds: []
} 

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructor: (state, action) => { 
       state.ingredients.push({...action.payload, uuid: uuidv4()});
       state.ingredientsIds.push(action.payload._id);
    },
    removeConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter(item=>{return item.uuid !==action.payload})
    }
  }
})

export default constructorSlice.reducer
export const { addConstructor, removeConstructor } = constructorSlice.actions;
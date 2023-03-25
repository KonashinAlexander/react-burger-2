import { createSlice } from '@reduxjs/toolkit'

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  bun: null,
  ingredients: []
} 

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructor: (state, action) => {
        if(action.payload.type === 'bun') {
            return state.bun = action.payload
        }
        state.ingredients.push({...action.payload, uuid: uuidv4()});
    }
  }
})

export default constructorSlice.reducer
export const { addConstructor} = constructorSlice.actions;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndgredient: {}
} 

export const currentSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {    
  
    }
})

export default currentSlice.reducer
// export const { addConstructor, removeConstructor } = constructorSlice.actions;
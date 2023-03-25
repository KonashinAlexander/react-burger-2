import { configureStore } from '@reduxjs/toolkit'
import ingredients  from './reducers/ingredients';
import constructor from './reducers/constructor';


const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor
  },
})

export default store;
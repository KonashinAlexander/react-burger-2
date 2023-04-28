import { configureStore } from '@reduxjs/toolkit'

import ingredients from './reducers/ingredients';
import constructor from './reducers/constructor';
import currentIngredient from './reducers/currentIngredient';
import order from './reducers/order';


const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    currentIngredientStore: currentIngredient,
    orderStore: order
  }
})

export default store;
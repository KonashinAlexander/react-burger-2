import { configureStore } from '@reduxjs/toolkit'

import ingredients from './reducers/ingredients';
import constructor from './reducers/constructor';
import currentIngredient from './reducers/currentIngredient';
import order from './reducers/order';
import user from './reducers/user';
import ingredientDetails from './reducers/ingredientDetails';


const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    currentIngredientStore: currentIngredient,
    orderStore: order,
    userStore: user,
    detailsStore: ingredientDetails
  }
})

export default store;
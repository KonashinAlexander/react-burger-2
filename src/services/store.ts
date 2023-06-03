import { configureStore } from '@reduxjs/toolkit'
import ingredients from './reducers/ingredients';
import constructor from './reducers/constructor';
import currentIngredient from './reducers/currentIngredient';
import order from './reducers/order';
import ingredientDetails from './reducers/ingredientDetails';

const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    currentIngredientStore: currentIngredient,
    orderStore: order,
    detailsStore: ingredientDetails
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { combineReducers } from "redux";
import constructor from "./constructor";
import currentIngredient from "./currentIngredient";
import { webSocketApi } from "../rtk/web-socket";
import { ingredientsApi } from "../rtk/ingredients";
import { ordersApi } from "../rtk/orders";
import { authApi } from "../rtk/authorization";
import auth from './authSlice'

const rootReducer = combineReducers({
    constructorStore: constructor,
    currentIngredientStore: currentIngredient,
    authStore: auth,   
    [webSocketApi.reducerPath]: webSocketApi.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
})

export default rootReducer;
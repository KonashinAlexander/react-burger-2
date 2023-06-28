import { combineReducers } from "redux";
import constructor from "./constructor";
import currentIngredient from "./currentIngredient";
import ingredientDetails from "./ingredientDetails";
import { webSocketApi } from "../rtk/web-socket";
import { ingredientsApi } from "../rtk/ingredients";
import { ordersApi } from "../rtk/orders";

const rootReducer = combineReducers({
    constructorStore: constructor,
    currentIngredientStore: currentIngredient,
    detailsStore: ingredientDetails,
    [webSocketApi.reducerPath]: webSocketApi.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,

})

export default rootReducer;
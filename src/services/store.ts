import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';
import { authApi } from './rtk/authorization';
import { ingredientsApi } from './rtk/ingredients';
import { ordersApi } from './rtk/orders';
import { webSocketApi } from './rtk/web-socket';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
            .concat(webSocketApi.middleware)
            .concat(ingredientsApi.middleware)
            .concat(ordersApi.middleware)
            .concat(authApi.middleware)

  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

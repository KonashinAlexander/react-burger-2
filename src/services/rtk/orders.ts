import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/api';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {   
        const token = (getState() as RootState).authStore.accessToken
        if (token) {
          headers.set("Authorization", token);
        }
        return headers;
      }
})

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        postOrders: build.mutation<any, any>({
            query: (body) => ({
                url: 'orders',
                method: 'POST',
                body: {ingredients: body},
            })
        })
    }),
})

export const { usePostOrdersMutation } = ordersApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/api';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
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
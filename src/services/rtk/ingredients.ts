import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/api';
import { TIngredientsType } from '../../utils/prop-types';

interface IingredientsData {
    success: boolean,
    data: TIngredientsType[]
}

export const ingredientsApi = createApi({
    tagTypes: ['Ingredients'],
    reducerPath: 'ingredientsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
    endpoints: (build) => ({
        getIngredients: build.query<IingredientsData, string>({
            query: () => 'ingredients',
            providesTags: ['Ingredients']
        })
    }),
})

export const { useGetIngredientsQuery } = ingredientsApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/api';
import { setCredentials, logout} from '../reducers/authSlice'
import { RootState } from '../store';


import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'

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


const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions) 

  if (result?.error?.status === 403 ) {    
    const refreshResult = await baseQuery('auth/token', api, extraOptions) 
    
    if (refreshResult?.data) {    
        const user = (api.getState() as RootState).authStore.user
        api.dispatch(setCredentials({...refreshResult.data, user}))      
        result = await baseQuery(args, api, extraOptions)
    } else {        
      api.dispatch(logout())
    }
  }
  return result
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,     
    endpoints: (build)=> ({}),    
})


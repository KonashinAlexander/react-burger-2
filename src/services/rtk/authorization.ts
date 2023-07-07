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

const refreshToken = document.cookie.split('=')[1]

const refreshArgs  = {
      url: 'auth/token',
      method: 'POST',
      body: {token: refreshToken},
  }

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions) 

  if (result?.error?.status === 403 || result?.error?.status === 401) {         
    const refreshResult : any = await baseQuery(refreshArgs, api, extraOptions) 
    
    if (refreshResult?.data) { 
        const user = JSON.parse(localStorage.getItem('user')!)
        document.cookie = `refreshToken=${refreshResult.data.refreshToken}`        
        api.dispatch(setCredentials({...refreshResult.data, user}))      
        result = await baseQuery(args, api, extraOptions)

    } else {  
      console.log('refreshResult.error >>', refreshResult.error)      
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


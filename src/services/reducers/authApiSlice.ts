import { endpointUrls } from '../../utils/api'
import { authApi } from '../rtk/authorization'
const refreshToken = document.cookie.split('=')[1]

export const authApiSlice = authApi.injectEndpoints({
    
    endpoints: (build) => ({
        getUser: build.query<any, any>({
            query: ()=> endpointUrls.getUser
        }),
        updateUser: build.mutation<any, any>({
            query: (form) => ({
                url: endpointUrls.updateUser,
                method: 'PATCH',
                body: form,
            })
        }),
        renewToken: build.mutation<any, any>({
            query: () => ({
                url: endpointUrls.renewToken,
                method: 'POST',
                body: {token: refreshToken},
            })
        }),
        registerUser: build.mutation<any, any>({
            query: (form) => ({
                url: endpointUrls.registerUser,
                method: 'POST',
                body: form,
            })
        }),
        loginUser: build.mutation<any, any>({
            query: (form) => ({
                url: endpointUrls.loginUser,
                method: 'POST',
                body: form,
            })
        }),
        logoutUser: build.mutation<any, any>({
            query: (refreshToken) => ({
                url: endpointUrls.logoutUser,
                method: 'POST',
                body: refreshToken,
            })
        }),
        resetPass: build.mutation<any, any>({
            query: (email) => ({
                url: endpointUrls.resetPass,
                method: 'POST',
                body: {email: email},
            })
        }),
        changePass: build.mutation<any, any>({
            query: (form) => ({
                url: endpointUrls.changePass,
                method: 'POST',
                body: form,
            })
        }),
    }),
    
})


export const { useLoginUserMutation, 
    useResetPassMutation, 
    useChangePassMutation, 
    useRegisterUserMutation, 
    useLogoutUserMutation, 
    useGetUserQuery,
    useRenewTokenMutation,
    useUpdateUserMutation } = authApiSlice
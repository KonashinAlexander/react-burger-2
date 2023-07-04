import { authApi } from '../rtk/authorization'
const refreshToken = document.cookie.split('=')[1]

export const authApiSlice = authApi.injectEndpoints({
    
    endpoints: (build) => ({
        getUser: build.query<any, any>({
            query: ()=> 'auth/user'
        }),
        updateUser: build.mutation<any, any>({
            query: (form) => ({
                url: 'auth/user',
                method: 'PATCH',
                body: form,
            })
        }),
        renewToken: build.mutation<any, any>({
            query: () => ({
                url: 'auth/token',
                method: 'POST',
                body: {token: refreshToken},
            })
        }),
        registerUser: build.mutation<any, any>({
            query: (form) => ({
                url: 'auth/register',
                method: 'POST',
                body: form,
            })
        }),
        loginUser: build.mutation<any, any>({
            query: (form) => ({
                url: 'auth/login',
                method: 'POST',
                body: form,
            })
        }),
        logoutUser: build.mutation<any, any>({
            query: (refreshToken) => ({
                url: 'auth/logout',
                method: 'POST',
                body: refreshToken,
            })
        }),
        resetPass: build.mutation<any, any>({
            query: (email) => ({
                url: 'password-reset',
                method: 'POST',
                body: {email: email},
            })
        }),
        changePass: build.mutation<any, any>({
            query: (form) => ({
                url: 'password-reset/reset',
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
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';



export const initialState = {
        accessToken: localStorage.getItem('accessToken') || '',
        user: {
            email: '',
            name: '',
        }
    }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken} = action.payload            
            state.user = user
            state.accessToken = accessToken
        },
        updateCredentials: (state, action) => {
            const { user} = action.payload            
            state.user = user            
        },
        logout: (state) => {          
            state.accessToken = ''
            state.user = {
                email: '',
                name: '',
            }
        },
    }
})

export const { setCredentials, logout, updateCredentials} = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.authStore.user
export const selectCurrentAccessToken = (state: RootState) => state.authStore.accessToken

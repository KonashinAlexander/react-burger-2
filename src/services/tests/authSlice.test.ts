import auth, { 
    setCredentials, 
    logout, 
    updateCredentials,
    initialState
} from '../reducers/authSlice'

const userCredentials = {
    accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTNhODZmMTJmNGEyMDAxYmQ1YjcwMiIsImlhdCI6MTY5MDQ0MDE4MywiZXhwIjoxNjkwNDQxMzgzfQ.jJ9xt5Es-kWiqFiTV0ofJaH8By3dBCoa3VAi88iLQfA',
    user: {
        email: 'kid@ya.ru',
        name: 'kid',
    }
}

const userUpdate = {
    user: {
        email: 'kiddy@ya.ru',
        name: 'kiddy',
    }
}

describe('auth', ()=>{
    it('should return the initial state', ()=>{
        const result = auth(undefined, {type: ''});
        expect(result).toEqual(initialState)
    });

    it('should add credentials with "setCredentials" action', ()=>{
        const action = {type: setCredentials.type, payload: userCredentials}
        const result = auth(initialState, action)
        expect(result).toEqual(userCredentials)        
    })

    it('should update credentials with "updateCredentials" action', ()=>{
        const action = {type: updateCredentials.type, payload: userUpdate}
        const result = auth(userCredentials, action)

        expect(result.accessToken).toEqual(userCredentials.accessToken)
        expect(result.user).toEqual(userUpdate.user)              
    })

    it('should logout with "logout" action', ()=>{
        const action = {type: logout.type, payload: undefined}
        const result = auth(userCredentials, action)

        expect(result).toEqual(initialState)                   
    })
})
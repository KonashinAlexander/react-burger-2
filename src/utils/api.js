export const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients'

export const checkResponse = (res) => {
    return res.ok 
            ? res.json() 
            : res.json().then(err => Promise.reject(err))
}

export const getIngredients = () => {
    return fetch(`${INGREDIENTS_API_URL}`)
            .then(checkResponse)
            .then(dataIngredients => {
                if(dataIngredients.success) {
                    return dataIngredients.data
                }
            })
            .catch(err=>{console.log(err)})
}
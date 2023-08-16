
import currentIngredient, {
    addCurrentIngredient, 
    removeCurrentIngredient,
    initialState
} from "../reducers/currentIngredient";

const ingredient = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    count: 0,
}

describe('currentIngredient', () => {

    it('should return the initial state', () => {
        const result = currentIngredient(undefined, { type: '' });
        expect(result).toEqual(initialState)
    });

    it('should add new current ingredient with "addCurrentIngredient" action', () => {
        const action = { type: addCurrentIngredient.type, payload: ingredient }
        const result = currentIngredient(initialState, action)       
        
        expect(result).toEqual({
            currentIndgredient: ingredient
        })
    });

    it('should remove current ingredient with "removeCurrentIngredient" action', () => {        
        const action = { type: removeCurrentIngredient.type, payload: null }
        const result = currentIngredient({currentIndgredient: ingredient}, action)       
        
        expect(result).toEqual(initialState)
    });
    
})
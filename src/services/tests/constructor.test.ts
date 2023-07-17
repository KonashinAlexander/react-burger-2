import constructor, {
    addConstructor,
    moveIngredients,
    removeConstructor,
    TConstructorState
} from "../reducers/constructor";

const initialState: TConstructorState = {
    buns: [],
    bunsIds: [],
    ingredients: [],
    ingredientsIds: [],
  }

const bun = {
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
    // uuid: '3e5fc289-5148-4b39-8450-bf941a7146fd'
  }

describe('constructor', ()=>{

    it('should return the initial state', ()=>{
        const result = constructor(undefined, {type: ''});
        expect(result).toEqual(initialState)
    });

    it('should add new bun with "addConstructor" action', ()=>{
        const action = {type: addConstructor.type, payload: bun}
        const result = constructor(initialState, action)

        expect(result).toEqual({
            buns: [bun],
            bunsIds: [bun._id],
            ingredients: [],
            ingredientsIds: [],
        })
    })
})
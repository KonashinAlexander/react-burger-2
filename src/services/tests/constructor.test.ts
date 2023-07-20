
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
    uuid: '3e5fc289-5148-4b39-8450-bf941a7146fd',
    
  }

  const fillet = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    count: 0,
    uuid: 'd612a43f-3818-4495-8ae2-088a93dfa62c',
  
  }



describe('constructor', ()=>{

    it('should return the initial state', ()=>{
        const result = constructor(undefined, {type: ''});
        expect(result).toEqual(initialState)
    });

    it('should add new bun with "addConstructor" action', ()=>{
        const action = {type: addConstructor.type, payload: bun}
        const result = constructor(initialState, action) 

        expect(result.buns[0].__v).toEqual(bun.__v)
        expect(result.buns[0]._id).toEqual(bun._id)
        expect(result.buns[0].calories).toEqual(bun.calories)
        expect(result.buns[0].carbohydrates).toEqual(bun.carbohydrates)
        expect(result.buns[0].count).toEqual(bun.count)
        expect(result.buns[0].fat).toEqual(bun.fat)
        expect(result.buns[0].image).toEqual(bun.image)
        expect(result.buns[0].image_large).toEqual(bun.image_large)
        expect(result.buns[0].image_mobile).toEqual(bun.image_mobile)
        expect(result.buns[0].name).toEqual(bun.name)
        expect(result.buns[0].price).toEqual(bun.price)
        expect(result.buns[0].proteins).toEqual(bun.proteins)
        expect(result.buns[0].type).toEqual(bun.type)   
        expect(result.buns[0].uuid).not.toBeNull() // not in action, added with random value     
        
        expect(result.bunsIds[0]).toEqual(bun._id)

        expect(result.ingredients).toEqual([])
        expect(result.ingredientsIds).toEqual([])       
       
    })

    it('should add new ingredient with "addConstructor" action', ()=>{
        const action = {type: addConstructor.type, payload: fillet}
        const result = constructor(initialState, action)   
      
        expect(result.buns).toEqual([])
        expect(result.bunsIds).toEqual([])  
        
        expect(result.ingredients[0].__v).toEqual(fillet.__v)
        expect(result.ingredients[0]._id).toEqual(fillet._id)
        expect(result.ingredients[0].calories).toEqual(fillet.calories)
        expect(result.ingredients[0].carbohydrates).toEqual(fillet.carbohydrates)
        expect(result.ingredients[0].count).toEqual(fillet.count)
        expect(result.ingredients[0].fat).toEqual(fillet.fat)
        expect(result.ingredients[0].image).toEqual(fillet.image)
        expect(result.ingredients[0].image_large).toEqual(fillet.image_large)
        expect(result.ingredients[0].image_mobile).toEqual(fillet.image_mobile)
        expect(result.ingredients[0].name).toEqual(fillet.name)      
        expect(result.ingredients[0].price).toEqual(fillet.price)
        expect(result.ingredients[0].proteins).toEqual(fillet.proteins)
        expect(result.ingredients[0].type).toEqual(fillet.type)
        expect(result.ingredients[0].uuid).not.toBeNull()       
    })

    it('should remove new ingredient with "removeConstructor" action', ()=>{
      const state = {
        buns: [],
        bunsIds: [],
        ingredients: [fillet],
        ingredientsIds: [fillet._id],
      }
      const action = {type: removeConstructor.type, payload: fillet}
      const result = constructor(state, action)   
    
      expect(result).toEqual(initialState)             
  })
  
})
import { selectIngredients } from '../reducers/constructor';


describe('redux selectors', () => {
    it('should select ingredients from constructor state', () => {

        const constructorStore = {
            buns: [
                {
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
                    uuid: 'cf817595-9004-4fd5-a696-facce0e91d4f'
                }
            ],
            bunsIds: [
                '643d69a5c3f7b9001cfa093d'
            ],
            ingredients: [
                {
                    _id: '643d69a5c3f7b9001cfa0946',
                    name: 'Хрустящие минеральные кольца',
                    type: 'main',
                    proteins: 808,
                    fat: 689,
                    carbohydrates: 609,
                    calories: 986,
                    price: 300,
                    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
                    image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
                    image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
                    __v: 0,
                    count: 0,
                    uuid: '8d0e453b-3ffa-4dae-bf24-a791e88ce598'
                }
            ],
            ingredientsIds: [
                '643d69a5c3f7b9001cfa0946'
            ],
        }

        const result = selectIngredients({ constructorStore })

        expect(result).toEqual(constructorStore)
    })
})
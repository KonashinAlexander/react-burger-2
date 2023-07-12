import React from 'react'
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';

const HomePage: React.FC = () => {
    return (
        <main className='main'>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}
export default HomePage;

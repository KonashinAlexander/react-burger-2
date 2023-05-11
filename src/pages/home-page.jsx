import React from 'react'
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';

function HomePage() {
    return (
        <main className='main'>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}

export default HomePage;

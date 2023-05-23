import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const ingredient = useSelector(state => state.detailsStore.ingredientDetails._id)

    useEffect(() => {
        setSearchParams({ ingredient })
    }, [ingredient])


    return (
        <main className='main'>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}

export default HomePage;

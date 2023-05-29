import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { TDetailsStore } from '../utils/prop-types';

const HomePage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const ingredient = useSelector((state: TDetailsStore) => state.detailsStore.ingredientDetails._id)

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

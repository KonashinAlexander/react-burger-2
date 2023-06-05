import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { useAppSelector } from '../services/hooks';


const HomePage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const ingredients = useAppSelector((state) => state.detailsStore.ingredientDetails._id)
    console.log(searchParams)

    useEffect(() => {
        setSearchParams({ ingredients })
    }, [ingredients])


    return (
        <main className='main'>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}

export default HomePage;

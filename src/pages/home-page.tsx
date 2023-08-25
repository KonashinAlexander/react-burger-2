import React from 'react'
import styles from './page.module.css'
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';

const HomePage: React.FC = () => {


    return (
        <main className={styles.home}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}
export default HomePage;

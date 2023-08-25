import React from 'react'
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import styles from './page.module.css'

const IngredientPage: React.FC = () => {


    return (
        <div className={styles.box_page}>
            <IngredientDetails />

        </div>

    )
}

export default IngredientPage

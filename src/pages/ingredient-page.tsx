import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetIngredientsQuery } from '../services/rtk/ingredients';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';

const IngredientPage: React.FC = () => {

    return <IngredientDetails />
}

export default IngredientPage

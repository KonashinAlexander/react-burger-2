import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetIngredientsQuery } from '../services/rtk/ingredients';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';

const IngredientPage: React.FC = () => {
    const { id } = useParams()
    const { data } = useGetIngredientsQuery('')
    const item = data?.data.filter(item => item._id === id)[0]

    const content = item
        ? <IngredientDetails data={item} />
        : <p>Попробуйте уточнить запрос в URL</p>

    return content
}

export default IngredientPage

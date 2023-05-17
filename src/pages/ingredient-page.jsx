import React from 'react'
import { useParams } from 'react-router-dom'

function IngredientPage() {

    const { id } = useParams()
    console.log(id);

    return (
        <div>IngredientPage
            {id}
        </div>
    )
}

export default IngredientPage

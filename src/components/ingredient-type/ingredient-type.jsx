import { forwardRef } from "react";
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './ingredient-type.module.css'
import { useSelector } from "react-redux";
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient'
import { ingredientsPropType } from "../../utils/prop-types";

const IngredientType = forwardRef(({ title, id, ingredients }, ref) => {

    const ingredientsIds = useSelector(state => state.constructorStore.ingredientsIds)
    const bunsIds = useSelector(state => state.constructorStore.bunsIds)
    const ids = ingredientsIds.concat(bunsIds).concat(bunsIds)

    return (
        <section className={title} ref={ref}>
            <h2 className={cn(style.title, "text", "text_type_main-medium")} id={id}>{title}</h2>
            <div className={cn(style.list, 'mb-10', 'pl-4', 'pr-4')}>
                {ingredients?.map(data => <BurgerIngredient
                    key={data._id}
                    {...data}
                    count={ids.filter(id => id === data._id).length}
                />)
                }
            </div>
        </section>
    )
})

IngredientType.displayName = 'IngredientType';

IngredientType.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(
        PropTypes.shape(ingredientsPropType)
    )
}

export default IngredientType;


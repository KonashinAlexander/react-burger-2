import { forwardRef } from "react";
import cn from 'classnames';
import style from './ingredient-type.module.css'
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient'
import { TIngredientsType } from "../../utils/prop-types";
import { useAppSelector } from "../../services/hooks";
import { selectIngredients } from "../../services/reducers/constructor";

type TTypeProps = {
    title: string;
    id: string;
    ingredients: TIngredientsType[] | undefined;
}

const IngredientType = forwardRef<HTMLDivElement, TTypeProps>(({ title, id, ingredients }, ref) => {
    console.log('IngredientType')

    const { ingredientsIds, bunsIds } = useAppSelector(selectIngredients)
    // const {bunsIds} = useAppSelector(selectIngredients)
    const ids = ingredientsIds.concat(bunsIds).concat(bunsIds)

    return (
        <div className={title} ref={ref}>
            <h2 className={cn(style.title, "text", "text_type_main-medium")} id={id}>{title}</h2>
            <div className={cn(style.list, 'mb-10', 'pl-4', 'pr-4')}>
                {ingredients?.map((data) => (
                    <BurgerIngredient
                        key={data._id}
                        {...data}
                        count={ids.filter(id => id === data._id).length}
                    />
                ))}
            </div>
        </div>
    )
})

IngredientType.displayName = 'IngredientType';

export default IngredientType;


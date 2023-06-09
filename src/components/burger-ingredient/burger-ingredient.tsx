import { useDrag } from 'react-dnd';
import styles from '../burger-ingredient/burger-ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBurgerIngredientsProps } from "../../utils/prop-types";
import { useDispatch } from 'react-redux';
import { addIngredientDetails } from '../../services/reducers/ingredientDetails';
import React from 'react';

export const BurgerIngredient: React.FC<TBurgerIngredientsProps> = (props) => {

  const dispatch = useDispatch();

  const openModal = () => {
    localStorage.setItem('ingredient', JSON.stringify(props))
    dispatch(addIngredientDetails(props))
  }

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: props,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div className={styles.ingredient_box}
        onClick={openModal}
        ref={drag}
      >
        {props.count > 0 ? (
          <div className={styles.counter}>
            <p className={styles.counter__num}>{props.count}</p>
          </div>
        ) : (
          <p></p>
        )}
        <img src={props.image} />
        <div className={styles.price_box}>
          <p className="text text_type_digits-default mr-3">{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
      </div>
    </>
  );
};



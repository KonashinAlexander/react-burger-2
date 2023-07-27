import { useDrag } from 'react-dnd';
import cn from 'classnames'
import styles from '../burger-ingredient/burger-ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBurgerIngredientsProps } from "../../utils/prop-types";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BurgerIngredient: React.FC<TBurgerIngredientsProps> = (props) => {
  const location = useLocation()

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: props,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Link
      className={styles.burger_ingredient}
      to={`ingredients/${props._id}`}
      state={{ backgroundLocation: location }}
      ref={drag}
    >
      <div
        className={styles.ingredient_box}

      >
        {props.count > 0 ? (
          <div className={styles.counter}>
            <p className={styles.counter__num}>{props.count}</p>
          </div>
        ) : (
          <p></p>
        )}
        <img src={props.image} alt={props.name} />
        <div className={styles.price_box}>
          <p className="text text_type_digits-default mr-3">{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={cn(styles.ingredient_title, 'text_type_main-default')}>{props.name}</p>
      </div>
    </Link>

  );
};



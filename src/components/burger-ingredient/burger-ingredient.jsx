import { useDrag } from 'react-dnd';
import styles from '../burger-ingredient/burger-ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropType } from "../../utils/prop-types";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addIngredientDetails } from '../../services/reducers/ingredientDetails';

export const BurgerIngredient = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(addIngredientDetails(props))
  }

  const [{ isDragging }, drag] = useDrag(() => ({
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

BurgerIngredient.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape(ingredientsPropType)
  )
}

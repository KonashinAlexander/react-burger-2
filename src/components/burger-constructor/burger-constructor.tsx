import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useMemo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import cn from 'classnames';
import style from './burger-constructor.module.css';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { fetchOrder } from '../../services/reducers/order';
import { addConstructor } from '../../services/reducers/constructor';
import { addCurrentIngredient } from '../../services/reducers/currentIngredient';
import ConstructorElementItem from '../constructor-element/constructor-element';
import { useNavigate } from 'react-router-dom';
import { TConctrElemProps, TConstructorIngredients } from '../../utils/prop-types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const BurgerConstructor: React.FC = () => {
  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => {
      dispatch(addConstructor(item));
      dispatch(addCurrentIngredient(item));
    },
  }));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const buns = useAppSelector(state => state.constructorStore.buns);
  const ingredients = useAppSelector(state => state.constructorStore.ingredients);

  const otherIngredients = ingredients.filter((item) => item.type !== 'bun');

  const bunsCost = useMemo(
    () =>
      buns
        .map((data) => {
          return data.price;
        })
        .reduce((sum, current) => {
          return sum + current;
        }, 0),
    [buns],
  );

  const otherIngredientsCost = useMemo(
    () =>
      otherIngredients
        .map((data) => {
          return data.price;
        })
        .reduce((sum, current) => {
          return sum + current;
        }, 0),
    [otherIngredients],
  );

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const getOrder = () => {
    if ((Object.prototype.toString.call(localStorage.user) === '[object String]')) {
      dispatch(fetchOrder())
    } else {
      navigate('/login')
    }
  };

  const renderBuns = useCallback((data: TConstructorIngredients, index: number, pose: string) => {
    return (
      <ConstructorElement
        {...data}
        key={data.uuid}
        thumbnail={data.image}
        text={`${data.name} ${pose}`}
        isLocked={true}
        index={index}
        type={data.position} />
    );
  }, []);

  const renderOtherIngredients = useCallback((data: TConstructorIngredients, index: number) => {
    return (
      <ConstructorElementItem
        {...data}
        key={data.uuid}
        index={index}
        id={index}
        type={data.type} />
    );
  }, []);

  return (
    <>
      <div className={cn(style.container, 'pt-25')}>
        <div className={style.box_small}>
          {buns.map((data: TConstructorIngredients, index: number) =>
            renderBuns(data, index, "(Верх)")
          )}
        </div>

        <ol className={cn(style.box_big, 'mt-4')} ref={drop}>
          {otherIngredients.map(renderOtherIngredients)}

        </ol>

        <div className={style.box_small}>
          {buns.map((data, index) =>
            renderBuns(data, index, "(Низ)"),
          )}
        </div>

        <div className={cn(style.box__total_flex, 'pt-10 p-4')}>
          <div className={cn(style.box__total_flex, 'mr-10')}>
            <p className={cn('text', 'text_type_digits-medium', 'mr-4')}>
              {bunsCost * 2 + otherIngredientsCost}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            size="large"
            onClick={() => {
              setShowModal(true);
              getOrder();
            }}
          >
            Оформить заказ
          </Button>
        </div>

        {showModal && (
          <Modal onClose={closeModal} title={''}>
            <OrderDetails />
          </Modal>
        )}

      </div>
    </>
  );
};



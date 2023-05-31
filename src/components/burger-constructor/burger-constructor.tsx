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
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchOrder } from '../../services/reducers/order';
import { addConstructor, selectConstructorBuns, selectConstructorIngredients } from '../../services/reducers/constructor';
import { addCurrentIngredient } from '../../services/reducers/currentIngredient';
import ConstructorElementItem from '../constructor-element/constructor-element';
import { useNavigate } from 'react-router-dom';
import { TConctrElemProps } from '../../utils/prop-types';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: React.FC = () => {
  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => {
      dispatch(addConstructor(item));
      dispatch(addCurrentIngredient(item));
    },
  }));

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const buns = useSelector(selectConstructorBuns);
  const ingredients = useSelector(selectConstructorIngredients);

  const otherIngredients = ingredients.filter((item: { type: string; }) => item.type !== 'bun');

  const bunsCost = useMemo(
    () =>
      buns
        .map((data: { price: number; }) => {
          return data.price;
        })
        .reduce((sum: number, current: number) => {
          return sum + current;
        }, 0),
    [buns],
  );

  const otherIngredientsCost = useMemo(
    () =>
      otherIngredients
        .map((data: { price: number; }) => {
          return data.price;
        })
        .reduce((sum: number, current: number) => {
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

  const renderBuns = useCallback((data: TConctrElemProps, index: number, pose: string, type: "top" | "bottom") => {
    return (
      <ConstructorElement
        price={0} {...data}
        type={type}
        key={data.uuid}
        thumbnail={data.image}
        text={`${data.name} ${pose}`}
        isLocked={true}
        index={index} />
    );
  }, []);

  const renderOtherIngredients = useCallback((data: TConctrElemProps, index: number) => {
    return <ConstructorElementItem __v={0} _id={''} calories={0} carbohydrates={0} fat={0} image_large={''} image_mobile={''} proteins={0} price={0} {...data} key={data.uuid} index={index} id={index} />;
  }, []);

  return (
    <>
      <div className={cn(style.container, 'pt-25')}>
        <div className={style.box_small}>
          {buns.map((data: TConctrElemProps, index: number, pose: string, type: string) =>
            renderBuns(data, index, (pose = '(Верх)'), (type = 'top'))
          )}
        </div>

        <ol className={cn(style.box_big, 'mt-4')} ref={drop}>
          {otherIngredients.map(renderOtherIngredients)}

        </ol>

        <div className={style.box_small}>
          {buns.map((data: TConctrElemProps, i: number, pose: string, type: string) =>
            renderBuns(data, i, (pose = '(Низ)'), (type = 'bottom')),
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



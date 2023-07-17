import React, { useRef, useCallback } from 'react'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import style from './constructor-element.module.css'
import { removeConstructor, moveIngredients } from "../../services/reducers/constructor";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { TConstructorElementItemProps } from "../../utils/prop-types";
import { useAppDispatch } from '../../services/hooks';
import { removeCurrentIngredient } from '../../services/reducers/currentIngredient';

const ConstructorElementItem: React.FC<TConstructorElementItemProps> = ({ id, index, image, name, price, ...props }) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement>(null)

  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredients([dragIndex, hoverIndex]))
  }, [])

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor: DropTargetMonitor) {

      if (!ref.current) {
        return
      }

      const dragIndex: number = item.index
      const hoverIndex: number = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveElement(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))


  const onCloseClick = () => {
    dispatch(removeConstructor(props))
    dispatch(removeCurrentIngredient())
  }

  return (
    <li className={style.box_flex} ref={ref} data-handler-id={handlerId}>
      <DragIcon type={'primary'} />
      <ConstructorElement
        thumbnail={image}
        text={name}
        price={price}
        handleClose={onCloseClick}
        isLocked={false}
      />
    </li>
  )
}

export default ConstructorElementItem


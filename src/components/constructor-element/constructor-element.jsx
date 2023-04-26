import {useRef, useCallback} from 'react'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import style from './constructor-element.module.css'
import { useDispatch } from 'react-redux'
import { removeConstructor, moveIngredients } from "../../services/reducers/constructor";
import { useDrag, useDrop } from 'react-dnd';


const ConstructorElementItem = ({ id, index, image, name, price, ...props}) => {
    const dispatch = useDispatch();

    const ref = useRef(null)
    
    const moveElement = useCallback((dragIndex, hoverIndex) => {
      dispatch(moveIngredients([dragIndex, hoverIndex]))
    },[])
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
     
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect()     
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2    
      const clientOffset = monitor.getClientOffset()     
      const hoverClientY = clientOffset.y - hoverBoundingRect.top     
     
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

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

    drag(drop(ref))

  return (
    <li className={style.box_flex} ref={ref} data-handler-id={handlerId}>
        <DragIcon />
        <ConstructorElement 
            
            thumbnail={image} 
            text={name}
            price={price}
            handleClose={()=>dispatch(removeConstructor(props))}
        />
    </li>
  )
}

export default ConstructorElementItem

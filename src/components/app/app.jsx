import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import cn from 'classnames';
import { AppHeader } from "../app-header/app-header"
import { BurgerConstructor } from "../burger-constructor/burger-constructor"
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients"
import style from './app.module.css'
import { fetchIngredients } from "../../services/reducers/ingredients";


export const Application = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    return (     
        <div className={style.app}>
            <AppHeader />
            
            <main className={style.main}>
                <BurgerIngredients />
                <BurgerConstructor />
                
            </main>

      </div>    
    )
}
import React, { useEffect, useState } from "react"
import cn from 'classnames';
import { getIngredients } from "../../utils/api"
import { AppHeader } from "../app-header/app-header"
import { BurgerConstructor } from "../burger-constructor/burger-constructor"
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients"
import style from './app.module.css'


export const Application = () => {

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients().then(data => {setIngredients(data)}).catch((err)=>{console.log(err)})
    }, [ ])

    return (     
        <div className={style.app}>
            <AppHeader />
            
            <main className={style.main}>
                <BurgerIngredients ingredients={ingredients} />
                <BurgerConstructor constructorIngredients={ingredients}/>
            </main>

      </div>    
    )
}
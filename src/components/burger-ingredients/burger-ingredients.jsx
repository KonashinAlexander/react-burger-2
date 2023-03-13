import React, { useEffect, useState } from "react";
import PropTypes, { number, string } from 'prop-types';
import cn from 'classnames';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredients.module.css';
import { IngredientType } from "../ingredient-type/ingredient-type";


export const BurgerIngredients = ({ingredients}) => {

    const [current, setCurrent] = useState('buns');

    const buns = ingredients.filter (item => item.type === 'bun');
    const main = ingredients.filter (item => item.type === 'main');
    const sauce = ingredients.filter (item => item.type === 'sauce');

    function handleClickTab (tab) {
        try {
            setCurrent(tab);
            const title = document.getElementById(tab);
            if (title) title.scrollIntoView( {behavior: "smooth"} );

        } catch (err) {                        
            alert(err)
            console.log(err)   
                    
        }       
    }


    return ( 
        <div className={cn(style.container)}>
            <h1 className={cn(style.title, "text text_type_main-large", 'mt-10')}>Соберите бургер</h1>

            <section className={cn(style.tabs, 'mt-5', 'mb-10')}>               
                    <Tab value="buns" active={current === 'buns'} onClick={handleClickTab}>
                        Булки
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={handleClickTab}>
                        Начинки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={handleClickTab}>
                        Соусы
                    </Tab>                
            </section>

            <section className={cn(style.ingredients)}>
                <IngredientType title='Булки' id='buns' ingredients={buns} />
                <IngredientType title='Начинки' id='main' ingredients={main} />
                <IngredientType title='Соусы' id='sauce' ingredients={sauce} />
            </section>

            
        </div>

    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string
    })).isRequired
}

Tab.propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    onClick: PropTypes.func
}
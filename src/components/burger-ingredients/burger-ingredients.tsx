import React, { useState, useMemo, useRef } from "react";
import cn from 'classnames';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredients.module.css';
import IngredientType from "../ingredient-type/ingredient-type";
import { useGetIngredientsQuery } from "../../services/rtk/ingredients";

export const BurgerIngredients: React.FC = () => {

    const { data } = useGetIngredientsQuery('')
    const [current, setCurrent] = useState('buns');

    const buns = useMemo(() => data?.data.filter(item => item.type === 'bun'), [data?.data]);
    const main = useMemo(() => data?.data.filter(item => item.type === 'main'), [data?.data]);
    const sauce = useMemo(() => data?.data.filter(item => item.type === 'sauce'), [data?.data]);

    const primaryRef = useRef<HTMLDivElement>(null);
    const bunsRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (primaryRef && bunsRef && sauceRef && mainRef && primaryRef.current && bunsRef.current && sauceRef.current && mainRef.current) {
            const bunDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - bunsRef.current.getBoundingClientRect().top)
            const sauceDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
            const mainDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
            const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
            const currentHeader = minDistance === bunDistance
                ? 'buns' : minDistance === sauceDistance ? 'sauce' : 'main';
            setCurrent(prevState => (currentHeader === prevState ? prevState : currentHeader))
        }
    }

    function handleClickTab(tab: string) {
        try {
            setCurrent(tab);
            const title = document.getElementById(tab);
            if (title) title.scrollIntoView({ behavior: "smooth" });
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

            <div className={cn(style.ingredients)} ref={primaryRef} onScroll={handleScroll}>
                <IngredientType title='Булки' id='buns' ingredients={buns} ref={bunsRef} />
                <IngredientType title='Начинки' id='main' ingredients={main} ref={mainRef} />
                <IngredientType title='Соусы' id='sauce' ingredients={sauce} ref={sauceRef} />
            </div>

        </div>
    )
}







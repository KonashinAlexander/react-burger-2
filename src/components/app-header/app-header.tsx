import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './app-header.module.css';
import cn from 'classnames';
import { Outlet, NavLink } from "react-router-dom";
import React from 'react';


type TActive = {
    isActive: boolean
}

const setActive = ({ isActive }: TActive) => isActive ? style.link_active : style.link

export const AppHeader: React.FC = () => {

    return (
        <>
            <header className={cn(style.header, 'pt-4', 'pb-4')}>
                <nav className={style.nav}>

                    <NavLink to="/" className={setActive}>
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default ml-2 mr-2" >Конструктор</span>
                    </NavLink>
                    <NavLink to="/feed" className={setActive}>
                        <ListIcon type="secondary" />
                        <span className="text text_type_main-default ml-2" >Лента заказов</span>
                    </NavLink>
                    <Logo />

                    <NavLink to="/profile" className={setActive} >
                        <ProfileIcon type='secondary' />
                        <span className="text text_type_main-default ml-2" >Личный кабинет</span>
                    </NavLink>
                </nav>

            </header>
            <div className={style.outlet}>
                <Outlet />
            </div>
        </>
    )
}


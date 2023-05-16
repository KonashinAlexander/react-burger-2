import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './app-header.module.css';
import cn from 'classnames';
import { Link } from "react-router-dom";



export const AppHeader = () => {

    return (
        <header className={cn(style.header, 'pt-4', 'pb-4')}>
            <nav className={style.nav}>
                <div className={style.box}>
                    <a href="" className={cn(style.link, style.link_active)}>
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default ml-2 mr-2" >Конструктор</span>
                    </a>
                    <a href="" className={cn(style.link, style.link_active)}>
                        <ListIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive ml-2" >Лента заказов</span>
                    </a>

                </div>

                <Logo />
                <Link to="/profile" className={cn(style.link, style.link_active)} >
                    <ProfileIcon type='secondary' />
                    <span className="text text_type_main-default text_color_inactive ml-2" >Личный кабинет</span>
                </Link>
            </nav>
            <nav>
                <Link to="/login" className="m-4">login</Link>
                <Link to="/register" className="m-4">register</Link>
                <Link to="/forgot-password" className="m-4">forgot-password</Link>
                <Link to="/reset-password" className="m-4">reset-password</Link>
                <Link to="/profile" className="m-4">profile</Link>
                <Link to="/" className="m-4">home</Link>
            </nav>
        </header>
    )
}


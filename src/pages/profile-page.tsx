import React, { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page.module.css'
import { useNavigate, Outlet } from 'react-router-dom';
import { useLogoutUserMutation } from '../services/reducers/authApiSlice';
import { logout } from '../services/reducers/authSlice';
import { useAppDispatch } from '../services/hooks';


const ProfilePage: React.FC = () => {


    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const refreshToken = document.cookie.split(';').find(item => item.includes('refreshToken'))?.split('=')[1]
    const [logoutUser] = useLogoutUserMutation();

    const [current, setCurrent] = useState('Профиль')

    const onExitClick = async (e: React.SetStateAction<string>) => {
        setCurrent(e)
        try {
            const response = await logoutUser({ token: refreshToken }).unwrap();
            localStorage.clear();
            dispatch(logout());
            navigate('/login', { replace: true });
        } catch (err: any) {
            alert(err.data.message);
        }
    }

    const onHistoryClick = (e: React.SetStateAction<string>) => {
        setCurrent(e)
        navigate('/profile/orders', { replace: true })
    }

    const onProfileClick = (e: React.SetStateAction<string>) => {
        setCurrent(e)
        navigate('/profile', { replace: true })
    }


    return (
        <div className={style.profile}>
            <nav className={style.navigation}>
                <Tab value="Профиль" active={current === 'Профиль'} onClick={onProfileClick}>Профиль</Tab>
                <Tab value="История заказов" active={current === 'История заказов'} onClick={onHistoryClick}>История заказов</Tab>
                <Tab value="Выход" active={current === 'Выход'} onClick={onExitClick}>Выход</Tab>
                <p className="text text_type_main-small text_color_inactive mt-20">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <div className={style.profile_outlet}>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfilePage

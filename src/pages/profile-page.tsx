import React, { useState } from 'react'
import { Button, Input, PasswordInput, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page.module.css'
import { useNavigate } from 'react-router-dom';
import { getExit, getNewToken, getUserInfo, updateUserInfo } from '../utils/api';
import { TFormChange, TPreventDefault, TUser } from '../utils/prop-types';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const user: TUser = (localStorage.getItem('user')) ? JSON.parse(localStorage.user) : { name: '', email: '' }
    // const pass = document.cookie.split(';').find(item => item.includes('password')).split('=')[1]

    const [current, setCurrent] = React.useState('Профиль')
    const [form, setForm] = useState({ name: user.name, email: user.email, password: 'password' })

    const onChange = (e: TFormChange) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onExitClick = (e: React.SetStateAction<string>) => {
        setCurrent(e)
        getExit()
        localStorage.clear()
        document.cookie = "password="
        navigate('/login', { replace: true })
    }

    const handleSubmit = (e: TPreventDefault) => {
        e.preventDefault()
        updateUserInfo(form)
    }

    const onCancelClick = () => {
        setForm({ name: user.name, email: user.email, password: '' })
    }

    return (
        <>
            <nav className={style.navigation}>
                <Tab value="Профиль" active={current === 'Профиль'} onClick={setCurrent}>Профиль</Tab>
                <Tab value="История заказов" active={current === 'История заказов'} onClick={setCurrent}>История заказов</Tab>
                <Tab value="Выход" active={current === 'Выход'} onClick={onExitClick}>Выход</Tab>
                <p className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <form className={style.box} onSubmit={handleSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={form.name}
                    name='name'
                    onChange={onChange}
                    icon={'EditIcon'}
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={form.email}
                    name='login'
                    onChange={onChange}
                    icon={'EditIcon'}
                />
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                />
                <div className={style.box_small}>
                    <Button htmlType="button" type="primary" size="medium" onClick={onCancelClick}>Отмена</Button>
                    <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                </div>
                {/* <Button htmlType="button" type="primary" size="medium" onClick={() => getUserInfo()}>getUserInfo</Button>
                <Button htmlType="button" type="primary" size="medium" onClick={() => getNewToken()}>getNewToken</Button> */}

            </form>
        </>
    )
}

export default ProfilePage

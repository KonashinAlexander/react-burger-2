import React, { useState } from 'react'
import { Button, Input, PasswordInput, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page.module.css'
import { useNavigate } from 'react-router-dom';
import { getExit, getNewToken, getUserInfo } from '../utils/api';
import { useDispatch } from 'react-redux';
import { fetchUserUpdate } from '../services/reducers/user'


function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = (localStorage.user) ? JSON.parse(localStorage.user) : { name: '', email: '' }
    const pass = document.cookie.split(';').find(item => item.includes('password')).split('=')[1]

    const [current, setCurrent] = React.useState('Профиль')
    const [form, setForm] = useState({ name: user.name, email: user.email, password: pass })

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onExitClick = (e) => {
        setCurrent(e)
        getExit()
        localStorage.clear()
        document.cookie = "password="
        navigate('/login', { replace: true })
    }

    const onSaveClick = (form) => {
        dispatch(fetchUserUpdate(form))
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
                <p>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <form className={style.box}>
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
                    <Button htmlType="button" type="primary" size="medium" onClick={() => onSaveClick(form)}>Сохранить</Button>
                </div>
                {/* <Button htmlType="button" type="primary" size="medium" onClick={() => getUserInfo()}>getUserInfo</Button>
                <Button htmlType="button" type="primary" size="medium" onClick={() => getNewToken()}>getNewToken</Button> */}

            </form>
        </>
    )
}

export default ProfilePage

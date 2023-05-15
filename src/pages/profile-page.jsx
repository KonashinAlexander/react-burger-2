import React from 'react'
import { Button, Input, PasswordInput, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page.module.css'
import { Link } from 'react-router-dom';
import { getExit } from '../utils/api';

function ProfilePage() {

    const [current, setCurrent] = React.useState('Профиль')
    const [name, setName] = React.useState('')
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')
    // console.log(name, login, password)

    const onExitClick = (e) => {
        setCurrent(e)
        getExit()
    }

    return (
        <>
            <nav className={style.navigation}>
                <Tab value="Профиль" active={current === 'Профиль'} onClick={setCurrent}>Профиль</Tab>
                <Tab value="История заказов" active={current === 'История заказов'} onClick={setCurrent}>История заказов</Tab>
                <Tab value="Выход" active={current === 'Выход'} onClick={onExitClick}>Выход</Tab>
                <p>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <div className={style.box}>
                <p className="text text_type_main-medium">Вход</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    icon="EditIcon"
                    value={name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={e => setLogin(e.target.value)}
                    icon="EditIcon"
                    value={login}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
        </>
    )
}

export default ProfilePage

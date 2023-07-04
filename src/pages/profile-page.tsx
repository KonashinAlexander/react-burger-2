import React, { useState } from 'react'
import { Button, Input, PasswordInput, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page.module.css'
import { useNavigate } from 'react-router-dom';
import { TFormChange, TPreventDefault, TUser } from '../utils/prop-types';
import { useLogoutUserMutation, useUpdateUserMutation } from '../services/reducers/authApiSlice';
import { logout, setCredentials, updateCredentials } from '../services/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../services/hooks';


const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    // const user: TUser = { name: '', email: '' }
    // const user: TUser = (localStorage.getItem('user')) ? JSON.parse(localStorage.user) : { name: '', email: '' }
    const user = useAppSelector(state => state.authStore.user)
    // const user: TUser = currentUser ? currentUser : { name: '', email: '' }
    const refreshToken = document.cookie.split(';').find(item => item.includes('refreshToken'))?.split('=')[1]

    const [logoutUser] = useLogoutUserMutation();
    const [updateUser] = useUpdateUserMutation()

    const [current, setCurrent] = React.useState('Профиль')
    const [form, setForm] = useState({ name: user.name, email: user.email, password: 'password' })

    const onChange = (e: TFormChange) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onExitClick = async (e: React.SetStateAction<string>) => {
        setCurrent(e)
        await logoutUser({ token: refreshToken })
            .unwrap()
            .then(res => {
                localStorage.clear()
                logout()
                navigate('/login', { replace: true })
            })
            .catch(err => alert(err.data.message))
    }

    const onHistoryClick = (e: React.SetStateAction<string>) => {
        setCurrent(e)
        navigate('/profile/orders', { replace: true })
    }

    const handleSubmit = async (e: TPreventDefault) => {
        e.preventDefault()
        await updateUser(form)
            .unwrap()
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.user))
                dispatch(updateCredentials(res))
                navigate('/', { replace: true })
            })
            .catch(err => alert(err.data.message))
    }

    const onCancelClick = () => {
        setForm({ name: user.name, email: user.email, password: '' })
    }

    return (
        <>
            <nav className={style.navigation}>
                <Tab value="Профиль" active={current === 'Профиль'} onClick={setCurrent}>Профиль</Tab>
                <Tab value="История заказов" active={current === 'История заказов'} onClick={onHistoryClick}>История заказов</Tab>
                <Tab value="Выход" active={current === 'Выход'} onClick={onExitClick}>Выход</Tab>
                <p className="text text_type_main-small text_color_inactive mt-20">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
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
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={onCancelClick}
                        disabled={form.email === '' || form.name === '' || form.password === ''}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={form.email === '' || form.name === '' || form.password === ''}
                    >
                        Сохранить
                    </Button>
                </div>
                {/* <Button htmlType="button" type="primary" size="medium" onClick={() => getUserInfo()}>getUserInfo</Button>
                <Button htmlType="button" type="primary" size="medium" onClick={() => getNewToken()}>getNewToken</Button> */}

            </form>
        </>
    )
}

export default ProfilePage

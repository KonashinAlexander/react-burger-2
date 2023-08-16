import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react'
import style from './form.module.css'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useLogoutUserMutation, useUpdateUserMutation } from '../../services/reducers/authApiSlice';
import { TFormChange, TPreventDefault } from '../../utils/prop-types';
import { logout, updateCredentials } from '../../services/reducers/authSlice';

export const UserForm: React.FC = () => {
    console.log('ResetForm')

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.authStore.user)
    const refreshToken = document.cookie.split(';').find(item => item.includes('refreshToken'))?.split('=')[1]
    const [logoutUser] = useLogoutUserMutation();
    const [updateUser] = useUpdateUserMutation()

    const [current, setCurrent] = React.useState('Профиль')
    const [form, setForm] = useState({ name: user.name, email: user.email, password: 'password' })

    const onChange = (e: TFormChange) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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

    const content =
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

        </form>

    return content
} 
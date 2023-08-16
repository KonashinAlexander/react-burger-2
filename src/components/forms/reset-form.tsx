import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import style from './form.module.css'

import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useChangePassMutation } from '../../services/reducers/authApiSlice';
import { TFormChange, TPreventDefault } from '../../utils/prop-types';


export const ResetForm: React.FC = () => {
    console.log('ResetForm')

    const [changePass] = useChangePassMutation()

    const navigate = useNavigate();
    const { state } = useLocation()

    const handleSubmit = async (e: TPreventDefault) => {
        e.preventDefault()
        await changePass(form)
            .unwrap()
            .then(res => {
                navigate('/login', { replace: true });
            })
            .catch(err => alert(err.data?.message))
    }

    const [form, setForm] = useState({ token: '', password: '' })
    const onChange = (e: TFormChange) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    if (state !== '/forgot-password') {
        return (
            <Navigate to="/" replace />
        );
    }

    return (
        <div className={style.profile}>
            <form className={style.box} onSubmit={handleSubmit}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    extraClass="mb-2"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={form.token}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={(form.password === '' || form.token === '')}
                >
                    Сохранить
                </Button>
                <p >Вспомнили пароль?
                    <Link to='/register' className='ml-4'>Войти</Link>
                </p>

            </form>
        </div>
    )
}



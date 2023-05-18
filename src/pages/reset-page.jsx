import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import style from './page.module.css'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { changePassword } from '../utils/api';

function ResetPage() {

    const navigate = useNavigate();
    const { state } = useLocation()

    const moveToLoginPage = async (form) => {
        changePassword(form)
        navigate('/login', { replace: true });
    }

    const [form, setForm] = useState({ token: '', password: '' })
    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    if (Object.prototype.toString.call(localStorage.user) === '[object String]' || (state !== '/forgot-password')) {
        return (
            <Navigate to="/" replace />
        );
    }

    return (
        <div className={style.page}>
            <form className={style.box}>
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
                <Button htmlType="button" type="primary" size="medium" onClick={() => moveToLoginPage(form)}>Сохранить</Button>
                <p >Вспомнили пароль?
                    <Link to='/register' className='ml-4'>Войти</Link>
                </p>

            </form>
        </div>
    )
}

export default ResetPage

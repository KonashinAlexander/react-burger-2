import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import style from './page.module.css'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { getNewToken, getPasswordReset } from '../utils/api'

function ForgotPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const moveToResetPage = async () => {
        getPasswordReset(email)
        getNewToken()
        navigate('/reset-password', { replace: false });
    }

    if (Object.prototype.toString.call(localStorage.user) === '[object String]') {
        return (
            <Navigate to="/" replace />
        );
    }

    return (
        <div className={style.page}>
            <form className={style.box}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}
                    value={email}
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}

                />
                <Button htmlType="button" type="primary" size="medium" onClick={moveToResetPage}>Восстановить</Button>
                <p>Вспомнили пароль?
                    <Link to='/register' className='ml-4'>Войти</Link>
                </p>

            </form>
        </div>
    )
}

export default ForgotPage

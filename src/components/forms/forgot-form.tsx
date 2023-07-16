import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import style from './form.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useResetPassMutation } from '../../services/reducers/authApiSlice';

export const ForgotForm: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const [resetPass] = useResetPassMutation()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        await resetPass(email)
            .unwrap()
            .then(res => {
                navigate('/reset-password', { replace: true, state: '/forgot-password' });
            })
            .catch(err => alert(err.data?.message))
    }

    return (
        <div className={style.profile}>
            <form className={style.box} onSubmit={handleSubmit}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}
                    value={email}
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={email === ''}
                >
                    Восстановить
                </Button>
                <p>Вспомнили пароль?
                    <Link to='/register' className='ml-4'>Войти</Link>
                </p>

            </form>
        </div>
    )
}



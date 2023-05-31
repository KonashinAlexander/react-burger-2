import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import style from './page.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { postUserLogin } from '../utils/api';
import { TFormChange, TLoginForm, TPreventDefault } from '../utils/prop-types';

const LoginPage: React.FC = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate();

    const onChange = (e: TFormChange) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const moveToHomePage = async () => {
        if (document.cookie) {
            navigate('/', { replace: true });
        }
    }

    const handleSubmit = (e: TPreventDefault) => {
        e.preventDefault()
        loginUser(form)
    }

    const loginUser = (form: TLoginForm) => {
        postUserLogin(form)
        document.cookie = `password=${form.password}`
        moveToHomePage()
    }

    return (
        <div className={style.page}>
            <form className={style.box} onSubmit={handleSubmit}>
                <p className="text text_type_main-medium">Вход</p>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={form.email}
                    name='email'
                    onChange={onChange}
                />
                <PasswordInput
                    value={form.password}
                    name='password'
                    onChange={onChange}
                />
                <Button htmlType="submit" type="primary" size="medium">Войти</Button>
                <p>Вы - новый пользователь?
                    <Link to='/register' className='ml-4'>Зарегистрироваться</Link>
                </p>
                <p>Забыли пароль?
                    <Link to='/forgot-password' className='ml-4'>Восстановить пароль</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage
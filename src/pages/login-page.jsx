import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useSyncExternalStore } from 'react';
import style from './page.module.css'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import user, { fetchUserLogin } from '../services/reducers/user';



function LoginPage() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate();


    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const moveToHomePage = async () => {
        if (document.cookie) {
            navigate('/', { replace: true });
        }
    }

    const loginUser = form => {
        dispatch(fetchUserLogin(form));
        document.cookie = `password=${form.password}`
        moveToHomePage()
    }

    return (
        <div className={style.page}>
            <form className={style.box}>
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
                <Button htmlType="button" type="primary" size="medium" onClick={() => loginUser(form)}>Войти</Button>
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
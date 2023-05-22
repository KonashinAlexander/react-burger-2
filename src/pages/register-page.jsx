import React from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page.module.css'
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserCreate } from '../services/reducers/user';

function RegisterPage() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ name: '', email: '', password: '' })

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const registerNewUser = form => {
        dispatch(fetchUserCreate(form))
    }

    return (
        <div className={style.page}>
            <form className={style.box}>
                <p className="text text_type_main-medium">Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={form.name}
                    name='name'
                    onChange={onChange}
                />
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
                <Button htmlType="button" type="primary" size="medium" onClick={() => registerNewUser(form)}>Зарегистрироваться</Button>
                <p>Уже зарегистрированы?
                    <Link to='/login' className='ml-4'>Войти</Link></p>

            </form>
        </div>
    )
}

export default RegisterPage

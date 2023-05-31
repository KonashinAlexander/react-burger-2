import React from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../utils/api';
import { TFormChange, TPreventDefault } from '../utils/prop-types';

const RegisterPage: React.FC = () => {

    const [form, setForm] = useState({ name: '', email: '', password: '' })

    const onChange = (e: TFormChange) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: TPreventDefault) => {
        e.preventDefault()
        createUser(form)
    }

    return (
        <div className={style.page}>
            <form className={style.box} onSubmit={handleSubmit}>
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
                <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
                <p>Уже зарегистрированы?
                    <Link to='/login' className='ml-4'>Войти</Link></p>

            </form>
        </div>
    )
}

export default RegisterPage

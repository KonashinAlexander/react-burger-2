import React from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './form.module.css'

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRegisterUserMutation } from '../../services/reducers/authApiSlice';
import { TFormChange } from '../../utils/prop-types';

export const RegisterForm: React.FC = () => {
    console.log('RegisterForm')

    const navigate = useNavigate()

    const [registerUser] = useRegisterUserMutation()

    const [form, setForm] = useState({ name: '', email: '', password: '' })

    const onChange = (e: TFormChange) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        await registerUser(form)
            .unwrap()
            .then(res => {
                navigate('/login', { replace: true });
            })
            .catch(err => alert(err.data?.message))
    }

    return (
        <div className={style.profile}>
            <form className={style.box} onSubmit={handleSubmit}>
                <p className="text text_type_main-medium">Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={form.name}
                    name='name'
                    onChange={onChange}
                    required
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={form.email}
                    name='email'
                    onChange={onChange}
                    required
                />
                <PasswordInput
                    value={form.password}
                    name='password'
                    onChange={onChange}
                    required
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={(form.name === '' || form.email === '' || form.password === '')}
                >
                    Зарегистрироваться
                </Button>
                <p>Уже зарегистрированы?
                    <Link to='/login' className='ml-4'>Войти</Link></p>

            </form>
        </div>
    )
}


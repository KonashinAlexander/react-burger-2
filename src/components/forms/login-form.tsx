import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import style from './form.module.css'

import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { useLoginUserMutation } from '../../services/reducers/authApiSlice';
import { TFormChange, TPreventDefault } from '../../utils/prop-types';
import { setCredentials } from '../../services/reducers/authSlice';

export const LoginForm: React.FC = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [postLogin, { isLoading }] = useLoginUserMutation({
        fixedCacheKey: 'shared-login'
    })

    const onChange = (e: TFormChange) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: TPreventDefault) => {
        e.preventDefault()
        await postLogin(form)
            .unwrap()
            .then(res => {
                dispatch(setCredentials(res))
                localStorage.setItem('user', JSON.stringify(res.user))
                localStorage.setItem('accessToken', res.accessToken)
                document.cookie = `refreshToken=${res.refreshToken}`
                navigate('/', { replace: true })
            })
            .catch(err => alert(err.data.message))
    }

    const content = isLoading
        ? <h1>Loading...</h1>
        : <div className={style.profile}>
            <form className={style.box} onSubmit={handleSubmit}>
                <p className="text text_type_main-medium">Вход</p>
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
                    disabled={(form.password === '' || form.email === '')}
                >
                    Войти</Button>
                <p>Вы - новый пользователь?
                    <Link to='/register' className='ml-4'>Зарегистрироваться</Link>
                </p>
                <p>Забыли пароль?
                    <Link to='/forgot-password' className='ml-4'>Восстановить пароль</Link>
                </p>
            </form>
        </div>

    return content
}
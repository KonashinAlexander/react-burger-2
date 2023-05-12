import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import style from './page.module.css'
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div className={style.page}>
            <div className={style.box}>
                <p className="text text_type_main-medium">Вход</p>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}

                />
                <PasswordInput />
                <Button htmlType="button" type="primary" size="medium">Войти</Button>
                <p>Вы - новый пользователь?
                    <Link to='/register' className='ml-4'>Зарегистрироваться</Link>
                </p>
                <p>Забыли пароль?
                    <Link to='/forgot-password' className='ml-4'>Восстановить пароль</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
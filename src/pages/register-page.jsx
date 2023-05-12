import React from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page.module.css'
import { Link } from 'react-router-dom';

function RegisterPage() {
    return (
        <div className={style.page}>
            <div className={style.box}>
                <p className="text text_type_main-medium">Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}

                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={'value'}
                />
                <PasswordInput />
                <Button htmlType="button" type="primary" size="medium">Зарегистрироваться</Button>
                <p>Уде зарегистрированы?
                    <Link to='/login' className='ml-4'>Войти</Link>                </p>

            </div>
        </div>
    )
}

export default RegisterPage

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import style from './page.module.css'
import { Link } from 'react-router-dom';
import { getPasswordReset } from '../utils/api'

function ForgotPage() {
    return (
        <div className={style.page}>
            <div className={style.box}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}

                />
                <Button htmlType="button" type="primary" size="medium" onClick={getPasswordReset}>Восстановить</Button>
                <p>Вспомнили пароль?
                    <Link to='/register' className='ml-4'>Войти</Link>
                </p>

            </div>
        </div>
    )
}

export default ForgotPage

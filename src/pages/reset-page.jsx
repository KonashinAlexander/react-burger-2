import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import style from './page.module.css'
import { Link } from 'react-router-dom';

function ResetPage() {
    return (
        <div className={style.page}>
            <div className={style.box}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}

                />
                <Button htmlType="button" type="primary" size="medium">Сохранить</Button>
                <p >Вспомнили пароль?
                    <Link to='/register' className='ml-4'>Войти</Link>
                </p>

            </div>
        </div>
    )
}

export default ResetPage

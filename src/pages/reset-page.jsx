import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import style from './page.module.css'
import { Link } from 'react-router-dom';
import { changePassword } from '../utils/api';

function ResetPage() {

    const [code, setCode] = React.useState('')
    const onCodeChange = e => {
        setCode(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    return (
        <div className={style.page}>
            <div className={style.box}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={onPasswordChange}
                    value={password}
                    name={'password'}
                    extraClass="mb-2"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onCodeChange}
                    value={code}
                    name={'code'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <Button htmlType="button" type="primary" size="medium" onClick={changePassword}>Сохранить</Button>
                <p >Вспомнили пароль?
                    <Link to='/register' className='ml-4'>Войти</Link>
                </p>

            </div>
        </div>
    )
}

export default ResetPage

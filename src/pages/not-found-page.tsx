import React from 'react';
import style from './page.module.css'
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {


    return (
        <div className={style.page}>
            <div className={style.box}>
                <p className="text text_type_main-medium">
                    404
                    Страница не найдена
                </p>
                <Link to='/'>Вернуться на главную</Link>
            </div>
        </div>
    )
}

export default NotFoundPage

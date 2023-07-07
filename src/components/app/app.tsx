import React, { useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from "../app-header/app-header"
import style from './app.module.css'
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import ForgotPage from "../../pages/forgot-page";
import ResetPage from "../../pages/reset-page";
import ProfilePage from "../../pages/profile-page";
import IngredientPage from "../../pages/ingredient-page";
import NotFoundPage from "../../pages/not-found-page";
import HomePage from "../../pages/home-page";
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { removeIngredientDetails } from "../../services/reducers/ingredientDetails";
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import FeedPage from "../../pages/feed-page";
import FeedOrderPage from "../../pages/feed-order-page";
import PrivateRoute from "../protected-route/private-route";
import UnauthorizedRoute from "../protected-route/auth-route";
import { FormPage } from "../../pages/form-page";
import ProfileOrdersPage from "../../pages/profile-order-page";

export const Application: React.FC = () => {
    const dispatch: any = useAppDispatch();
    const details = useAppSelector((state) => state.detailsStore.ingredientDetails)
    const ingredient = JSON.parse(localStorage.getItem('ingredients')!)

    const closeModal = () => {
        localStorage.removeItem('ingredients')
        dispatch(removeIngredientDetails())
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={style.app}>
                <Routes>
                    <Route path="/" element={<AppHeader />}>

                        {/* public routes*/}
                        <Route index element={<HomePage />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="ingredients/:id" element={<IngredientPage />} />


                        <Route path="feed" element={<FeedPage />} />
                        <Route path="feed/:id" element={<FeedOrderPage />} />



                        {/* routes protected from authorized users*/}
                        <Route element={<UnauthorizedRoute />}>
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />
                            <Route path="forgot-password" element={<ForgotPage />} />
                            <Route path="reset-password" element={<ResetPage />} />
                        </Route>

                        {/* private routes*/}
                        <Route path="profile" element={<PrivateRoute element={<ProfilePage />} />} >
                            <Route path='' element={<PrivateRoute element={<FormPage />} />} />
                            <Route path='orders' element={<PrivateRoute element={<ProfileOrdersPage />} />} />
                        </Route>
                        <Route path="profile/orders/:id" element={<PrivateRoute element={<FeedOrderPage />} />} />


                    </Route>
                </Routes>

                {ingredient && (
                    <Modal title="Детали ингредиента" onClose={closeModal}>
                        <IngredientDetails data={ingredient} />
                    </Modal>
                )}

            </div>
        </DndProvider>
    )
}
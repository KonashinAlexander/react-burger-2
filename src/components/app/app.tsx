import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from "../app-header/app-header"
import style from './app.module.css'
import { fetchIngredients } from "../../services/reducers/ingredients";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import ForgotPage from "../../pages/forgot-page";
import ResetPage from "../../pages/reset-page";
import ProfilePage from "../../pages/profile-page";
import IngredientPage from "../../pages/ingredient-page";
import NotFoundPage from "../../pages/not-found-page";
import HomePage from "../../pages/home-page";
import ProtectedRoute from "../protected-route/protected-route";
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { removeIngredientDetails } from "../../services/reducers/ingredientDetails";
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const Application: React.FC = () => {
    const dispatch: any = useAppDispatch();
    const details = useAppSelector((state) => state.detailsStore.ingredientDetails)
    const ingredient = JSON.parse(localStorage.getItem('ingredient')!)

    const closeModal = () => {
        localStorage.removeItem('ingredient')
        dispatch(removeIngredientDetails())
    };

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={style.app}>
                <Routes>
                    <Route path="/" element={<AppHeader />}>
                        <Route index element={<HomePage />} />
                        <Route path="login" element={<ProtectedRoute element={<LoginPage />} />} />
                        <Route path="register" element={<ProtectedRoute element={<RegisterPage />} />} />
                        <Route path="forgot-password" element={<ProtectedRoute element={<ForgotPage />} />} />
                        <Route path="reset-password" element={<ProtectedRoute element={<ResetPage />} />} />
                        <Route path="profile" element={<ProtectedRoute element={<ProfilePage />} />} />
                        <Route path="ingredients/:id" element={<IngredientPage />} />
                        <Route path="*" element={<NotFoundPage />} />
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
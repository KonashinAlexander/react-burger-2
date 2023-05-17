import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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

export const Application = () => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.detailsStore.ingredientDetails)

    const closeModal = () => {
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
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="forgot-password" element={<ForgotPage />} />
                        <Route path="reset-password" element={<ResetPage />} />
                        <Route path="profile" element={<ProtectedRoute element={<ProfilePage />} />} />
                        <Route path="ingredients/:id" element={<IngredientPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>

                {(JSON.stringify(details) !== '{}') && (
                    <Modal title="Детали ингредиента" onClose={closeModal}>
                        <IngredientDetails data={details} />
                    </Modal>
                )}

            </div>
        </DndProvider>
    )
}
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppHeader } from "../app-header/app-header"
// import { BurgerConstructor } from "../burger-constructor/burger-constructor"
// import { BurgerIngredients } from "../burger-ingredients/burger-ingredients"
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

export const Application = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    return (

        <DndProvider backend={HTML5Backend}>
            <div className={style.app}>
                <AppHeader />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPage />} />
                    <Route path="/reset-password" element={<ResetPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/ingredients/:id" element={<IngredientPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

                {/* <main className={style.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main> */}
            </div>
        </DndProvider>


    )
}
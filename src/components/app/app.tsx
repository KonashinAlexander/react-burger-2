import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation } from 'react-router-dom';
import styles from './app.module.css'
import { AppHeader } from "../app-header/app-header"
import PrivateRoute from "../protected-route/private-route";
import UnauthorizedRoute from "../protected-route/auth-route";
import {
    FeedOrderPage,
    FeedPage,
    ForgotPage,
    FormPage,
    HomePage,
    IngredientPage,
    LoginPage,
    NotFoundPage,
    ProfileOrdersPage,
    ProfilePage,
    RegisterPage,
    ResetPage,
    Modal,
    ProfileSingleOrderPage,
} from '../../pages'


export const Application: React.FC = () => {
    const location = useLocation()
    const state = location.state as { backgroundLocation?: Location }
    console.log('app state >>', state)
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.app}>
                <Routes location={state?.backgroundLocation || location}>
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
                        <Route path="profile/orders/:id" element={<PrivateRoute element={<ProfileSingleOrderPage />} />} />
                    </Route>
                </Routes>

                {state?.backgroundLocation && (
                    <Routes>
                        <Route path="ingredients/:id" element={<Modal />} />
                        <Route path="feed/:id" element={<Modal />} />
                        <Route path="profile/orders/:id" element={<PrivateRoute element={<Modal />} />} />
                        <Route path="details" element={<PrivateRoute element={<Modal />} />} />
                    </Routes>
                )}


            </div>
        </DndProvider>
    )
}
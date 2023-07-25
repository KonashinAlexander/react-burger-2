import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
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
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { FeedOrderDetails } from "../feed-order-details/feed-order-details";
import { OrderDetails } from "../order-details/order-details";
import { ProfileOrderDetails } from "../feed-order-details/profile-order-details";


export const Application: React.FC = () => {
    const location = useLocation()
    const state = location.state as { backgroundLocation?: Location }

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
                        <Route element={<Modal><Outlet /></Modal>}>
                            <Route path="ingredients/:id" element={<IngredientDetails />} />
                            <Route path="feed/:id" element={<FeedOrderDetails />} />
                            <Route path="profile/orders/:id" element={<PrivateRoute element={<ProfileOrderDetails />} />} />
                            <Route path="details" element={<PrivateRoute element={<OrderDetails />} />} />
                        </Route>
                    </Routes>
                )}

            </div>
        </DndProvider>
    )
}
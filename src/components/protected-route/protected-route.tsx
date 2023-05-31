import { Navigate, useLocation } from 'react-router-dom'
import React, { FC } from 'react';

type TProtectRouteProps = {
    element: JSX.Element;
}

const ProtectedRoute: FC<TProtectRouteProps> = ({ element }) => {
    const location = useLocation()

    switch (location.pathname) {
        case '/profile':
            return (Object.prototype.toString.call(localStorage.user) === '[object String]')
                ? element
                : <Navigate to="/login" replace />
            break;

        default:
            return (Object.prototype.toString.call(localStorage.user) === '[object String]')
                ? <Navigate to="/" replace />
                : element
            break;
    }
}

export default ProtectedRoute

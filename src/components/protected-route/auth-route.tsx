import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { FC, useEffect } from 'react';
import { useAppSelector } from '../../services/hooks';
import { selectCurrentAccessToken } from '../../services/reducers/authSlice';


const UnauthorizedRoute: FC = () => {

    const currentAccessToken = useAppSelector(selectCurrentAccessToken)
    const location = useLocation()


    return (
        !currentAccessToken
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    )


    // switch (location.pathname) {
    //     case '/profile':
    //         return (Object.prototype.toString.call(localStorage.user) === '[object String]')
    //             ? element
    //             // : <Navigate to="/profile" replace />
    //             : <Navigate to="/login" replace />

    //         break;

    //     default:
    //         return (Object.prototype.toString.call(localStorage.user) === '[object String]')
    //             ? <Navigate to="/" replace />
    //             // ? <Navigate to="/profile" replace />
    //             : element
    //         break;
    // }
}

export default UnauthorizedRoute

import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { FC, useEffect } from 'react';
import { useAppSelector } from '../../services/hooks';
import { selectCurrentAccessToken } from '../../services/reducers/authSlice';

type TProtectRouteProps = {
    element: JSX.Element;
}

const PrivateRoute: FC<TProtectRouteProps> = ({ element }) => {

    const currentAccessToken = useAppSelector(selectCurrentAccessToken)
    const location = useLocation()

    return (
        currentAccessToken
            ? element
            : <Navigate to='/login' state={{ from: location }} replace />
    )



}

export default PrivateRoute

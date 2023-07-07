import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { FC, useEffect } from 'react';
import { useAppSelector } from '../../services/hooks';
import { selectCurrentAccessToken } from '../../services/reducers/authSlice';

const UnauthorizedRoute: FC = () => {

    const currentAccessToken = useAppSelector(selectCurrentAccessToken)
    const location = useLocation()
    console.log(currentAccessToken)

    return (
        !currentAccessToken
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    )
}

export default UnauthorizedRoute

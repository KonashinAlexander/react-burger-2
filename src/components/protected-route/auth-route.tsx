import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { FC } from 'react';
import { useAppSelector } from '../../services/hooks';
import { selectCurrentAccessToken } from '../../services/reducers/authSlice';

const UnauthorizedRoute: FC = () => {
    console.log('UnauthorizedRoute')

    const currentAccessToken = useAppSelector(selectCurrentAccessToken)
    const location = useLocation()

    return (
        !currentAccessToken
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    )
}

export default UnauthorizedRoute

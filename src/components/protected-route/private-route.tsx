import { Navigate, useLocation } from 'react-router-dom'
import { FC } from 'react';
import { useAppSelector } from '../../services/hooks';
import { selectCurrentAccessToken } from '../../services/reducers/authSlice';
import { useGetUserQuery } from '../../services/reducers/authApiSlice';

type TProtectRouteProps = {
    element: JSX.Element;
}

// const token = document.cookie.split('=')[1]

const PrivateRoute: FC<TProtectRouteProps> = ({ element }) => {
    // console.log(token)
    const data = useGetUserQuery('')
    const currentAccessToken = useAppSelector(selectCurrentAccessToken)
    const location = useLocation()

    return (
        currentAccessToken
            ? element
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default PrivateRoute

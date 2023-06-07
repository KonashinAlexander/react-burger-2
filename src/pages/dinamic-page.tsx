import React from 'react'
import { Outlet } from 'react-router-dom'

const DinamicRenderPage: React.FC = () => {
    return (
        <div>
            Dinamic page
            <Outlet />
        </div>
    )
}

export default DinamicRenderPage
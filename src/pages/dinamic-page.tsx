import React from 'react'
import { Outlet } from 'react-router-dom'

const DinamicRenderPage: React.FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default DinamicRenderPage
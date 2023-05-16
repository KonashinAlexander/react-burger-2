import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ element }) {

    return (Object.prototype.toString.call(localStorage.user) === '[object String]')
        ? element
        : <Navigate to="/login" replace />
}

export default ProtectedRoute
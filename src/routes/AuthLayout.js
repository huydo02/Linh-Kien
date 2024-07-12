import React from 'react'
import Login from '../assets/components/frontend/auth/Login'
import Register from '../assets/components/frontend/auth/Register'


const AuthRoute = [
    {
        name: 'login',
        path: '/login',
        component: <Login />
    },
    {
        name: 'register',
        path: '/register',
        component: <Register />
    },
]


export default AuthRoute
import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import routes from '../routes';


const AuthLayout = () => {

    const getRoutes = (routes) => {
        // console.log(routes)
        return routes.map((route) =>
            route.layout === 'auth' &&
            route.views.map((view) =>
                <Route
                    path={`/${view.path}`}
                    element={view.component}
                />
            )
        )
    }
    console.log()

    return (
        <Routes>
            {localStorage.getItem('auth_token') ?
                <Route path='/login' element={<Navigate to='/' />} />
                :
                <>
                    {getRoutes(routes)}
                    <Route path='/' element={<Navigate to='/login' replace />} />
                </>

            }
        </Routes>
    )
}

export default AuthLayout
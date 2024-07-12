import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import routes from '../routes';

const ClientLayout = () => {
    const getRoutes = (routes) => {
        return routes.map((route) =>
            route.layout === '/' &&
            route.views.map((view) =>
                <Route
                    path={`/${view.path}`}
                    element={view.component}
                />
            )
        )
    }

    return (
        <Routes>
            {getRoutes(routes)}
            <Route path='/' element={<Navigate to='/' replace />} />
        </Routes>
    )
}

export default ClientLayout
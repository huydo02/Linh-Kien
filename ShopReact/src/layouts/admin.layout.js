import React, { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import routes from '../routes';
import MasterLayout from '../assets/layouts/admin/MasterLayout';
import Dashboard from '../assets/components/admin/Dashboard';
import Footer from '../assets/layouts/admin/Footer';
import Lottie from 'lottie-react';
import loading from "./loading.json";
import axios from 'axios';
import Swal from 'sweetalert2';
const AdminLayout = () => {
    const navigate = useNavigate()
    const [loadings, setLoading] = useState(true)
    React.useEffect(() => {
        axios.get('/api/checkingAuthenticated').then(res => {
            if (res.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/admin')
                }, 1000)
            }
        }).catch(error => {
            if (error.response) {
                // console.log(123)
                if (error.response.status === 403) {
                    navigate('/page-403');
                } else if (error.response.status === 404) {
                    navigate('/page-404');
                }
            }
        });
    }, []);

    // if (role !== 'admin') return <Lottie animationData={loading} on style={{ width: 100 }} loop={true} />
    if (loadings === true) {
        return <Lottie animationData={loading} style={{ width: 100 }} loop={true} />
    } else {
        const getRoutes = (routes) => {

            return routes.map((route) =>
                route.layout === 'admin' &&
                route.views.map((view) =>
                    <Route
                        key={view.path}
                        path={`/${view.path}`}
                        element={view.component}
                    />
                )
            )
        }

        return (
            <div>
                <Routes>
                    {getRoutes(routes)}
                    <Route path='/' element={<Navigate to='/admin/dashboard' />} />
                </Routes>
                {/* </div> */}

            </div>


        )
    }
}


export default AdminLayout
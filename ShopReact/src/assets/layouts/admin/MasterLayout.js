import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AdminLayout from '../../../layouts/admin.layout';
import { useNavigate } from 'react-router-dom'
import loadingRouteAdmin from "./loadingRouteAdmin.json";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';
// import '../../../assets/admin/css/styles.css'
import Lottie from 'lottie-react';
import CryptoJS from 'crypto-js';



const MasterLayout = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');

        setIsAdmin(role);

        const timeout = setTimeout(() => {
            if (role !== 'admin') {
                navigate('/');
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        //đoạn code này chạy trước thằng useEffect
        <div className="sb-nav-fixed">
            {isAdmin !== 'admin' ? (
                <Lottie animationData={loadingRouteAdmin} style={{ width: 100 }} loop={true} />

            ) : (
                <>
                    <Navbar />
                    <div id="layoutSidenav">
                        <div id="layoutSidenav_nav">
                            <Sidebar />
                        </div>
                        <div id="layoutSidenav_content">
                            <main>
                                <div className="container-fluid px-4">
                                    {<AdminLayout />}
                                </div>
                            </main>
                            <Footer />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default MasterLayout;

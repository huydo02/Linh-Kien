import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom'
const Navbar = () => {
    const [isLogged, setIsLogged] = useState(localStorage.getItem('auth_token') ?? false);

    const logoutHandler = () => {
        axios.post('/api/logout',).then(res => {
            // console.log(localStorage.setItem('auth_token'))
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('role')
                localStorage.removeItem('user')

                setIsLogged(!isLogged)
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: res.data.message,
                    // footer: '<a href="#">Why do I have this issue?</a>'
                });

            }
        })
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  bg-logo shadow sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Shop Technology</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="!false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {isLogged ? (
                                <li className='nav-item'>
                                    <button type='button' onClick={logoutHandler} className='nav-link btn btn-danger btn-sm text-bg-white'>Logout</button>
                                </li>
                            ) : (
                                <ul className='navbar-nav'>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/auth/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/auth/register" >Register</Link>
                                    </li>
                                </ul>
                            )}
                            {/* <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                </ul>
                            </li> */}

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
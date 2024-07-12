import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { useCart } from '../../components/home/cart/CartContext';
// import { useCart } from './CartContext';

const NavbarClien = () => {
    const [isLogged, setIsLogged] = useState(localStorage.getItem('auth_token') ?? false);
    // const [quantity, setQuantity] = useState(0);
    const { quantity } = useCart();
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
                    // footer: '<Link to="#">Why do I have this issue?</Link>'
                });

            }
        })
    }
    // console.log(quantity);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand text-logo" to="/">Shop Technology</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/best-laptop-news">News</Link></li>
                        {isLogged ? (
                            <>
                                <li className="nav-item text-"><Link className="nav-link" to='/history' >Purchase History</Link></li>
                                <li className="nav-item text-"><Link className="nav-link" onClick={logoutHandler} >Logout</Link></li>

                            </>

                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/auth/Login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/auth/register">Register</Link></li>
                            </>
                        )}


                    </ul>
                    <form className="d-flex">
                        <Link to='/list-cart'>
                            <button className="btn btn-outline-dark" type="submit">
                                <i className="bi-cart-fill me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">{quantity}</span>
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default NavbarClien
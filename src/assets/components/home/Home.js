import React from 'react'

import { Link } from 'react-router-dom'
import NavbarClien from '../../layouts/frontend/NavbarClien'
import Footer from './footer/footer'
import ListHome from './list_home'
import ClientLayout from '../../../layouts/client.layout'
import { CartProvider } from './cart/CartContext'
import { TotalProvider } from './context/TotalContext'
import Head from './headlogo/head'


const Home = () => {
    // console.log('123')
    return (
        <>
            <div>
                {/* <!-- Navigation--> */}
                <CartProvider>
                    <TotalProvider>
                        <NavbarClien />
                        {/* <!--content--> */}
                        <Head />

                        <ClientLayout />
                        {/* <!--footer--> */}
                        <Footer />
                    </TotalProvider>
                </CartProvider>
            </div >
        </>
    )
}

export default Home
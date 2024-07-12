// CartContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // const [cartQuantity, setCartQuantity] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const updateCartQuantity = async () => {
        setQuantity(quantity + 1);

    };
    const checkOutCartQuantity = async () => {
        setQuantity([]);

    };
    const deleteCartQuantity = async () => {
        setQuantity(quantity - 1);

    };
    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.get(`/api/quantity-cart`);
                if (response.data.status === 200) {
                    setQuantity(parseInt(response.data.quantity))
                    // setLoading(false)

                }
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [quantity])
    return (
        <CartContext.Provider value={{ checkOutCartQuantity, updateCartQuantity, quantity, deleteCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

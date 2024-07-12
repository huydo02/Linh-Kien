// CartContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
// export const CartContext = createContext();
export const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
    // const [cartQuantity, setCartQuantity] = useState(0);
    // const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const updateTotal = async () => {
        setTotal(total)

    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {

    //             const encryptedUser = localStorage.getItem('auth_name'); // Lấy dữ liệu đã mã hóa từ localStorage
    //             const bytes = CryptoJS.AES.decrypt(encryptedUser, 'auth_name'); // Giải mã dữ liệu
    //             const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // Chuyển đổi dữ liệu về dạng ban đầu

    //             const response = await axios.get(`/api/quantity-cart/${decryptedUser}`);
    //             if (response.data.status === 200) {
    //                 setQuantity(parseInt(response.data.quantity))
    //                 // setLoading(false)

    //             }
    //             // }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     fetchData();
    // }, [quantity])
    return (
        <TotalContext.Provider value={{ updateTotal, total }}>
            {children}
        </TotalContext.Provider>
    );
};

export const useTotal = () => {
    const context = useContext(TotalContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

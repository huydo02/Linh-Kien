import axios from 'axios'
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loadingRouteAdmin from "../loadingRouteAdmin.json";
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { useCart } from './CartContext';
// import { useNavigate } from 'react-router-dom'
const Cart = () => {

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState();
    const { deleteCartQuantity } = useCart();
    const [total, setTotal] = useState();
    const { quantity, checkOutCartQuantity } = useCart();
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('/api/list-category');
                // if (response.data.status === 200) {
                // Chuyển đổi dữ liệu về dạng ban đầu
                const response = await axios.get(`/api/num-cart`);
                if (response.data.status === 200) {
                    setCart(response.data.value)
                    setLoading(false)

                }
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    const delete_product = async (e, id) => {
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting';

        try {
            const response = await axios.get(`/api/delete-cart/${id}`);
            if (response.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,

                }).then(() => {
                    // Nếu thành công, cập nhật giỏ hàng mà không cần reload trang
                    deleteCartQuantity(); // Cập nhật giỏ hàng với số lượng mới

                });
                // Xóa sản phẩm khỏi danh sách hiện tại
                setCart(cart.filter(item => item.id !== id));
                deleteCartQuantity()
            } else if (response.data.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,

                }).then(() => {

                    navigate('/')
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            thisClicked.innerText = 'Delete';
        }
    };
    // const checkout = () => {

    // }
    useEffect(() => {
        if (cart && cart.length > 0) {
            const total = calculateTotal();
            setTotal(total);
        }
    }, [cart]);

    const calculateTotal = () => {
        let total = 0;
        if (cart && cart.length > 0) {
            cart.forEach(item => {
                total += item.quantity * item.price;
            });
        }
        return total;
    };
    const checkout = () => {

        console.log('Total value:', total);
        const formData = new FormData();
        formData.append("total", total);
        formData.append("quantity_purchased", quantity);
        axios.get('/sanctum/csrf-cookie').then(response => {
            // Sau khi cookie CSRF được thiết lập, gửi yêu cầu POST
            axios.post(`/api/add-history-cart`, formData).then(res => {

                if (res.data.status === 200) {
                    setCart([])
                    checkOutCartQuantity()
                    // deleteCartQuantity()
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: res.data.message,
                    });
                    // Navigate('/admin/list-category')
                } else if (res.data.status === 404) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.data.message,
                    });
                }

            })
        });
    };
    return (
        <div>

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row ">
                        {loading ? (
                            <Lottie animationData={loadingRouteAdmin} style={{ width: 100 }} loop={true} />
                        ) : (
                            cart ? (<div className="container p-3 rounded cart">
                                <div className="row no-gutters">
                                    <div className="col-md-8">
                                        <div className="product-details mr-2">
                                            <div className="d-flex flex-row align-items-center"><i className="fa fa-long-arrow-left"></i><span className="ml-2">Continue Shopping</span></div>
                                            <hr />
                                            <h6 className="mb-0">Shopping cart</h6>
                                            <div className="d-flex justify-content-between"><span>You have {quantity} items in your cart</span>
                                                <div>Quantity</div>

                                                <div className="d-flex flex-row align-items-center"><span className="text-black-50">Sort by:</span>
                                                    <div className="price ml-2"><span className="mr-1">price</span><i className="fa fa-angle-down"></i></div>

                                                </div>
                                                <div className="price ml-2"><span className="mr-1">Delete Cart</span><i className="fa fa-angle-down"></i></div>

                                            </div>
                                            {
                                                cart.map((value) => (
                                                    <div key={value.id} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                                                        <div className="d-flex flex-row">

                                                            <img className="rounded" src={`http://localhost:8000/uploads/imgProducts/${value.brand_card.split(',')[0].trim()}`} alt="..." width="40" />
                                                            <div className="ml-2" style={{ marginLeft: '10px' }}>
                                                                <span className="font-weight-bold d-block">{value.name_company_card}</span>
                                                                <span className="spec">{value.name_card}</span></div>
                                                        </div>
                                                        <div><span className="d-block">{value.quantity}</span></div>
                                                        <div className="d-flex flex-row align-items-center"><span className="d-block ml-5 font-weight-bold">{value.price}</span><i className="fa fa-trash-o ml-3 text-black-50"></i></div>
                                                        <div><button type='button' onClick={(e) => delete_product(e, value.id)} className='btn btn-danger btn-sm'>delete</button></div>

                                                    </div>))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="payment-info">
                                            <div className="d-flex justify-content-between align-items-center"><span>Card details</span></div><label className="radio">  </label>

                                            <hr className="line" />

                                            <div className="d-flex justify-content-between information">
                                                <span>Total Price</span><span>{calculateTotal()}</span>
                                            </div>
                                            {/* <Link to=" "> */}
                                            <button className="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button"
                                                onClick={(e) => checkout(e,)}>
                                                <span></span><span>Checkout<i className="fa fa-long-arrow-right ml-1"></i></span>
                                            </button>
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>) : (
                                <h1>No data availble</h1>
                            )


                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart
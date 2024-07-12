import axios from 'axios'
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import loadingRouteAdmin from "../loadingRouteAdmin.json";
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import SwiperCore, { Swiper as SwiperType } from 'swiper';
import Swal from 'sweetalert2';
import NavbarClien from '../../../layouts/frontend/NavbarClien';
import { useCart } from '../cart/CartContext';

const DetailProduct = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState('')
    const [relatedProduct, setRelatedProduct] = useState('')
    const [quantity, setQuantity] = useState(1);
    const { updateCartQuantity } = useCart();
    // const [cartQuantity, setCartQuantity] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/product-detail/${id}`);
                if (response.data.status === 200) {
                    setShowDetail(response.data.value)
                    setRelatedProduct(response.data.related_product)

                    setLoading(false)

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id])

    const addToCard = async (e, id) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append("id", id);
        formData.append("quantity", quantity);

        try {
            await axios.get('/sanctum/csrf-cookie');
            const res = await axios.post(`/api/list-card`, formData);

            if (res.data.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: res.data.message,
                }).then(() => {
                    // Nếu thành công, cập nhật giỏ hàng mà không cần reload trang
                    updateCartQuantity(); // Cập nhật giỏ hàng với số lượng mới

                });
            } else if (res.data.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.message,
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.message,
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <Lottie animationData={loadingRouteAdmin} style={{ width: 100 }} loop={true} />

            ) : (showDetail ? (
                <section className="py-5" >
                    <div className="container px-4 px-lg-5 my-5">
                        <div className="row gx-4 gx-lg-5 align-items-center">
                            <div className="col-md-6">

                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Autoplay, Pagination, Navigation]}
                                // onSwiper={(swiper) => console.log(swiper)}
                                >
                                    {showDetail.image.split(',').map((imageItem, index) => (
                                        <SwiperSlide key={index}><img style={{ width: '100%', height: '100%' }}
                                            src={`http://localhost:8000/uploads/imgProducts/${imageItem}`}
                                            alt={index} /></SwiperSlide>

                                    ))}
                                    {/* <SwiperSlide ><img style={{ width: '100%', height: '100%' }} src='https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2020/06/chuot-gaming-anh-bia-1.jpg' alt='' /></SwiperSlide> */}

                                </Swiper>
                                {/* <img className="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..." /> */}
                            </div>
                            <div className="col-md-6">
                                <div className="small mb-1"> {showDetail.content}</div>
                                <h1 className="display-5 fw-bolder">{showDetail.name_product}</h1>
                                <div className="fs-5 mb-5">
                                    <span className="text-muted text-decoration-line-through">{showDetail.price}đ</span>
                                    {/* <span className="text-muted text-decoration-line-through">$50.00</span> */}

                                    <span><p className='text-danger'>{showDetail.price_discount}đ</p></span>
                                </div>
                                <p className="lead">{showDetail.description}</p>
                                <div className="d-flex">
                                    {/* <input className="form-control text-center me-3" id="inputQuantity" type="num" value="1" style={{ maxWidth: '3rem' }} /> */}
                                    <input
                                        className="form-control text-center me-3"
                                        id="inputQuantity"
                                        type="number"
                                        min={1}
                                        max={9}
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        style={{ maxWidth: '3rem' }}
                                    />

                                    <div className="text-center"><Link className="btn btn-outline-dark mt-auto" onClick={(e) => addToCard(e, showDetail.id)}>Add to cart</Link></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <h1>No data available</h1>
            )
            )}

            {loading ? (
                <Lottie animationData={loadingRouteAdmin} style={{ width: 100 }} loop={true} />
            ) : (
                <section className="py-5 bg-light">
                    <div className="container px-4 px-lg-5 mt-5">
                        <h2 className="fw-bolder mb-4">Related products</h2>
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            {relatedProduct && relatedProduct.map((relatedProductItem) => (

                                <div className="col mb-5" key={relatedProductItem.id}>
                                    <div className="card h-100">
                                        {/* <!-- Sale badge--> */}
                                        <div className="badge bg-dark text-white position-absolute"
                                            style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                                        {/* <!-- Product image--> */}
                                        <img className="card-img-top" src={`http://localhost:8000/uploads/imgProducts/${relatedProductItem.image.split(',')[0].trim()}`} alt="..." />
                                        {/* <!-- Product details--> */}
                                        <div className="card-body p-4">
                                            <div>
                                                {/* <!-- Product name--> */}
                                                <h5 className="fw-bolder">{relatedProductItem.id_company}</h5>
                                                <p className="card-text mb-0">{relatedProductItem.name_product}</p>

                                                {/* <!-- Product price--> */}
                                                <h6 className='text-danger'>Price</h6>
                                                <span className="text-muted text-decoration-line-through">{relatedProductItem.price}đ</span>
                                                <span className="text-danger"><p>{relatedProductItem.price_discount}đ</p>
                                                </span>

                                            </div>
                                        </div>
                                        {/* <!-- Product actions--> */}
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center"><Link className="btn btn-outline-dark mt-auto" href="#">Add to cart</Link></div>
                                        </div>
                                    </div>
                                </div>


                            ))}
                        </div>
                    </div>
                </section>
            )}

        </div>
    )
}

export default DetailProduct
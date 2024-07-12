// < !--Page Content-- >
import axios from 'axios'
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import loadingRouteAdmin from "../loadingRouteAdmin.json";
import { useParams } from 'react-router-dom'

const ListProduct = () => {
    const { company } = useParams()
    const [loading, setLoading] = useState(true);
    const [showProduct, setShowProduct] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/list-products/${company}`);
                if (response.data.status === 200) {
                    setShowProduct(response.data.value)
                    setLoading(false)

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [company])
    // console.log(company);
    return (
        <div>

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {loading ? (
                            <Lottie animationData={loadingRouteAdmin} style={{ width: 100 }} loop={true} />
                        ) : (

                            showProduct && showProduct.length > 0 ? (
                                showProduct.map((item) => (
                                    <div className="col mb-5" key={item.id}>
                                        <div className="card h-100">
                                            {/* <!-- Sale badge--> */}
                                            {item.price_discount && (
                                                <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                                                    Sale
                                                </div>
                                            )}
                                            {/* <!-- Product image--> */}
                                            <img className="card-img-top" src={`http://localhost:8000/uploads/imgProducts/${item.image.split(',')[0].trim()}`} alt={item.name_product} />
                                            {/* <img className="card-img-top" src={`http://localhost:8000/uploads/imgProducts/${item.image}`} alt="..." /> */}
                                            {/* <!-- Product details--> */}
                                            <div className="card-body p-4">
                                                <div className="text-center">
                                                    {/* <!-- Product name--> */}
                                                    <Link className='text-decoration-none link-dark stretched-link' to={`/list-products/detail/${item.id}`}><h5 className="fw-bolder">{item.name_product}</h5></Link>
                                                    {/* <!-- Product price--> */}
                                                    <span className="text-muted text-decoration-line-through me-1">{item.price}</span>

                                                    <p className='text-danger'>{item.price_discount}</p>
                                                </div>
                                            </div>
                                            {/* <!-- Product actions--> */}
                                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <div className="text-center"><Link className="btn btn-outline-dark mt-auto" href="#">Add to cart</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>No data available</h1>
                            )
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListProduct

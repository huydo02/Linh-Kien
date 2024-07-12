import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay, Navigation, EffectCube, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Swiper as SwiperType } from 'swiper';
import CategoryHomeItems from './ListCategoryItem/CategoryHomeItems';
import Head from './headlogo/head';
SwiperCore.use([]);
const ListHome = () => {
    return (
        <>
            <section className="py-5">
                <div className="container px-5">
                    {/* <h1 className="fw-bolder fs-5 mb-4">Company Blog</h1> */}
                    <div className="card border-0 shadow rounded-3 overflow-hidden">
                        <div className="card-body p-0">
                            <div className="row gx-0">
                                <Swiper
                                    effect={'cube'}
                                    grabCursor={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    cubeEffect={{
                                        shadow: true,
                                        slideShadows: true,
                                        shadowOffset: 20,
                                        shadowScale: 0.94,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Autoplay, EffectCube, Pagination]}
                                // onSwiper={(swiper) => console.log(swiper)}
                                >
                                    <SwiperSlide ><img style={{ width: '100%', height: '100%' }} src='https://benhviencongnghe88.vn/media/news/0812_DSC08032.jpg' alt='' /></SwiperSlide>
                                    <SwiperSlide ><img style={{ width: '100%', height: '100%' }} src='https://www.lg.com/vn/images/laptops/md07575252/gallery/D3.jpg' alt='' /></SwiperSlide>
                                    <SwiperSlide ><img style={{ width: '100%', height: '100%' }} src='https://limosa.vn/wp-content/uploads/2023/06/Nguon-goc-cua-tai-nghe-JBL.jpg' alt='' /></SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 bg-light">
                <div className="container px-5">
                    <div className="row gx-5">
                        <div className="col-xl-8">
                            <h2 className="fw-bolder fs-5 mb-4 text-danger">News</h2>


                            <div className="mb-5">
                                <div className="small text-muted">Sale</div>
                                <Link className="link-dark" to="/best-laptop-news"><h3>Best Laptop Sale% in December <i class="bi bi-fire"></i></h3></Link>

                            </div>

                            <div className="text-end mb-5 mb-xl-0">
                                {/* <Link className="text-decoration-none" href="#!">
                                    More news
                                    <i className="bi bi-arrow-right"></i>
                                </Link> */}
                            </div>
                        </div>
                        <div className="col-xl-4" >
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src="https://magenticians.com/wp-content/uploads/2017/08/ecommecre-sales.jpg" alt="" />

                        </div>
                    </div>
                </div>
            </section>
            {/* <!--Blog preview section-- > */}
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4 text-logo">Categories</h2>
                    <div className="row gx-5">

                        <CategoryHomeItems />
                    </div>
                    {/* <div className="text-end mb-5 mb-xl-0">
                        <Link className="text-decoration-none" href="#!">
                            More stories
                            <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default ListHome
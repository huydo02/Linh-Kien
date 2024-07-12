import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            {/* <!-- Footer--> */}

            <footer className="py-5 bg-logo">
                <div className="container ">
                    <div className="row text-white">
                        <div className="col text-left">
                            <h3>ABOUT US</h3>
                            <p><i className="bi bi-person me-1"></i>Do Quoc Huy</p>
                            <p><i className="bi bi-person me-1"></i>Cao Ba Tuong</p>
                            <p><i className="bi bi-person me-1"></i>Nguyen Xuan Thanh Dat</p>

                        </div>
                        <div className="col">
                            <h3>ADDRESS</h3>
                            <p><i className="bi bi-geo-alt me-1"></i> 430 VietHan University</p>

                        </div>
                        <div className="col">
                            <h3>SUPPORT</h3>
                            {/* <Link className=' text-mute' to='https://www.facebook.com/profile.php?id=100039298122681&mibextid=LQQJ4d'>facebook</Link> */}
                            <Link className="link-dark text-white d-flex" to='https://www.facebook.com/profile.php?id=100039298122681&mibextid=LQQJ4d'><i className="bi bi-facebook me-1"></i><p>Facebook</p></Link>
                            <Link className="link-dark text-white d-flex" to='https://www.youtube.com/channel/UCVgnEqTCFKk2kO5TuEf-Umw'><i className="bi bi-youtube me-1"></i><p>Facebook</p></Link>
                            <p><i className="bi bi-phone me-1"></i>0399921431</p>
                        </div>
                        <div className="col">
                            <h3>PAYMENT</h3>
                            <p><i className="bi bi-wallet2 me-1"></i>TPbank: 0399921431</p>

                        </div>
                    </div>
                </div>
            </footer>

            {/* <!-- Bootstrap core JS--> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/* <!-- Core theme JS--> */}
            <script src="js/scripts.js"></script>
        </div>
    )
}

export default Footer
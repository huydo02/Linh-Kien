import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Sidebar = () => {

    // const [isShowCategory, setShowCategory] = useState(false)

    // const toggleLayouts = () => {
    //     setShowCategory(!isShowCategory);
    // };
    // console.log(isShowCategory)
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link className="nav-link" to='/admin/dashboard'>
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link" to='/admin/add-product'>
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add Product
                    </Link>
                    <Link className="nav-link" to='/admin/category'>
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add Category
                    </Link>
                    <Link className="nav-link" to='/admin/list-category'>
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        List Category
                    </Link>
                    <Link className="nav-link" to='/admin/list-products'>
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        List Products
                    </Link>
                    <div className="sb-sidenav-menu-heading">Interface</div>
                    <Link className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseLayouts"
                        aria-expanded="false"
                        aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-static.html">Static Navigation</a>
                            <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                        </nav>
                    </div>
                    <Link className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Pages
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link className="nav-link collapsed" to={'/admin'} data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                Authentication
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="login.html">Login</a>
                                    <a className="nav-link" href="register.html">Register</a>
                                    <a className="nav-link" href="password.html">Forgot Password</a>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to={'/admin'} data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Error
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="401.html">401 Page</a>
                                    <a className="nav-link" href="404.html">404 Page</a>
                                    <a className="nav-link" href="500.html">500 Page</a>
                                </nav>
                            </div>
                        </nav>
                    </div>
                    <div className="sb-sidenav-menu-heading">Addons</div>
                    <a className="nav-link" href="charts.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                        Charts
                    </a>
                    <a className="nav-link" href="tables.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                        Tables
                    </a>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    );
}

export default Sidebar;
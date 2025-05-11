import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/plainb-logo.svg";
import useProductStore from "../../store/ProductStore.jsx";
import UserStore from "../../store/UserStore.jsx";
import UserSubmitButton from "../user/UserSubmitButton.jsx";
import CartStore from "../../store/CartStore.jsx";
import wishStore from "../../store/WishStore.jsx";

const AppNavBar = () => {
    const navigate = useNavigate();
    const { SearchKeyword, SetSearchKeyword } = useProductStore();
    const { isLogin, UserLogoutRequest } = UserStore();
    const { CartCount, CartListRequest } = CartStore();
    const { WishListRequest, WishCount } = wishStore();

    const onLogout = async () => {
        await UserLogoutRequest();
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        (async () => {
            if (isLogin()) {
                await CartListRequest();
                await WishListRequest();
            }
        })();
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="bg-dark text-light py-2">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Contact Info */}
                        <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                            <small>
                                <i className="bi bi-envelope me-2"></i> support@planb.com
                                <span className="ms-4"><i className="bi bi-phone me-2"></i> 01772595651</span>
                            </small>
                        </div>

                        {/* Social Icons */}
                        <div className="col-md-6 text-center text-md-end">
                            <a href="#" className="text-light me-3"><i className="bi bi-whatsapp"></i></a>
                            <a href="#" className="text-light me-3"><i className="bi bi-youtube"></i></a>
                            <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
                        </div>
                    </div>
                </div>
            </div>


            {/* Main Navbar */}
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark sticky-top shadow-sm py-3">
                <div className="container">
                    {/* Logo */}
                    <Link className="navbar-brand fw-bold text-uppercase" to="/">
                        <img src={logo} alt="Logo" width="80" className="me-2"/>
                        PlanB
                    </Link>

                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Content */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* Center Links */}
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex gap-2">
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-white px-3 rounded bg-secondary">
                                    <i className="bi bi-house-door-fill me-1"></i> Home
                                </Link>
                            </li>
                            <li className="nav-item position-relative">
                                <Link to="/cart"
                                      className="nav-link text-white px-3 rounded bg-success position-relative">
                                    <i className="bi bi-bag-fill me-1"></i> Cart
                                    {CartCount > 0 && (
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge bg-light text-dark">
                {CartCount}
              </span>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item position-relative">
                                <Link to="/wish"
                                      className="nav-link text-white px-3 rounded bg-warning position-relative">
                                    <i className="bi bi-heart-fill me-1"></i> Wish
                                    {WishCount > 0 && (
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge bg-dark text-white">
                {WishCount}
              </span>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/orders" className="nav-link text-white px-3 rounded bg-info">
                                    <i className="bi bi-truck me-1"></i> Orders
                                </Link>
                            </li>
                        </ul>

                        {/* Search and Auth */}
                        <div className="d-flex flex-column flex-lg-row align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
                            {/* Search */}
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control rounded-start"
                                    placeholder="Search"
                                    onChange={(e) => SetSearchKeyword(e.target.value)}
                                />
                                <Link
                                    to={SearchKeyword.length > 0 ? `/by-keyword/${SearchKeyword}` : `/`}
                                    className="btn btn-dark rounded-end"
                                >
                                    <i className="bi bi-search"></i>
                                </Link>
                            </div>

                            {/* Auth Buttons */}
                            {isLogin() ? (
                                <>
                                    <UserSubmitButton
                                        onClick={onLogout}
                                        text="Logout"
                                        className="btn btn-outline-light px-4"
                                    />
                                    <Link to="/profile" className="btn btn-light text-dark px-4">
                                        Profile
                                    </Link>
                                </>
                            ) : (
                                <Link to="/login" className="btn btn-light text-dark px-4">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

        </>


    );
};

export default AppNavBar;

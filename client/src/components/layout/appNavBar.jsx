import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/plainb-logo.svg";
import useProductStore from "../../store/ProductStore.jsx"; // Correct import

const AppNavBar = ({ CartCount, WishCount }) => {
    const { SearchKeyword, SetSearchKeyword } = useProductStore(); // Correct state retrieval

    return (
        <>
            {/* Top Bar */}
            <div className="container-fluid text-white p-2 bg-success">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="col-md-6">
                            <span>
                                <span className="f-12">
                                    <i className="bi bi-envelope"></i> Support@PlanB.com
                                </span>
                                <span className="f-12 mx-2">
                                    <i className="bi bi-envelope"></i> 01772595651
                                </span>
                            </span>
                        </div>
                        <div className="col-md-6">
                            <span className="float-end">
                                <span className="bodySmal mx-2">
                                    <i className="bi bi-whatsapp"></i>
                                </span>
                                <span className="bodySmal mx-2">
                                    <i className="bi bi-youtube"></i>
                                </span>
                                <span className="bodySmal">
                                    <i className="bi bi-facebook"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="navbar sticky-top bg-white navbar-expand-lg navbar-light py-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img className="img-fluid" src={logo} alt="Logo" width="96px" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#nav06"
                        aria-controls="nav06"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="nav06">
                        <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
                            <li className="nav-item me-4">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Search Bar */}
                    <div className="d-lg-flex">
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                onChange={(e) => SetSearchKeyword(e.target.value)} // Update Zustand state
                                aria-label="Search"
                            />
                            <Link
                                to={SearchKeyword.length > 0 ? `/by-keyword/${SearchKeyword}` : `/`}
                                className="btn btn-outline-dark"
                            >
                                <i className="bi bi-search"></i>
                            </Link>
                        </div>

                        <Link to="/cart" className="btn ms-2 btn-light position-relative">
                            <i className="bi text-dark bi-bag"></i>
                            {CartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                    {CartCount}
                                </span>
                            )}
                        </Link>

                        <Link to="/wish" className="btn ms-2 btn-light d-flex">
                            <i className="bi text-dark bi-heart"></i>
                            {WishCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                                    {WishCount}
                                </span>
                            )}
                        </Link>

                        <Link type="button" className="btn ms-3 btn-success d-flex" to="/profile">Profile</Link>
                        <Link type="button" className="btn ms-3 btn-success d-flex" to="/logout">Logout</Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AppNavBar;

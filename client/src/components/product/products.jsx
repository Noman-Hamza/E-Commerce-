import React from 'react';
import ProductStore from "../../store/ProductStore.jsx"
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {Link} from "react-router-dom";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
const Products = () => {
    const {ProductListByRemark,ProductListByRemarkRequest}=ProductStore();
    return (
        <div className="section bg-light py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-6 fw-bold text-primary mb-2">Our Products</h1>
                    <p className="text-secondary fs-6">Explore a World of Choices Across Our Most Popular Categories</p>
                </div>

                <ul className="nav nav-pills justify-content-center mb-4 flex-wrap gap-2" id="pills-tab" role="tablist">
                    {['new', 'trending', 'popular', 'top', 'special'].map((remark, index) => (
                        <li className="nav-item" key={remark} role="presentation">
                            <button
                                onClick={() => ProductListByRemarkRequest(remark)}
                                className={`nav-link px-4 py-2 rounded-pill fw-semibold ${
                                    index === 0 ? 'active bg-primary text-white' : 'bg-white border text-dark'
                                }`}
                                id={`pills-${remark}-tab`}
                                data-bs-toggle="pill"
                                data-bs-target={`#pills-${remark}`}
                                type="button"
                                role="tab"
                                aria-controls={`pills-${remark}`}
                                aria-selected={index === 0 ? 'true' : 'false'}
                            >
                                {remark.charAt(0).toUpperCase() + remark.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="tab-content" id="pills-tabContent">
                    {['new', 'trending', 'popular', 'top', 'special'].map((remark, index) => (
                        <div
                            className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                            id={`pills-${remark}`}
                            role="tabpanel"
                            aria-labelledby={`pills-${remark}-tab`}
                            tabIndex="0"
                            key={remark}
                        >
                            {ProductListByRemark === null ? (
                                <ProductsSkeleton/>
                            ) : (
                                <div className="row g-4">
                                    {ProductListByRemark.map((item, i) => {
                                        const price = item.discount ? (
                                            <p className="mb-1 text-danger fw-semibold">
                                                Price: <del
                                                className="text-muted">${item.price}</del> ${item.discountPrice}
                                            </p>
                                        ) : (
                                            <p className="mb-1 text-dark fw-semibold">Price: ${item.price}</p>
                                        );

                                        return (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item._id}>
                                                <Link to={`/details/${item._id}`}
                                                      className="card border-0 h-100 shadow-sm rounded-4 text-decoration-none hover-shadow">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="card-img-top rounded-top-4 object-fit-cover"
                                                        style={{height: '220px', objectFit: 'cover'}}
                                                    />
                                                    <div className="card-body">
                                                        <p className="text-secondary small mb-1">{item.title}</p>
                                                        {price}
                                                        <StarRatings
                                                            rating={parseFloat(item.star)}
                                                            starRatedColor="gold"
                                                            starDimension="16px"
                                                            starSpacing="1px"
                                                        />
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default Products;
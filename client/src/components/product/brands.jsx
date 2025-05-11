import React from 'react';
import ProductStore from "../../store/ProductStore.jsx";
import BrandsSkeleton from "../../skeleton/brands-skeleton.jsx";
import {Link} from "react-router-dom";

const Brands = () => {
    const {BrandList}=ProductStore();

    if(BrandList===null){
        return <BrandsSkeleton/>
    }
    else {
        return (
            <div className="section py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-4">
                        <h1 className="h4 fw-bold text-dark">Top Brands</h1>
                        <p className="text-muted small">
                            Explore a World of Choices Across Our Most Popular <br/>
                            Shopping Categories
                        </p>
                    </div>

                    <div className="row justify-content-center g-3">
                        {BrandList.map((item, i) => (
                            <div key={i} className="col-4 col-sm-3 col-md-2">
                                <Link
                                    to={`/by-brand/${item['_id']}`}
                                    className="card border-0 shadow-sm text-center bg-white rounded-3 h-100 text-decoration-none"
                                >
                                    <div className="card-body p-3 d-flex flex-column align-items-center">
                                        <img
                                            src={item['brandImg']}
                                            alt={item['brandName']}
                                            className="img-fluid mb-2"
                                            style={{height: '50px', objectFit: 'contain'}}
                                        />
                                        <p className="small text-dark fw-semibold mb-0">{item['brandName']}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        );
    }


};

export default Brands;
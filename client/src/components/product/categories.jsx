import React from 'react';
import ProductStore from "../../store/ProductStore.jsx";
import CategoriesSkeleton from "../../skeleton/cetegories-skeleton.jsx";
import {Link} from "react-router-dom";

const Categories = () => {
    const {CategoryList}=ProductStore();

    if (CategoryList===null){
        return <CategoriesSkeleton/>
    }
    return (
        <div className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center fw-bold mb-2">Top Categories</h2>
                <p className="text-center text-muted mb-4">
                    Explore a World of Choices Across Our Most Popular<br className="d-none d-md-block"/>
                    Shopping Categories
                </p>
                <div className="row g-4 justify-content-center">
                    {CategoryList.map((item, i) => (
                        <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2">
                            <Link to={`/by-category/${item['_id']}`} className="text-decoration-none">
                                <div className="card h-100 border-0 shadow-sm text-center">
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <img
                                            src={item['categoryImg']}
                                            alt={item['categoryName']}
                                            className="img-fluid mb-3"
                                            style={{maxHeight: '100px', objectFit: 'contain'}}
                                        />
                                        <p className="text-dark fw-semibold small mb-0">{item['categoryName']}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Categories;
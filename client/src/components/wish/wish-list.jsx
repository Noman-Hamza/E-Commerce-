import React, {useEffect} from 'react';
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import WishStore from "../../store/WishStore.jsx";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import NoData from "../layout/no-data.jsx";

const WishList = () => {

    const {WishListRequest,WishList,RemoveWishListRequest}=WishStore();


    useEffect(() => {
        (async ()=>{
            await WishListRequest()
        })()
    }, []);


    const remove = async (productID) => {
        await RemoveWishListRequest(productID)
        await WishListRequest();
    }


    if(WishList===null){
        return (
            <div className="container">
                <div className="row">
                    <ProductsSkeleton/>
                </div>
            </div>
        );
    }
    else if(WishList.length===0){
        return (
            <NoData/>
        );
    }
    else {
        return (
            <div className="container mt-4">
                <div className="row g-4">
                    {WishList.map((item, i) => {
                        const product = item['product'];
                        const hasDiscount = product['discount'] === true;

                        return (
                            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div className="card h-100 shadow-sm border-0">
                                    <img
                                        src={product['image']}
                                        alt={product['title']}
                                        className="card-img-top object-fit-cover rounded-top"
                                        style={{height: '200px', objectFit: 'cover'}}
                                    />

                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title text-truncate">{product['title']}</h6>

                                        {hasDiscount ? (
                                            <p className="mb-2">
                                                <span
                                                    className="text-muted text-decoration-line-through me-2">${product['price']}</span>
                                                <span className="text-danger fw-bold">${product['discountPrice']}</span>
                                            </p>
                                        ) : (
                                            <p className="mb-2 fw-medium text-dark">Price: ${product['price']}</p>
                                        )}

                                        <StarRatings
                                            rating={parseFloat(product['star'])}
                                            starRatedColor="orange"
                                            starDimension="16px"
                                            starSpacing="2px"
                                        />

                                        <div className="mt-auto pt-3 d-flex justify-content-between">
                                            <button
                                                onClick={async () => await remove(item['productID'])}
                                                className="btn btn-outline-danger btn-sm"
                                            >
                                                Remove
                                            </button>
                                            <Link
                                                to={`/details/${item['productID']}`}
                                                className="btn btn-outline-success btn-sm"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        );
    }
};

export default WishList;
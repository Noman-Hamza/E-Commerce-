import React from 'react';
import ProductImages from "../product/ProductImages.jsx";
import ProductStore from "../../store/ProductStore.jsx";
import DetailsSkeleton from "../../skeleton/details-skeleton.jsx"
import parse from 'html-react-parser'
import Reviews from "./reviews.jsx";

const ProductDetails = () => {

   const { Details,ReviewList}=ProductStore();
   const [quantity, setQuantity] = React.useState(1);

   const incrementQuantity = () => {
           setQuantity(quantity=>quantity+1)
   }

    const decrementQuantity = () => {
        if (quantity>1) {
            setQuantity(quantity=>quantity-1)
        }
    }

    if (Details===null){
    return <DetailsSkeleton/>
}
else {
    return (
        <div className="container mt-2">
            <div className="row">
                {/* Product Images */}
                <div className="col-md-7 p-3">
                    <ProductImages />
                </div>

                {/* Product Details */}
                <div className="col-md-5 p-3">
                    <h4>{Details[0]['title']}</h4>
                    <p className="text-muted bodySmal my-1">Category : {Details[0]['category']['categoryName']} </p>
                    <p className="text-muted bodySmal my-1">Brand : {Details[0]['brand']['brandName']} </p>
                    <p className="bodySmal mb-2 mt-1"> {Details[0]['shortDes']}</p>

                    <span>
                       { Details[0]['discount']?(
                        <span className={"bodyXLarge"} >Price: <strike class="text-secondary">{Details[0]['price']} </strike>{Details[0]['discountPrice']}</span>
                                ):(
                                    <span className={"bodyXLarge"} >Price: {Details[0]['price']}</span>
                                )
                       }
                    </span>

                    <div className="row">
                        {/* Size Selection */}
                        <div className="col-4 p-2">
                            <label className="bodySmal">Size</label>
                            <select className="form-control my-2 form-select">
                                <option value="">Select Size</option>
                                {
                                    Details[0]['detail']['size'].split(",").map((item,i) => {
                                        return <option value={item}>{item}</option>
                                    })
                                }
                            </select>
                        </div>

                        {/* Color Selection */}
                        <div className="col-4 p-2">
                            <label className="bodySmal">Color</label>
                            <select className="form-control my-2 form-select">
                                <option value="">Select Color</option>
                                {
                                    Details[0]['detail']['color'].split(",").map((item,i) => {
                                        return <option value={item}>{item}</option>
                                    })
                                }
                            </select>
                        </div>

                        {/* Quantity Selection */}
                        <div className="col-4 p-2">
                            <label className="bodySmal">Quantity</label>
                            <div className="input-group my-2">
                                <button onClick={decrementQuantity} className="btn btn-outline-secondary">-</button>
                                <input value={quantity} type="text" className="form-control bg-light text-center" readOnly />
                                <button onClick={incrementQuantity} className="btn btn-outline-secondary">+</button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="col-6 p-2">
                            <button className="btn w-100 btn-success">Add to Cart</button>
                        </div>
                        <div className="col-6 p-2">
                            <button className="btn w-100 btn-outline-secondary">Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs for Specifications & Reviews */}
            <div className="row mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="Speci-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Speci-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="Speci-tab-pane"
                            aria-selected="true">
                            Specifications
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="Review-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Review-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="Review-tab-pane"
                            aria-selected="false">
                            Review
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel" aria-labelledby="Speci-tab" tabIndex="0">
                        {
                            parse(Details[0]['detail']['des'])
                        }
                    </div>
                    <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab" tabIndex="0">
                       <Reviews/>
                    </div>
                </div>
            </div>
        </div>
    );
}

};


export default ProductDetails;

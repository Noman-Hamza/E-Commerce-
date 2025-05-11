import React from 'react';
import ProductImages from "../product/ProductImages.jsx";
import ProductStore from "../../store/ProductStore.jsx";
import DetailsSkeleton from "../../skeleton/details-skeleton.jsx"
import parse from 'html-react-parser'
import Reviews from "./reviews.jsx";
import CartSubmitButton from "../cart/CartSubmitButton.jsx";
import cartStore from "../../store/CartStore.jsx";
import toast from "react-hot-toast";
import WishStore from "../../store/WishStore.jsx";
import WishSubmitButton from "../wish/WishSubmitButton.jsx";

const ProductDetails = () => {

   const { Details,ReviewList}=ProductStore();
   const [quantity, setQuantity] = React.useState(1);

   const {CartFormChange,CartForm,CartSaveRequest,CartListRequest}=cartStore();
    const {WishSaveRequest,WishListRequest}=WishStore();

   const incrementQuantity = () => {
           setQuantity(quantity=>quantity+1)
   }

    const decrementQuantity = () => {
        if (quantity>1) {
            setQuantity(quantity=>quantity-1)
        }
    }
    const AddCart = async (productID,) => {
        let res=await CartSaveRequest(CartForm,productID,quantity);
        if(res){
            toast.success("Cart Item Added");
            await  CartListRequest();
        }
    }

    const AddWish = async (productID,) => {
        let res=await WishSaveRequest(productID);
        if(res){
            toast.success("Wish Item Added");
            await  WishListRequest();
        }
    }


    if (Details===null){
    return <DetailsSkeleton/>
}
else {
    return (
        <div className="container mt-4">
            <div className="row bg-white shadow-sm rounded-3 p-3">
                {/* Product Images */}
                <div className="col-md-7 mb-3">
                    <ProductImages/>
                </div>

                {/* Product Details */}
                <div className="col-md-5">
                    <h4 className="fw-bold text-dark">{Details[0]['title']}</h4>
                    <p className="text-muted mb-1">Category: <span
                        className="fw-medium">{Details[0]['category']['categoryName']}</span></p>
                    <p className="text-muted mb-2">Brand: <span
                        className="fw-medium">{Details[0]['brand']['brandName']}</span></p>
                    <p className="small text-secondary mb-3">{Details[0]['shortDes']}</p>

                    <div className="mb-3">
                        {Details[0]['discount'] ? (
                            <p className="fw-bold fs-5 text-danger mb-0">
                                Price: <span
                                className="text-muted text-decoration-line-through">{Details[0]['price']}</span> <span
                                className="text-dark">{Details[0]['discountPrice']}</span>
                            </p>
                        ) : (
                            <p className="fw-bold fs-5 text-dark mb-0">Price: {Details[0]['price']}</p>
                        )}
                    </div>

                    {/* Selection Options */}
                    <div className="row">
                        <div className="col-4 mb-3">
                            <label className="form-label text-muted">Size</label>
                            <select
                                value={CartForm.size}
                                onChange={(e) => CartFormChange('size', e.target.value)}
                                className="form-select"
                            >
                                <option value="">Select</option>
                                {Details[0]['detail']['size'].split(",").map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-4 mb-3">
                            <label className="form-label text-muted">Color</label>
                            <select
                                value={CartForm.color}
                                onChange={(e) => CartFormChange('color', e.target.value)}
                                className="form-select"
                            >
                                <option value="">Select</option>
                                {Details[0]['detail']['color'].split(",").map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-4 mb-3">
                            <label className="form-label text-muted">Quantity</label>
                            <div className="input-group">
                                <button onClick={decrementQuantity} className="btn btn-outline-dark">-</button>
                                <input value={quantity} type="text" className="form-control text-center bg-light border"
                                       readOnly/>
                                <button onClick={incrementQuantity} className="btn btn-outline-dark">+</button>
                            </div>
                        </div>

                        <div className="col-6 mb-2">
                            <CartSubmitButton onClick={async () => await AddCart(Details[0]['_id'])}
                                              className="btn btn-dark w-100" text="Add to Cart"/>
                        </div>
                        <div className="col-6 mb-2">
                            <WishSubmitButton onClick={async () => await AddWish(Details[0]['_id'])}
                                              className="btn btn-outline-dark w-100" text="Add to Wish"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="row mt-4">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active text-dark" id="Speci-tab" data-bs-toggle="tab"
                                data-bs-target="#Speci-tab-pane" type="button" role="tab" aria-controls="Speci-tab-pane"
                                aria-selected="true">
                            Specifications
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link text-dark" id="Review-tab" data-bs-toggle="tab"
                                data-bs-target="#Review-tab-pane" type="button" role="tab"
                                aria-controls="Review-tab-pane" aria-selected="false">
                            Review
                        </button>
                    </li>
                </ul>

                <div className="tab-content border border-top-0 p-3 rounded-bottom bg-white shadow-sm"
                     id="myTabContent">
                    <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel"
                         aria-labelledby="Speci-tab" tabIndex="0">
                        {parse(Details[0]['detail']['des'])}
                    </div>
                    <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab"
                         tabIndex="0">
                        <Reviews/>
                    </div>
                </div>
            </div>
        </div>

    );
    }

};


export default ProductDetails;

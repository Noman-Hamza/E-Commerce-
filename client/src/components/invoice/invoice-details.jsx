import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import cartStore from "../../store/CartStore.jsx";
import NoData from "../layout/no-data.jsx";
import CartSkeleton from "../../skeleton/cart-skeleton.jsx";
import { Modal } from "react-bootstrap";
import ReviewStore from "../../store/ReviewStore.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import ReviewSubmitButton from "./ReviewSubmitButton.jsx";

const InvoiceDetails = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    let {ReviewFormData,ReviewFormOnChange,ReviewSaveRequest}=ReviewStore()
    const ReviewModal=(id)=>{
        setShow(true);
        ReviewFormOnChange('productID',id)
    }

    const {id}=useParams();
    let {InvoiceDetails,InvoiceDetailsRequest}=cartStore()


    useEffect(() => {
        (async ()=>{
            await InvoiceDetailsRequest(id);
        })()
    }, [id]);


    const submitReview=async ()=>{
        if(ValidationHelper.IsEmpty(ReviewFormData.des)){
            toast.error("Review Required")
        }else {
            let res=await ReviewSaveRequest(ReviewFormData);
            res?toast.success("New Review Created"):toast.error("Something Went Wrong !")
            setShow(false)
        }
    }


    if(InvoiceDetails==null){
        return <CartSkeleton/>
    }
    else if(InvoiceDetails.length===0){
        return (
            <NoData/>
        );
    }
    else {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-lg border-0 rounded-4 p-4">
                            <ul className="list-group list-group-flush">
                                {InvoiceDetails.map((item, i) => (
                                    <li
                                        key={i}
                                        className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 py-4"
                                    >
                                        <img
                                            src={item.product.image}
                                            alt=""
                                            className="img-thumbnail rounded"
                                            style={{width: "100px", height: "auto"}}
                                        />
                                        <div className="flex-grow-1 ms-md-4 text-center text-md-start">
                                            <h5 className="fw-semibold mb-1">{item.product.title}</h5>
                                            <p className="mb-1 text-muted">
                                                Unit Price: <strong>${item.price}</strong>, Total:{" "}
                                                <strong>${item.price * parseInt(item.qty)}</strong>
                                            </p>
                                            <small className="text-secondary">
                                                Qty: {item.qty}, Size: {item.size}, Color: {item.color}
                                            </small>
                                        </div>
                                        <button
                                            className="btn btn-outline-success mt-3 mt-md-0"
                                            onClick={() => ReviewModal(item.productID)}
                                        >
                                            Write Review
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-6">Write a Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label className="form-label">Rating</label>
                            <select
                                className="form-select"
                                onChange={(e) => ReviewFormOnChange("rating", e.target.value)}
                            >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Review</label>
                            <textarea
                                className="form-control"
                                rows="5"
                                onChange={(e) => ReviewFormOnChange("des", e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Cancel
                        </button>
                        <ReviewSubmitButton
                            text="Submit"
                            className="btn btn-success"
                            onClick={submitReview}
                        />
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }


};

export default InvoiceDetails;
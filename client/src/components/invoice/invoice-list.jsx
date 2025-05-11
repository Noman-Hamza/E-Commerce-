import React, {useEffect} from 'react';
import cartStore from "../../store/CartStore.jsx";
import NoData from "../layout/no-data.jsx";
import {Link} from "react-router-dom";
import CartSkeleton from "../../skeleton/cart-skeleton.jsx";

const InvoiceList = () => {

    const {InvoiceList,InvoiceListRequest}=cartStore();

    useEffect(() => {
        (async ()=>{
            await InvoiceListRequest();
        })()
    }, []);

    if(InvoiceList==null){
        return <CartSkeleton/>
    }
    else if(InvoiceList.length===0){
        return (
            <NoData/>
        );
    }
    else {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-sm border-0 rounded-4 p-4 bg-light">
                            <h4 className="mb-4 text-center fw-bold text-dark">Your Invoices</h4>
                            <ul className="list-group list-group-flush">
                                {InvoiceList.map((item, i) => (
                                    <li
                                        key={i}
                                        className="list-group-item bg-white rounded-3 shadow-sm mb-3 p-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
                                    >
                                        <div className="mb-3 mb-md-0">
                                            <p className="mb-1 fw-semibold text-primary">
                                                Invoice No: <span className="text-dark">{item.tran_id}</span>
                                            </p>
                                            <p className="mb-1 text-muted">
                                                <strong>Customer:</strong> {item.cus_details}
                                            </p>
                                            <p className="mb-1 text-muted">
                                                <strong>Shipping:</strong> {item.ship_details}
                                            </p>
                                            <p className="mb-1 text-muted">
                                                <strong>Payment:</strong>{" "}
                                                <span
                                                    className={`badge ${item.payment_status === "Paid" ? "bg-success" : "bg-danger"}`}>
                    {item.payment_status}
                  </span>
                                            </p>
                                            <p className="mb-0 text-muted">
                                                <strong>Delivery:</strong>{" "}
                                                <span
                                                    className={`badge ${item.delivery_status === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                    {item.delivery_status}
                  </span>
                                            </p>
                                        </div>
                                        <Link
                                            className="btn btn-outline-primary mt-2 mt-md-0"
                                            to={`/invoice/${item._id}`}
                                        >
                                            View Details
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        );
    }


};
export default InvoiceList;
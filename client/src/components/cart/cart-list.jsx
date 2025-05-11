import React, {useEffect} from 'react';
import cartStore from "../../store/CartStore.jsx";
import CartSubmitButton from "../cart/CartSubmitButton.jsx";
import NoData from "../layout/no-data.jsx";
import CartSkeleton from "../../skeleton/cart-skeleton.jsx";

const CartList = () => {

    const {CartTotal,CartVatTotal,CartPayableTotal,CartListRequest,CartList,CreateInvoiceRequest,RemoveCartListRequest}=cartStore();

    useEffect(() => {
        (async ()=>{
            await CartListRequest()
        })()
    }, []);

    const remove = async (cartID) => {
        await RemoveCartListRequest(cartID)
        await CartListRequest()
    }

    if(CartList==null){
        return <CartSkeleton/>
    }
    else if(CartList.length===0){
        return (
            <NoData/>
        );
    }
    else {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-lg rounded-4 border-0 p-4">
                            <h4 className="mb-4 fw-bold text-center text-dark">Your Shopping Cart</h4>
                            <ul className="list-group list-group-flush">
                                {CartList.map((item, i) => {
                                    let price = item.product.price;
                                    if (item.product.discount === true) {
                                        price = item.product.discountPrice;
                                    }

                                    return (
                                        <li key={i}
                                            className="list-group-item d-flex align-items-center justify-content-between gap-3 py-3">
                                            <img
                                                className="rounded-3 border"
                                                width="100"
                                                src={item.product.image}
                                                alt={item.product.title}
                                                style={{objectFit: 'cover'}}
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="fw-semibold text-dark mb-1">{item.product.title}</h6>
                                                <p className="text-muted small mb-1">
                                                    Unit: <strong>${price}</strong> | Qty: {item.qty} |
                                                    Size: {item.size} | Color: {item.color}
                                                </p>
                                                <p className="fw-bold text-primary m-0">
                                                    Total: <i
                                                    className="bi bi-currency-dollar"></i>{parseInt(price) * parseInt(item.qty)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => remove(item._id)}
                                                className="btn btn-outline-danger btn-sm"
                                                title="Remove Item"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-5">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between bg-transparent border-0">
                                        <span className="text-dark fw-semibold">Subtotal:</span>
                                        <span className="fw-bold">${CartTotal}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between bg-transparent border-0">
                                        <span className="text-dark fw-semibold">VAT (5%):</span>
                                        <span className="fw-bold">${CartVatTotal}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between bg-transparent border-top border-dark pt-3">
                                        <span className="text-dark h5 fw-bold">Total Payable:</span>
                                        <span className="h5 fw-bold text-success">${CartPayableTotal}</span>
                                    </li>
                                    <li className="list-group-item bg-transparent border-0 text-end pt-4">
                                        <CartSubmitButton
                                            text="Proceed to Checkout"
                                            onClick={async () => {
                                                await CreateInvoiceRequest();
                                            }}
                                            className="btn btn-success px-5 py-2 rounded-pill fw-semibold"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

};

export default CartList;
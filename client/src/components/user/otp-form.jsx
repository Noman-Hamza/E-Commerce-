import React from 'react';
import Layout from "../layout/layout.jsx";
import UserSubmitButton from "./UserSubmitButton.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import UserStore from "../../store/UserStore.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const OtpForm = () => {

    let {OTPFormData,OTPFormOnChange, VerifyLoginRequest}=UserStore();
    let navigate = useNavigate();

    const onFormSubmit=async () => {
        if (ValidationHelper.IsEmpty(OTPFormData.otp)) {
            toast.error("Valid PIN Required");
        } else {
            let res = await VerifyLoginRequest(OTPFormData.otp);
            res ? navigate("/") : toast.error("Something Went Wrong !")
        }
    }

    return (
        <div className="container section ">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5 mt-4 mb-4">
                    <div className="card p-5">
                        <h4>Enter Verification Code</h4>
                        <p>A verification code has been sent to the email address you provide</p>
                        <input value={OTPFormData.otp} onChange={(e)=>{OTPFormOnChange("otp",e.target.value)}} placeholder="Verification" type="text" className="form-control"/>
                        <UserSubmitButton onClick={onFormSubmit} submit={false} className="btn mt-3 btn-dark" text="Submit"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;
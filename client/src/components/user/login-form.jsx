import React from 'react';
import Layout from "../layout/layout.jsx";
import UserSubmitButton from "./UserSubmitButton.jsx";
import UserStore from "../../store/UserStore.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js"
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';


const LoginForm = () => {
let navigate = useNavigate();
let {LoginFormData,LoginFormOnChange,UserOTPRequest}=UserStore();

const onFormSubmit=async () => {
    if (!ValidationHelper.IsEmail(LoginFormData.email)) {
        toast.error("Valid Email Address Required");
    } else {
        let res = await UserOTPRequest(LoginFormData.email);
        res?.status === "success"
            ? (toast.success(`OTP sent successfully: ${res.code}`, { autoClose: 900000 }), navigate("/otp")) : toast.error("Something Went Wrong !");
    }
}
    return (
        <div className="container section mt-6 mb-6">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card border-0 shadow-lg rounded-4 p-5 bg-white">
                        <h3 className="fw-bold text-dark mb-4">Verify Your Email</h3>
                        <p className="text-muted small mb-4">
                            A 6-digit verification code will be sent to the email address you enter.
                        </p>

                        <input
                            value={LoginFormData.email}
                            onChange={(e) => LoginFormOnChange("email", e.target.value)}
                            placeholder="Enter your email address"
                            type="email"
                            className="form-control form-control-lg mb-3 border border-secondary-subtle shadow-sm"
                        />

                        <UserSubmitButton
                            onClick={onFormSubmit}
                            className="btn btn-dark w-100 py-3"
                            text="Send Code"
                        />
                    </div>
                </div>
            </div>
        </div>


    );
};

export default LoginForm;
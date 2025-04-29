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
        <Layout className="container section mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Your Email</h4>
                        <p>A verification code will be sent to the email address you provide</p>
                        <input value={LoginFormData.email} onChange={(e)=>{LoginFormOnChange("email",e.target.value)}} placeholder="Email Address" type="email" className="form-control"/>
                        <UserSubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Next"/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LoginForm;
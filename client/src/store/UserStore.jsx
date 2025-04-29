import { create } from "zustand";
import axios from "axios";
import {getEmail, setEmail} from "../utility/utility.js";
import {useState} from "react";

const UserStore = create((set) => ({


    // isLogin:false,
    // SetUserLogin:()=>{
    //
    // }

    LoginFormData:{email:""},

    LoginFormOnChange:(name,value)=>{
            set((state)=>({
                LoginFormData:{
                    ...state.LoginFormData,
                    [name]:value,
                },
            }));
    },

    OTPFormData:{email:""},

    OTPFormOnChange:(name,value)=>{
        set((state)=>({
            OTPFormData:{
                ...state.OTPFormData,
                [name]:value,
            },
        }));
    },


    isFormSubmit: false,

    UserOTPRequest: async (email) => {
        set({isFormSubmit: true});
        let res = await axios.get(`/api/v1/UserOTP/${email}`);
        setEmail(email);
        set({isFormSubmit: false});
        return res.data;
    },


    VerifyLoginRequest: async (otp) => {
        set({isFormSubmit: true});
        let email = getEmail()
        let res = await axios.get(`/api/v1/VerifyLogin/${email}/${otp}`);
        set({isFormSubmit: false});
        return res.data['status'] === "success";
    },


}));

export default UserStore;

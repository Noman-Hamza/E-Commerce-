// import { create } from "zustand";
// import axios from "axios";
// const baseURL = import.meta.env.VITE_API_BASE_URL;
// import {getEmail, setEmail,unauthorized} from "../utility/utility.js";
// import {useState} from "react";
// import Cookies from "js-cookie";
// const UserStore = create((set) => ({
//
//
//   isLogin:()=>{
//       return !!Cookies.get("token");
//   },
//
//     LoginFormData:{email:""},
//
//     LoginFormOnChange:(name,value)=>{
//             set((state)=>({
//                 LoginFormData:{
//                     ...state.LoginFormData,
//                     [name]:value,
//                 },
//             }));
//     },
//
//     OTPFormData:{email:""},
//
//     OTPFormOnChange:(name,value)=>{
//         set((state)=>({
//             OTPFormData:{
//                 ...state.OTPFormData,
//                 [name]:value,
//             },
//         }));
//     },
//
//
//     isFormSubmit: false,
//
//     UserOTPRequest: async (email) => {
//         set({isFormSubmit: true});
//         let res = await axios.get(`${baseURL}/api/v1/UserOTP/${email}`);
//         setEmail(email);
//         set({isFormSubmit: false});
//         return res.data;
//     },
//
//
//     VerifyLoginRequest: async (otp) => {
//         set({ isFormSubmit: true });
//         let email = getEmail();
//         let res = await axios.get(`${baseURL}/api/v1/VerifyLogin/${email}/${otp}`, {
//             withCredentials: true
//         });
//         set({ isFormSubmit: false });
//         return res.data['status'] === "success";
//     },
//
//
//     UserLogoutRequest: async () => {
//         set({ isFormSubmit: true });
//         let res = await axios.get(`${baseURL}/api/v1/UserLogout`, {
//             withCredentials: true
//         });
//         set({ isFormSubmit: false });
//         return res.data['status'] === "success";
//     },
//
//
//     ProfileForm:{cus_add:"",cus_city:"",cus_country:"",cus_fax:"",cus_name:"",cus_phone:"",cus_postcode:"",cus_state:"",ship_add:"",ship_city:"",ship_country:"",ship_name:"",ship_phone:"",ship_postcode:"",ship_state:""},
//     ProfileFormChange:(name,value)=>{
//         set((state)=>({
//             ProfileForm:{
//                 ...state.ProfileForm,
//                 [name]:value
//             }
//         }))
//     },
//
//     ProfileDetails:null,
//     ProfileDetailsRequest:async()=>{
//         try {
//             let res=await axios.get(`${baseURL}/api/v1/ReadProfile`, {
//                 withCredentials: true
//             });
//             if(res.data['data'].length>0){
//                 set({ProfileDetails:res.data['data'][0]})
//                 set({ProfileForm:res.data['data'][0]})
//             }else{
//                 set({ProfileDetails:[]})
//             }
//         }catch (e) {
//             unauthorized(e.response.status)
//         }
//     },
//
//     ProfileSaveRequest:async(PostBody)=>{
//         try {
//             set({ProfileDetails:null})
//             let res=await axios.post(`${baseURL}/api/v1/UpdateProfile`,PostBody, {
//                 withCredentials: true
//             });
//             return res.data['status'] === "success";
//         }catch (e) {
//             unauthorized(e.response.status)
//         }
//     }
//
//
// }));
//
// export default UserStore;
//
//
// src/store/UserStore.js
import { create } from "zustand";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
import { getEmail, setEmail, unauthorized } from "../utility/utility.js";

const UserStore = create((set) => ({
    isAuthenticated: false,
    isFormSubmit: false,

    // Check Login Status via API
    checkLoginStatus: async () => {
        try {
            await axios.get(`${baseURL}/api/v1/ReadProfile`, {
                withCredentials: true,
            });
            set({ isAuthenticated: true });
            return true;
        } catch {
            set({ isAuthenticated: false });
            return false;
        }
    },

    LoginFormData: { email: "" },
    LoginFormOnChange: (name, value) => {
        set((state) => ({
            LoginFormData: {
                ...state.LoginFormData,
                [name]: value,
            },
        }));
    },

    OTPFormData: { email: "" },
    OTPFormOnChange: (name, value) => {
        set((state) => ({
            OTPFormData: {
                ...state.OTPFormData,
                [name]: value,
            },
        }));
    },

    UserOTPRequest: async (email) => {
        set({ isFormSubmit: true });
        const res = await axios.get(`${baseURL}/api/v1/UserOTP/${email}`);
        setEmail(email);
        set({ isFormSubmit: false });
        return res.data;
    },

    VerifyLoginRequest: async (otp) => {
        try {
            set({ isFormSubmit: true });
            const email = getEmail();
            const res = await axios.get(`${baseURL}/api/v1/VerifyLogin/${email}/${otp}`, {
                withCredentials: true,
            });
            set({ isFormSubmit: false });
            const success = res.data?.status === "success";
            set({ isAuthenticated: success });
            return success;
        } catch (e) {
            set({ isFormSubmit: false, isAuthenticated: false });
            unauthorized(e.response?.status);
            return false;
        }
    },

    UserLogoutRequest: async () => {
        try {
            set({ isFormSubmit: true });
            await axios.get(`${baseURL}/api/v1/UserLogout`, {
                withCredentials: true,
            });
            set({ isAuthenticated: false, isFormSubmit: false });
            return true;
        } catch {
            set({ isFormSubmit: false });
            return false;
        }
    },
}));

export default UserStore;

import React from 'react';
import axios from 'axios';
import { unauthorized } from "../utility/utility.js";
import { create } from "zustand";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const WishStore = create((set) => ({

    isWishSubmit: false,
    WishSaveRequest:async(productID)=> {
        try {
            set({isWishSubmit: true});
            let res = await axios.post(`${baseURL}/api/v1/SaveWishList`, {productID: productID});
            return res.data['status'] === "success";
        } catch (e) {
            unauthorized(e.response.status)
        } finally {
            set({isWishSubmit: false})
        }
    },

    WishList:null,
    WishCount:0,

    WishListRequest:async()=>{
        try {
            let res=await axios.get(`${baseURL}/api/v1/WishList`);
            set({WishList:res.data['data']})
            set({WishCount:(res.data['data']).length})


        }catch (e) {
            unauthorized(e.response.status)
        }
    },

    RemoveWishListRequest:async(productID)=>{
        try {
            set({WishList:null})
            await axios.post(`${baseURL}/api/v1/RemoveWishList`,{"productID":productID});
        }catch (e) {
            unauthorized(e.response.status)
        }
    },



}));

export default WishStore;

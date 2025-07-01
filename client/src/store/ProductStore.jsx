import { create } from "zustand";
const baseURL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

const ProductStore = create((set)=>({
    BrandList:null,
    BrandListRequest:async()=>{
        let res=await axios.get(`${baseURL}/api/v1/ProductBrandList`);
        if(res.data['status']==="success"){
            set({BrandList:res.data['data']});
        }
    },

    CategoryList:null,
    CategoryListRequest:async()=>{
        let res=await axios.get(`${baseURL}/api/v1/ProductCategoryList`);
        if(res.data['status']==="success"){
            set({CategoryList:res.data['data']});
        }
    },

    ProductSliderList:null,
    ProductSliderListRequest:async()=>{
        let res=await axios.get(`${baseURL}/api/v1/ProductSliderList`);
        if(res.data['status']==="success"){
            set({ProductSliderList:res.data['data']});
        }
    },
    ProductListByRemark:null,
    ProductListByRemarkRequest:async(Remark)=>{
        set({ProductListByRemark:null})
        let res=await axios.get(`${baseURL}/api/v1/ProductListByRemark/${Remark}`);
        if(res.data['status']==="success"){
            set({ProductListByRemark:res.data['data']});
        }
    },

    ListProduct:null,
    ProductListByBrandRequest:async(BrandID)=>{
        set({ListProduct:null})
        let res=await axios.get(`${baseURL}/api/v1/ProductListByBrand/${BrandID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']});
        }
    },


    ProductListByCategoryRequest:async(CategoryID)=>{
        set({ListProduct:null})
        let res=await axios.get(`${baseURL}/api/v1/ProductListByCategory/${CategoryID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']});
        }
    },


    ProductListByKeywordRequest:async(keyword)=>{
        set({ListProduct:null})
        let res=await axios.get(`${baseURL}/api/v1/ProductListByKeyword/${keyword}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']});
        }
    },

    ListByFilterRequest:async(PostBody)=>{
        set({ListProduct:null})
        let res=await axios.post(`${baseURL}/api/v1/ProductListByFilter`,PostBody);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']});
        }
    },

    Details:null,
    ProductDetailsRequest:async(id)=>{
        set({Details:null})
        let res=await axios.get(`${baseURL}/api/v1/ProductDetails/${id}`);
        if(res.data['status']==="success"){
            set({Details:res.data['data']});
        }
    },




ReviewList:null,
    ProductReviewListRequest:async(id)=>{
        let res=await axios.get(`${baseURL}/api/v1/ProductReviewList/${id}`);
        if(res.data['status']==="success"){
            set({ReviewList:res.data['data']});
        }
    },


    SearchKeyword:"",
    SetSearchKeyword:async(keyword)=>{
        set({SearchKeyword:keyword})
    },



}));

export default ProductStore;


import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import {useParams} from "react-router-dom";
import Details from "../components/product/details.jsx";
import Brands from "../components/product/brands.jsx";
import ProductStore from "../store/ProductStore.jsx";

const ProductDetails = () => {
const {ProductDetailsRequest,ProductReviewListRequest,BrandListRequest, BrandList}=ProductStore();
   const {id} = useParams();

   useEffect(() => {
       (async ()=>{
           await ProductDetailsRequest(id);
           await ProductReviewListRequest(id);
           BrandList===null?await BrandListRequest():null
       })()
   },[id]);

    return (
        <Layout>
            <Details/>
            <Brands/>
        </Layout>
    );
};

export default ProductDetails;
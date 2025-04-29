import React, {useEffect} from 'react';
import productStore from "../store/ProductStore.jsx";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";

const ProductByBrand = () => {

    const {ProductListByBrandRequest}=productStore();
    const {id}=useParams();

    useEffect(() => {
        (async ()=>{
            await ProductListByBrandRequest(id);
        })()
    },[id]);
    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByBrand;
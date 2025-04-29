import React, {useEffect} from 'react';
import productStore from "../store/ProductStore.jsx";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";

const ProductByCetagory = () => {
    const {ProductListByCategoryRequest}=productStore();
    const {id}=useParams();

    useEffect(() => {
        (async ()=>{
            await ProductListByCategoryRequest(id);
        })()
    },[id]);
    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByCetagory;
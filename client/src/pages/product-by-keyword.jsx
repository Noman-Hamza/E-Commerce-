import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.jsx";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";

const ProductByKeyword = () => {
    const {ProductListByKeywordRequest}=ProductStore();
    const {keyword}=useParams();

    useEffect(() => {
        (async ()=>{
            await ProductListByKeywordRequest(keyword)
        })()
    }, [keyword]);


    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByKeyword;
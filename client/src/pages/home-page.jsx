import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import Brands from "../components/product/brands.jsx";
import ProductStore from "../store/ProductStore.jsx";
import FeatureStore from "../store/FeatureStore.jsx";
import Slider from "../components/product/slider.jsx";
import Features from "../components/features/features.jsx";
import Categories from "../components/product/categories.jsx";
import Products from "../components/product/products.jsx";


const HomePage = () => {

    const {BrandListRequest,CategoryListRequest,ProductSliderListRequest,ProductListByRemarkRequest}=ProductStore();
    const {FeatureListRequest}=FeatureStore();

    useEffect(() => {
        (async ()=>{
            await ProductSliderListRequest();
            await FeatureListRequest();
            await CategoryListRequest();
            await ProductListByRemarkRequest("new");
            await BrandListRequest()
        })()
    }, []);


    return (
        <Layout>
            <Slider/>
            <Features/>
            <Categories/>
            <Products/>
            <Brands/>
        </Layout>
    );
};

export default HomePage;
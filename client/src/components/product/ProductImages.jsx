import React from 'react';
import ProductStore from "../../store/ProductStore.jsx";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
const ProductImages = () => {
    const { Details}=ProductStore();
let images = [

    {original: Details[0]['detail']['img1'], thumbnail: Details[0]['detail']['img1']},
    {original: Details[0]['detail']['img2'], thumbnail: Details[0]['detail']['img2']},
    {original: Details[0]['detail']['img3'], thumbnail: Details[0]['detail']['img3']},


]

    return (
        <div>
            <ImageGallery autoplay={true} items={images}/>
        </div>
    );
};

export default ProductImages;
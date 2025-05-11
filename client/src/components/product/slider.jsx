import React from 'react';
import ProductStore from "../../store/ProductStore.jsx";
import SliderSkeleton from "../../skeleton/slider-skeleton.jsx";
import {Link} from "react-router-dom";

const Slider = () => {

    const {ProductSliderList}=ProductStore();


    if(ProductSliderList===null){
        return <SliderSkeleton/>
    }
    else {
        return (
            <div>
                <div id="carouselExampleDark" className="carousel hero-bg carousel-light slide">
                    <div className="carousel-indicators">

                        {ProductSliderList.map((item,i)=>{
                            return(
                                <button key={i} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={i} className="active bg-white" aria-current="true" aria-label=""></button>
                            )
                        })}


                    </div>
                    <div className="carousel-inner py-5">
                        {
                            ProductSliderList.map((item,i)=>{
                                let active="carousel-item"
                                if(i===0){
                                    active="carousel-item active"
                                }
                                return (
                                    <div key={i} className={active} data-bs-interval="10000">
                                        <div className="container-fluid ">
                                            <div className="row px-5 justify-content-center">
                                                <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                                    <h1 className="headline-1 fw-bolder  text-white">{item['title']}</h1>
                                                    <p className="h2 fw-bolder text-primary">{item['price']}</p>
                                                    <p className="text-white">{item['des']}</p>

                                                    <Link to={`/details/${item['productID']}`} className="btn text-white btn-primary mt-1 px-5">Buy Now</Link>
                                                </div>
                                                <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5 ">
                                                    <img src={item['image']} className="w-100 rounded-3" alt="..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="carousel-control-prev btn rounded-5" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next btn" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        );
    }

};

export default Slider;
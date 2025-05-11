import React from 'react';
import FeatureStore from "../../store/FeatureStore.jsx";
import FeaturesSkeleton from "../../skeleton/features-skeleton.jsx";

const Features = () => {
    const {FeatureList}=FeatureStore();

    if(FeatureList===null){
        return <FeaturesSkeleton/>
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row g-4">
                    {FeatureList.map((item, i) => (
                        <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100 text-center border-0 shadow-sm">
                                <div className="card-body d-flex flex-column align-items-center">
                                    <img src={item.img} alt="icon" className="mb-3"
                                         style={{width: "48px", height: "48px"}}/>
                                    <h6 className="fw-bold mb-1">{item.name}</h6>
                                    <p className="text-muted small mb-0 text-center">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Features;
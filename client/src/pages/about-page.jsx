import React, {useContext, useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";
import FeatureStore from "../store/FeatureStore.jsx";

const AboutPage = () => {
    const { LegalDetailsRequest} = FeatureStore();
    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("about");
        })();
    }, []);
    return (
        <Layout>
              <LegalContents/>
        </Layout>
    );
};

export default AboutPage;
import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.jsx";
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";

const ContactPage = () => {
    const { LegalDetailsRequest} = FeatureStore();
    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("contact");
        })();
    }, []);
    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default ContactPage;
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { postReactRequest } from "../../services/axiosReact";
import getstarted from "../../images/getstarted-img.png";
import featuresImg from "../../images/features-img.png";
import { prepareFeatures } from "../../helpers/UtilityHelper";
import Loader from "../common/loader";
import ThemeList from "./themeList";
import FeaturesList from "./featuresList";
import CreateClient from "./createClient";
import Router from "next/router";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardContainer(props) {
    const [show, setShow] = useState(false);
    const [featuresShow, featuresSetShow] = useState(false);
    const [createClientShow, createClientSetShow] = useState(false);

    const { dashboardData, gcData } = props;
    const [themeId, setCurrentTheme] = useState(null);
    const [featuresId, setFeaturesId] = useState([]);
    const [features, setFeaturesList] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };
    const handleFeaturesClose = () => {
        featuresSetShow(false);
    };
    const handleCreateClientShow = () => {
        createClientSetShow(true);
    };
    const handleCreateClientClose = () => {
        createClientSetShow(false);
    };
    const handleFeaturesShow = () => {
        featuresSetShow(true);
    };
    const selectTheme = (id) => {
        handleClose();
        handleFeaturesShow();
        setCurrentTheme(id);
    }
    const selectFeatures = (featuresArr) => {
        setFeaturesId(featuresArr);
        handleFeaturesClose();
        handleCreateClientShow();
    }
    const handleSubmit = async (param) => {
        setSubmitLoading(true);
        const response = await postReactRequest("/client", param);
        if (response && response.data) {
            setSubmitLoading(false);
            handleCreateClientClose();
            setCurrentTheme(null);
            setFeaturesId(null);
            toast.success('Client created successfully!');
            Router.push('/clients');
        }
        else {
            toast.error('Some error occured!');
            setSubmitLoading(false);
        }
    }
    const handlePrevious = () => {
        handleCreateClientClose();
        handleFeaturesShow();
    }
    const recommendedFeatures = (isCheck, search) => {
        const recommendedData = prepareFeatures(dashboardData.corethemesInfo.response.response[0].template_features, themeId, isCheck, search);
        setFeaturesList(recommendedData);
    }
    const applySearch = (isCheck, search) => {
        const recommendedData = prepareFeatures(dashboardData.corethemesInfo.response.response[0].template_features, themeId, isCheck, search);
        setFeaturesList(recommendedData);
    }

    useEffect(() => {
        const featuresArr = (
            themeId &&
            dashboardData &&
            dashboardData.corethemesInfo &&
            dashboardData.corethemesInfo.response &&
            dashboardData.corethemesInfo.response.response[0] &&
            dashboardData.corethemesInfo.response.response[0].template_features
        )
            ? prepareFeatures(dashboardData.corethemesInfo.response.response[0].template_features, themeId) : [];
        setFeaturesList(featuresArr);
    }, [dashboardData, themeId]);


    return (
        <>

            <div className="data-wrapper">
                {((dashboardData && dashboardData.loading) || (gcData && gcData.loading)) &&
                    <Loader />
                }
                <h1>Let's build e-Commerce</h1>
                <div className="d-flex w-100 features-card-contain mt-4">
                    <div className="features-card text-center">
                        <div className="inner-content d-flex flex-column mb-2">
                            <Image src={getstarted} alt="" width={140} height={140} className="hamburger" />
                            <button onClick={handleShow} className="common-button-style">Get started</button>
                        </div>
                        <h6>+ Templates</h6>
                    </div>

                    <div className="features-card text-center">
                        <div className="inner-content d-flex flex-column mb-2">
                            <Image src={featuresImg} alt="" width={140} height={140} className="hamburger" />
                            <button className="common-button-style" data-bs-toggle="modal" data-bs-target="#selectsku">Get
                                started</button>
                        </div>
                        <h6>+ Features</h6>
                    </div>

                </div>
            </div>
            <ThemeList
                show={show}
                handleClose={handleClose}
                dashboardData={dashboardData}
                selectTheme={selectTheme}
                themeId={themeId}
            />
            <FeaturesList
                show={featuresShow}
                handleClose={handleFeaturesClose}
                selectFeatures={selectFeatures}
                features={features}
                recommendedFeatures={recommendedFeatures}
                applySearch={applySearch}
            />
            <CreateClient
                show={createClientShow}
                handleClose={handleCreateClientClose}
                handleSubmitClient={handleSubmit}
                gcData={gcData}
                featuresId={featuresId}
                themeId={themeId}
                handlePrevious={handlePrevious}
                submitLoading={submitLoading}
            />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}
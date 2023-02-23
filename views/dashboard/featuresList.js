import React, { useState } from "react";
import Image from 'next/image';
import cross from '../../images/cross-icon.png';
import arrow from '../../images/button-arrow.png';
import { toast } from 'react-toastify';

export default function FeaturesList(props) {
    const [isToggle, setToggle] = useState([]);
    const [featuresList, setFeaturesList] = useState([]);
    const [isRecommended, setIsRecommended] = useState(false);
    const [searchFeature, setSearchFeature] = useState("");
    const { show, handleClose, selectFeatures, features, recommendedFeatures, applySearch } = props;


    const hideModal = () => {
        handleClose();
    };


    const handleCbx = event => {
        var featuresArr = [...featuresList];
        const value = event.target.value
        const index = featuresArr.findIndex(day => day === value);
        if (index > -1) {
            featuresArr = [...featuresArr.slice(0, index), ...featuresArr.slice(index + 1)]
        } else {
            featuresArr.push(value);
        }
        setFeaturesList(featuresArr);
    }
    const handleToggle = (label) => {
        var featuresArr = [...isToggle];
        const value = label;
        const index = featuresArr.findIndex(day => day === value);
        if (index > -1) {
            featuresArr = [...featuresArr.slice(0, index), ...featuresArr.slice(index + 1)]
        } else {
            featuresArr.push(value);
        }
        setToggle(featuresArr);
    }
    const handleSubmit = () => {
        if (featuresList && featuresList.length > 0) {
            selectFeatures(featuresList);
        }
        else {
            toast.error('At least one feature required!');
        }

    }
    const handleRecommended = event => {
        const recommended = !isRecommended;
        setIsRecommended(recommended);
        recommendedFeatures(recommended, searchFeature);
        setFeaturesList([]);
    }
    const handleSearch = event => {
        const { value } = event.target;
        setSearchFeature(value);
        applySearch(isRecommended, value);
        setFeaturesList([]);
    }
    console.log(Object.keys(features), featuresList, isToggle);
    return (
        <>
            <div
                className={`modal fade generic-modal-style ${(show) ? "show" : ""}`}
                id="clientdetails"
                tabIndex="-1"
                aria-labelledby="clientdetailsLabel"
                aria-hidden="true"
                style={show ? { display: 'block' } : { display: 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <Image
                            src={cross}
                            width={30}
                            height={31}
                            alt=""
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={hideModal}
                        />
                        <div className="modal-body pb-1">
                            <div className="searchbar-and-features d-flex align-items-center">
                                <input type="search" placeholder="Search features you wish to add" onChange={handleSearch} value={searchFeature} />
                                <div className="recommended-checkbox d-flex align-items-center">
                                    <input type="checkbox" id="recommended" onChange={handleRecommended} value={isRecommended} />
                                    <label>Add recommended features</label>
                                </div>
                            </div>
                            <div className="features-list">
                                <div className="selected-featured-strip">Selected features</div>
                                <ul className="list-group">

                                    {Object.keys(features).length > 0 && Object.keys(features).map((item, index) => (
                                        <li className="list-group-item" key={item}>
                                            <input className="form-check-input me-1" type="checkbox" value=""
                                                aria-label="..." />
                                            <span className="title" onClick={() => handleToggle(item)}>
                                                {item}
                                            </span>
                                            <ul className="collapse-lists" style={isToggle.indexOf(item) != -1 ? { display: 'block' } : { display: 'none' }}>
                                                {features[item].map((inneritem) => (
                                                    <li className="list-group-item" key={inneritem.id}>
                                                        <input className="form-check-input me-1" onChange={handleCbx} type="checkbox" value={inneritem.id} />
                                                        <span>{inneritem.feature_name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer border-0 pt-0">
                            <button type="button" className="common-button-style next" onClick={handleSubmit}>
                                Next
                                <Image
                                    src={arrow}
                                    width={25}
                                    height={13}
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {(show &&
                <div className="modal-backdrop fade show"></div>
            )}
        </>
    )
}
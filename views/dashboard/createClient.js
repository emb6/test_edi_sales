import React, { useEffect } from "react";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import cross from '../../images/cross-icon.png';
import arrow from '../../images/button-arrow.png';
import Loader from "../common/loader";

export default function CreateClient(props) {
    const { show, handleClose, handleSubmitClient, gcData, featuresId, themeId, handlePrevious, submitLoading } = props;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const resetForm = () => {
        let defaultValues = {
            name: "",
            sku_id: "",
            phone_number: "",
            email_address: "",
            project_amount: "",
            spoc_id: "",
            zoho_deal_id: ""

        };
        reset({ ...defaultValues });
    }
    const onSubmit = (data) => {
        const clientCopy = Object.assign(
            {},
            {
                "platform_id": "1",
                "template_id": themeId,
                "features": featuresId,
            },
            data
        );

        handleSubmitClient(clientCopy);
    };

    const hideModal = () => {
        resetForm();
        handleClose();
    };
    //gcData.globalConfInfo.response[0].sales_spoc
    const sales_spoc = (gcData.globalConfInfo.response && gcData.globalConfInfo.response.response[0].sales_spoc) ? (gcData.globalConfInfo.response.response[0].sales_spoc) : [];
    const sales_skus = (gcData.globalConfInfo.response && gcData.globalConfInfo.response.response[0].sales_skus) ? (gcData.globalConfInfo.response.response[0].sales_skus) : [];
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
                        {submitLoading &&
                        <Loader />
                        }
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
                        <form className="form-style mt-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body pb-1">
                                <h2 className="text-center mt-3">Client Details</h2>

                                <div className="row">
                                    <div className="col-md-6">
                                        <input
                                            {...register('name', {
                                                required: 'Client name is required'
                                            })}
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            placeholder="Client Name *"
                                            autoComplete="off"
                                        />
                                        {errors.name && <div className="invalid-feedback" role="alert">{errors.name.message}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <select
                                            {...register('sku_id', {
                                                required: 'SKU is required'
                                            })}
                                            className={`form-control ${errors.sku_id ? "is-invalid" : ""}`}
                                        >
                                            <option value="">Select SKU</option>
                                            {sales_skus && sales_skus.map((item) =>
                                                <option value={item.id}>{item.title}</option>
                                            )}
                                        </select>
                                        {errors.sku_id && <div className="invalid-feedback" role="alert">{errors.sku_id.message}</div>}
                                    </div>

                                    <div className="col-md-6 combo-field">
                                        <input
                                            {...register('email_address', {
                                                required: 'Email address is required',
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Please enter valid email',
                                                }
                                            })}
                                            type="text"
                                            className={`form-control ${errors.email_address ? "is-invalid" : ""}`}
                                            placeholder="Email Address *"
                                            autoComplete="off"
                                        />
                                        {errors.email_address && <div className="invalid-feedback" role="alert">{errors.email_address.message}</div>}
                                    </div>

                                    <div className="col-md-6 combo-field">
                                        <input
                                            {...register('phone_number', {
                                                required: 'Phone Number is required',
                                                pattern: {
                                                    value: /^[1-9][0-9]{9}$/,
                                                    message: 'Please enter valid phone number',
                                                }
                                            })}
                                            type="text"
                                            className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
                                            placeholder="Phone Number *"
                                            autoComplete="off"
                                        />
                                        {errors.phone_number && <div className="invalid-feedback" role="alert">{errors.phone_number.message}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <input
                                            {...register('project_amount', {
                                                required: 'Project amount is required'
                                            })}
                                            type="text"
                                            className={`form-control ${errors.project_amount ? "is-invalid" : ""}`}
                                            placeholder="Project Amount *"
                                            autoComplete="off"
                                        />
                                        {errors.project_amount && <div className="invalid-feedback" role="alert">{errors.project_amount.message}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <select
                                            {...register('spoc_id', {
                                                required: 'SPOC is required'
                                            })}
                                            className={`form-control ${errors.spoc_id ? "is-invalid" : ""}`}
                                        >
                                            <option value="">Select SPOC</option>
                                            {sales_spoc && sales_spoc.map((item) =>
                                                <option value={item.id}>{item.title}</option>
                                            )}
                                        </select>
                                        {errors.spoc_id && <div className="invalid-feedback" role="alert">{errors.spoc_id.message}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <input
                                            {...register('zoho_deal_id', {
                                                required: 'Zoho deal ID is required'
                                            })}
                                            type="text"
                                            className={`form-control ${errors.zoho_deal_id ? "is-invalid" : ""}`}
                                            placeholder="Zoho deal ID *"
                                            autoComplete="off"
                                        />
                                        {errors.zoho_deal_id && <div className="invalid-feedback" role="alert">{errors.zoho_deal_id.message}</div>}
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer border-0 pt-0 d-flex align-items-center justify-content-between">
                                <a href="javascript:void(0);" onClick={handlePrevious} className="text-anchor">Previous</a>
                                <button type="submit" className="common-button-style next">
                                    Create
                                    <Image
                                        src={arrow}
                                        width={25}
                                        height={13}
                                        alt=""
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {(show &&
                <div className="modal-backdrop fade show"></div>
            )}
        </>
    )
}
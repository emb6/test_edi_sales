import React, { useState } from "react";
import Image from 'next/image';
import cross from '../../images/cross-icon.png';
import Pagination from "../../helpers/Pagination";

export default function POTList(props) {

    const { show, handleClose, potData, handlePagination, clientid, templateid, currentPage } = props;


    const hideModal = () => {
        handleClose();
    };

    console.log(potData);
    const result = (potData && potData.response && potData.response[0].history && potData.response[0].history.data) ? (potData.response[0].history.data) : [];
    return (
        <>
            <div className="data-wrapper ">
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
                                <h2 className="text-center mt-3">Selected Images</h2>
                                <div className="table-wrapper">
                                    <table className="table table-bordered text-center mt-3 mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">Image</th>
                                                <th scope="col">Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.map((item) =>
                                                <tr key={item.id}>
                                                    <td scope="row">
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${item.image}`}
                                                            width={50}
                                                            height={50}
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td>{item.remarks}</td>

                                                </tr>
                                            )}
                                            {result.length === 0 &&
                                                <tr key="pot-noitem">
                                                    <td scope="row" colSpan={2}>
                                                        No Record Found
                                                    </td>

                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    {potData && potData.response && potData.response[0].history &&
                                        <nav aria-label="Page navigation example" className="navigation-example px-3 py-2">
                                            <Pagination
                                                currentPage={currentPage}
                                                totalCount={potData.response[0].history.total}
                                                pageSize={potData.response[0].history.per_page}
                                                onPageChange={page => handlePagination(page, clientid, templateid)}
                                                last_page={potData.response[0].history.last_page}
                                            />
                                        </nav>

                                    }
                                </div>

                            </div>

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
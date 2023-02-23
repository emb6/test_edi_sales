import React, { useEffect, useState } from "react";
import Image from 'next/image';
import cross from '../../images/cross-icon.png';
import arrow from '../../images/button-arrow.png';
import Loader from "../common/loader";

export default function UploadPOT(props) {
    const { show, handleClose, loading, handleImageUpload } = props;
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState()
    const [remark, setRemark] = useState("");
    const [remarkError, setRemarkError] = useState(null);
    const [fileError, setFileError] = useState(null);

    const hideModal = () => {
        handleClose();
    };
    const handleSubmit = () => {
        if (!remark) {
            setRemarkError("Remark is required!");
        }
        if (!selectedFile) {
            setFileError("File is required!");
        }
        else {
            setPreview(null);
            setRemark("");
            setSelectedFile(null);
            handleImageUpload(selectedFile, remark);
        }
    };


    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
        setFileError(null);
    }

    const handleRemark = e => {
        setRemarkError(null);
        setRemark(e.target.value);
    }


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
                {loading &&
                    <Loader />
                }
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
                        <form className="form-style mt-4">
                            <div className="modal-body pb-1">
                                <h2 className="text-center mt-3">Select Images</h2>

                                <div className="row">
                                    <div className="col-md-12">
                                        <input
                                            name="images[]"
                                            type="file"
                                            className={`form-control ${fileError ? "is-invalid" : ""}`}
                                            onChange={onSelectFile}
                                        />
                                        {selectedFile &&
                                            <>
                                                <img src={preview} width="100px" alt="preview" />
                                            </>
                                        }
                                        {fileError && <div className="invalid-feedback" role="alert">{fileError}</div>}
                                    </div>
                                    <div className="col-md-12">
                                        <textarea
                                            name="remarks"
                                            value={remark}
                                            className={`form-control ${remarkError ? "is-invalid" : ""}`}
                                            onChange={handleRemark}
                                        >

                                        </textarea>
                                        {remarkError && <div className="invalid-feedback" role="alert">{remarkError}</div>}
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer border-0 pt-0 d-flex align-items-center justify-content-between">
                                <button type="button" onClick={handleSubmit} className="common-button-style next">
                                    Add Image
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
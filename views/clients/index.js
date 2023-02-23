import React, { useState } from "react";
import Image from 'next/image';
import placeholder from "../../images/image-placeholder.png";
import downloadImg from "../../images/download-icon.png";
import { findInObjArr, getSPOCName, renderStatusName, renderStatusClass } from "../../helpers/UtilityHelper";
import Pagination from "../../helpers/Pagination";
import Loader from "../common/loader";
import POTList from "./potList";
import { getReactRequest, postReactRequest, postMultipartReactRequest } from '../../services/axiosReact';
import UploadPOT from "./uploadPOT";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientsListing(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [POTcurrentPage, setPOTCurrentPage] = useState(1);
    const [show, setShow] = useState(false);
    const [uploadshow, setUploadShow] = useState(false);
    const [potData, setPotData] = useState({});
    const [clientid, setClientID] = useState(null);
    const [templateid, setTemplateID] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [currentSpoc, setCurrentSpoc] = useState(0);
    const [keyword, setCurrentKeyword] = useState(null);
    const { clientData, loadData, gcData } = props;

    const handlePagination = (page) => {
        const payload = {
            "page": page,
            "spoc_id": currentSpoc
        }
        if (keyword && keyword.length > 2) {
            payload["keyword"]=keyword;
        }
        loadData(payload);
        setCurrentPage(page);
    }

    const handleView = async (page, client_id, template_id) => {
        setClientID(client_id);
        setTemplateID(template_id);
        setPOTCurrentPage(page);
        const response = await getReactRequest(`/pot?page=${page}&client_id=${client_id}&project_id=${template_id}`);
        if (response && response.data) {
            setPotData(response.data);
        }
        if (!show) {
            handleShow();
        }
    }
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };
    const handleUploadClose = () => {
        setUploadShow(false);
    };
    const handleUploadShow = (id) => {
        const result = findInObjArr(clientData.clietnInfo.response[0].clients.data, id, "id");
        setSelectedClient(result);
        setUploadShow(true);
    };
    const handleSubmit = async (image, remark) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('images[0]', image);
        formData.append('imageType', "clients");
        const response = await postMultipartReactRequest("/uploadImage", formData);
        if (response && response.data) {
            setLoading(false);
            console.log(response.data.response[0].images[0].img_path);
            const payload = {
                "client_id": selectedClient.id,
                "project_id": selectedClient.template_id,
                "image": response.data.response[0].images[0].img_path,
                "remarks": remark,
                "amount": 0
            }
            const uploadData = await postReactRequest(`/pot`, payload);
            if (uploadData && uploadData.data) {
                handleUploadClose();
                setSelectedClient(null);
                toast.success('Image uploaded successfully!');
                //need to handle validation if any from server side
                loadData(payload);
            }
        }
    }
    const handleSpoc = (e) => {
        const { value } = e.target;
        setCurrentSpoc(value);
        setCurrentPage(1);
        const payload = {
            "page": 1,
            "spoc_id": value
        }
        if (keyword && keyword.length > 2) {
            payload["keyword"]=keyword;
        }
        loadData(payload);
    }
    const handleSearch = (e) => {
        const { value } = e.target;
        setCurrentKeyword(value);
        setCurrentPage(1);
        if ((value && value.length > 2) || value==="") {
            const payload = {
                "keyword": value,
                "page": 1,
                "spoc_id": currentSpoc
            }
            loadData(payload);
        }
    }

    const sales_spoc = (gcData.globalConfInfo.response && gcData.globalConfInfo.response.response[0].sales_spoc) ? (gcData.globalConfInfo.response.response[0].sales_spoc) : [];

    return (
        <>

            <div className="data-wrapper">
                {clientData && clientData.loading &&
                    <Loader />
                }
                <div className="d-flex align-items-center justify-content-between searchbar-strip">
                    <div className="d-flex search-spoc w-50 align-items-center">
                        <input type="search" placeholder="Search Clients, Zoho ID" value={keyword} onChange={handleSearch} />
                        <select className="form-select " aria-label="" value={currentSpoc} onChange={handleSpoc}>
                            <option value="0">SPOC</option>
                            {sales_spoc && sales_spoc.map((item) =>
                                <option value={item.id}>{item.title}</option>
                            )}
                        </select>
                    </div>

                </div>

                <div className="table-wrapper">
                    <table className="table table-bordered text-center mt-3 mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Client Name</th>
                                <th scope="col">Proj. Amount (&#x20b9;)</th>
                                <th scope="col">SPOC</th>
                                <th scope="col">POT</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientData && clientData.clietnInfo && clientData.clietnInfo.response && clientData.clietnInfo.response[0] && clientData.clietnInfo.response[0].clients
                                .data.map((item) =>
                                    <tr key={item.id}>
                                        <th scope="row">{item.name}</th>
                                        <td>{item.project_amount}</td>
                                        <td>{getSPOCName(sales_spoc, item.spoc_id, "id")}</td>
                                        <td>
                                            <Image onClick={() => handleView(POTcurrentPage, item.id, item.template_id)} src={placeholder} width={22} height={18} alt="" className="table-icon" />
                                            &nbsp;
                                            <Image onClick={() => handleUploadShow(item.id)} src={downloadImg} width={22} height={18} alt="" className="table-icon" />
                                        </td>
                                        <td className={renderStatusClass(item.status)}>
                                            {renderStatusName(item.status)}
                                        </td>
                                    </tr>
                                )}
                            {(clientData && clientData.clietnInfo && clientData.clietnInfo.response && clientData.clietnInfo.response[0] && clientData.clietnInfo.response[0].clients.data.length === 0) &&
                                <tr key="No record">
                                    <th scope="row" colSpan={5}>No record found</th>

                                </tr>
                            }
                        </tbody>
                    </table>
                    {clientData && clientData.clietnInfo && clientData.clietnInfo.response && clientData.clietnInfo.response[0] && clientData.clietnInfo.response[0].clients.total &&
                        <nav aria-label="Page navigation example" className="navigation-example px-3 py-2">
                            <Pagination
                                currentPage={currentPage}
                                totalCount={clientData.clietnInfo.response[0].clients.total}
                                pageSize={clientData.clietnInfo.response[0].clients.per_page}
                                onPageChange={page => handlePagination(page)}
                                last_page={clientData.clietnInfo.response[0].clients.last_page}
                            />
                        </nav>
                    }
                </div>
            </div>
            <POTList
                show={show}
                handleClose={handleClose}
                potData={potData}
                handlePagination={handleView}
                clientid={clientid}
                templateid={templateid}
                currentPage={POTcurrentPage}
            />
            <UploadPOT
                show={uploadshow}
                handleClose={handleUploadClose}
                handleImageUpload={handleSubmit}
                loading={loading}
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
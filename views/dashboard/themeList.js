import React, { useEffect, useState } from "react";
import Image from "next/image";
import cross from "../../images/cross-icon.png";
import arrow from "../../images/button-arrow.png";
import { data } from "../../helpers/data";
import { Row, Col } from "reactstrap";
export default function ThemeList(props) {
  const [size, setSize] = useState();
  console.log("sdffdsdfs", size);
  const { show, handleClose, dashboardData, themeId, selectTheme } = props;
  const [leftPanelData, setLeftPanelData] = useState([]);
  const [selectedDataId, setSelectedDataId] = useState(0);
  const [selectedDataIdDetails, setSelectedDataIdDetails] = useState([]);
  useEffect(() => {
    const leftData = data.reduce((acc, curr) => {
      if (Object.keys(acc).includes(`${curr.industry_id}`)) {
        acc[curr.industry_id].push(curr);
      } else {
        acc[curr.industry_id] = [curr];
      }
      return acc;
    }, {});
    console.log(leftData);
    let leftSideData = [];
    for (let i = 0; i < Object.keys(leftData).length; i++) {
      leftSideData.push(leftData?.[Object.keys(leftData)[i]]?.[0]);
    }
    setLeftPanelData(leftSideData);
    setSelectedDataId(leftSideData?.[0]?.industry_id);
  }, []);

  useEffect(() => {
    const dataToShow = data.filter((d) => d.industry_id === selectedDataId);
    setSelectedDataIdDetails(dataToShow.slice(1, dataToShow.length));
  }, [selectedDataId]);

  const hideModal = () => {
    handleClose();
  };

  const handlePreview = (previewLink) => {
    window.open(previewLink, "_blank");
  };
  const handleSelect = (id) => {
    setSelectedDataId(id);
    //selectTheme(id);
  };

  return (
    <>
      <div
        className={`modal fade generic-modal-style ${show ? "show" : ""}`}
        id="clientdetails"
        tabIndex="-1"
        aria-labelledby="clientdetailsLabel"
        aria-hidden="true"
        style={show ? { display: "block" } : { display: "none" }}
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
              <h2 className="text-center mt-3">
                Personalised designs for e-Commerce website
              </h2>
              <Row className="mt-3">
                <Col
                  lg="4"
                  sm="12"
                  style={{
                    overflowY: "scroll",
                    borderRight: "2px solid black",
                  }}
                >
                  <h6 style={{ textAlign: "center" }}>Industry</h6>
                  <div className="designs-list w-100 position-relative mt-3">
                    {leftPanelData.map((item) => (
                      <div className="theme" key={item?.id}>
                        <div className="theme-image">
                          <img
                            src={item?.image?.src}
                            width={260}
                            height={180}
                            alt=""
                          />
                          <div className="info-content">
                            <h6>{item?.title}</h6>
                            <div className="d-flex align-items-center justify-content-center group-buttons">
                              <button
                                type="button"
                                onClick={() => handlePreview(item?.link)}
                                className=""
                              >
                                Preview
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSelect(item?.industry_id)}
                                className="revers"
                              >
                                View More
                              </button>
                            </div>
                          </div>
                        </div>
                        <h6>{item?.title}</h6>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col lg="8" sm="12" style={{ overflowY: "scroll" }}>
                  <div className="designs-list w-100 position-relative mt-3 justifyCardImage">
                    {selectedDataIdDetails.length > 0 ? (
                      selectedDataIdDetails.map((item) => (
                        <Col lg="4">
                          <div
                            className="theme "
                            key={item?.id}
                            style={{ padding: "1rem" }}
                          >
                            <div className="image-wrap">
                              <a onClick={() => handlePreview(item?.link)}>
                                <img src={item?.image?.src} />
                              </a>
                            </div>
                            {/* <div className="screen shadow-sm" key={item?.id}>
                              <img
                                src={item?.image?.src}
                                width={260}
                                height={180}
                                alt={item?.title}
                                onClick={() => handlePreview(item?.link)}
                                onLoad={(event) => {
                                  setSize({
                                    height: event.target.clientHeight,
                                  });
                                }}
                                style={{
                                  bottom: `-${size?.height}px`,
                                }}
                              />
                            </div> */}
                            {/* <div className="theme-img"> */}
                            {/* <img
                                src={item?.image?.src}
                                width={260}
                                height={180}
                                alt=""
                              /> */}
                            {/* <div className="info-content">
                                <h6>{item?.title}</h6>
                                <div className="d-flex align-items-center justify-content-center group-buttons">
                                  <button
                                    type="button"
                                    onClick={() => handlePreview(item?.link)}
                                    className=""
                                  >
                                    Preview
                                  </button>
                                </div>
                              </div> */}
                            {/* </div> */}

                            <div className="py-2">
                              <h6>{item.title}</h6>
                            </div>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <h6>No data available</h6>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

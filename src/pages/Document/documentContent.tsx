import { faShare, faFile, faShuffle, faUserGroup, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tabs } from "react-bootstrap";
import Layout from "../../Layout";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DocumentShare from "../../components/document-management/documentShareModal";
import DocumentWorkflow from "../../components/document-management/documentWorkflowAssign";
import DocumentFiles from "../../components/document-management/documentFileAdd";
import DocumentHistory from "../../components/document-management/documentHistory";

import { getSharingLink, unShareLink } from "../../redux/actions/documentActions";

const DocumentContent = (props: any) => {
  const data: any = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  let sharingLink = state.documentData.sharingLink;

  const [shared, setShared] = useState(data.state.documentShareLink || sharingLink);
  const [showShareModal, setShowShareModal] = useState(false);
  
  
  const onShare = () => {    
    dispatch(getSharingLink(data.state.document_id));    
  }

  const onCLick = () => {
    setShared(true);
    setShowShareModal(false);
  }

  const onUnshare = () => {
      // @ts-ignore
      dispatch(unShareLink(data.state.document_id)).then(()=>{
        data.state.documentShareLink = '';
        setShared(false);
        setShowShareModal(false);
    });
    
  }

  return (
    <Layout>
      <div>
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <div>
              <h2 style={{ color: "#4B4B4B", fontWeight: "bold" }}>
                {data.state.title}
              </h2>
            </div>
            <div className="d-flex">
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: shared? "#00e676" : "#00B0FF", border: shared? "#00e676" : "#00B0FF" }}
                  onClick={() => setShowShareModal(true)}
                >
                  <FontAwesomeIcon
                    icon={faShare}
                    style={{ marginRight: "5px" }}
                  />
                  {shared? "Shared" : "Share"}
                </button>
              </div>
            </div>
          </div>
          <hr style={{ color: "black" }} />
        </div>
        <div
          style={{
            marginTop: "15px",
            position: "relative",
            width: "75%",
          }}
        >
          <Tabs
            defaultActiveKey="1"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="1"
              title={
                <div> 
                <FontAwesomeIcon
                  icon={faFile}
                  style={{ marginRight: "5px" }}
                />Files
                </div>
            }>
              <DocumentFiles/>
            </Tab>
            
            <Tab
              eventKey="2"
              title={
                <div>
                  <FontAwesomeIcon
                    icon={faShuffle}
                    style={{ marginRight: "5px" }}
                  />
                  Workflow
                </div>
              }
            >
              <DocumentWorkflow />
            </Tab>
            <Tab
              eventKey="3"
              title={
                <div>
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    style={{ marginRight: "5px" }}
                  />
                  Permissions
                </div>
              }
            ></Tab>
            <Tab
              eventKey="4"
              title={
                <div>
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    style={{ marginRight: "5px" }}
                  />
                  Activity
                </div>
              }
            >
              <DocumentHistory />
            </Tab>
          </Tabs>
        </div>
        <DocumentShare
          show={showShareModal}
          cancel={() => setShowShareModal(false)}
          sharingLink={data.state.documentShareLink? data.state.documentShareLink : sharingLink }
          onShare={onShare}
          onClick={onCLick}
          onUnshare={onUnshare}
          shared={shared}
         />
      </div>
    </Layout>
  );
};

export default DocumentContent;

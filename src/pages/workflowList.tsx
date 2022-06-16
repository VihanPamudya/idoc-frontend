import React, { useEffect, useState } from "react";
import moment from "moment";
import WorkflowCreateUpdate from "../components/workflow-management/workflow-modal";
import DeleteModal from "../components/common/DeleteModal";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import {
  addWorkflow,
  workflowDelete,
  updateWorkflow,
  getPaginatedList,
} from "../redux/actions/workflowActions";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import { Button } from "react-bootstrap";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Bootstrap column details
const columns = [
  {
    //Column data
    formatter: (rowContent: any, row: any) => {
      return (
        <div>
          <img
            src="shuffle.png"
            style={{ marginRight: "10px", width: "18px" }}
          />
          {row.workflowName}
        </div>
      );
    },
    dataField: "workflowName",
    text: "WORKFLOW NAME",
  },
  {
    formatter: (rowContent: any, row: any) => {
      return (
        <div>
          {row.createdBy?.firstName} {row.createdBy?.lastName}
        </div>
      );
    },
    dataField: "createdBy",
    text: "CREATED BY",
  },
  {
    dataField: "createdDateTime",
    text: "CREATED DATE",
    formatter: (rowContent: any, row: any) => {
      var d = new Date(0);
      d.setUTCSeconds(rowContent);
      return moment.utc(d).format("YYYY-MM-DD");
    },
  },
  {
    formatter: (rowContent: any, row: any) => {
      return (
        <div className="text-center actions" style={{ marginRight: "10px" }}>
          <Button
            type="submit"
            className="actions"
            style={{
              marginLeft: "10px",
              backgroundColor: "#00E676",
              border: "#00E676",
              padding: "9px 13px",
              lineHeight: "10px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <img
              src="edit.png"
              alt="edit"
              className="actions"
              style={{
                width: "12px",
                height: "12px",
                marginRight: "7px",
              }}
            />
            Edit
          </Button>
        </div>
      );
    },
    dataField: "",
    text: "",
  },
];

const WorkflowList = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [editWorkflow, setEditWorkflow] = React.useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [selectid, setSelectId] = useState("");
  const [selected, setSelected] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const [showSearch, setShowSearch] = useState("");
  const state = useSelector((state: any) => state);
  const [formState, setformState] = useState({
    workflowName: "",
    steps: [],
    permissionList: [],
  }); //Set form state

  //Bootstrap row events when click a row
  const rowEvents = {
    onClick: (e: any, row: any, rowIndex: number) => {
      let obj = JSON.parse(JSON.stringify(row));
      setformState({
        ...obj,
        steps: obj.steps.sort((a: any, b: any) => a.stepOrder - b.stepOrder),
      });
      setModalShow(true);
      setEditWorkflow(true);
      setSelectId(row.id);
    },
  };

  //Fetch workflow data according to paginated list
  useEffect(() => {
    dispatch(
      getPaginatedList({
        descending: true,
        limit: 5,
        orderFields: ["workflow_id"],
        page: pageNo,
      })
    );
  }, []);

  //Show delete modal
  const handleShowDelete = () => {
    setModalShow(false);
    setShowDelete(true);
  };

  //Hide workflow create/update modal
  const onHide = () => {
    setModalShow(false);
  };

  //Cancel workflow create/update modal
  const cancel = () => {
    setModalShow(false);
  };

  //workflow inactivate
  const handleSelectDelete = () => {
    if (selectid) {
      dispatch(workflowDelete(selectid, pageNo, showSearch));
      setSelectId("");
    } else {
      setSelected([]);
    }
    setShowDelete(false);
  };

  //Submit form
  const formSubmit = (e: any) => {
    e.preventDefault();
    if (editWorkflow) {
      dispatch(updateWorkflow(formState));
    } else {
      dispatch(addWorkflow(formState));
    }

    setModalShow(false);
    setEditWorkflow(false);
    setformState({
      workflowName: "",
      steps: [],
      permissionList: [],
    });
  };

  //Add a new workflow
  const editsave = () => {
    setModalShow(true);
    setEditWorkflow(false);
    setformState({
      workflowName: "",
      steps: [],
      permissionList: [],
    });
  };

  //Get paginated
  const pagination = paginationFactory({
    sizePerPage: 5,
    page: pageNo ? pageNo : 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: state.workflowData.allWorkflowDetails.totalSize,
  });

  //Load workflow details when page change
  const onTableChange = (name: any, e: any) => {
    setPageNo(e.page);
    dispatch(
      getPaginatedList({
        descending: true,
        limit: 5,
        orderFields: ["workflow_id"],
        page: e.page,
      })
    );
  };

  //Search values
  const onKeyHandler = (e: any) => {
    if (e.key === "Enter") {
      var searchValue = {
        filterData: [
          {
            property: "workflow_name",
            operator: "LIKE",
            groupingOperator: "OR",
            value: `${showSearch}`,
          },
        ],
        descending: false,
        limit: 5,
        orderFields: ["workflow_id"],
        page: 1,
      };
      dispatch(getPaginatedList(searchValue));
    }
  };

  return (
    <Layout>
      <div className="container" style={{ paddingTop: "20px" }}>
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <div>
            <h2 style={{ color: "#4B4B4B", fontWeight: "bold" }}>
              Workflow Management
            </h2>
          </div>
          <div className="d-flex">
            <div className="me-2">
              {selected.length != 0 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#FF0000",
                    border: "#FF0000",
                    width: "110px",
                  }}
                  onClick={handleShowDelete}
                >
                  <img
                    src="delete.png"
                    alt="delete"
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "7px",
                    }}
                  />
                  Inactive
                </button>
              )}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: "#00B0FF", border: "#00B0FF" }}
                onClick={editsave}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "5px" }}
                >
                  <path
                    d="M16.7143 7.23995H10.9286V1.90302C10.9286 1.24814 10.3528 0.717041 9.64286 0.717041H8.35714C7.64719 0.717041 7.07143 1.24814 7.07143 1.90302V7.23995H1.28571C0.575759 7.23995 0 7.77105 0 8.42594V9.61192C0 10.2668 0.575759 10.7979 1.28571 10.7979H7.07143V16.1348C7.07143 16.7897 7.64719 17.3208 8.35714 17.3208H9.64286C10.3528 17.3208 10.9286 16.7897 10.9286 16.1348V10.7979H16.7143C17.4242 10.7979 18 10.2668 18 9.61192V8.42594C18 7.77105 17.4242 7.23995 16.7143 7.23995Z"
                    fill="white"
                  />
                </svg>
                Add a Workflow
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between">
          <div
            className="col-md-6"
            style={{
              marginTop: "15px",
              position: "relative",
            }}
          >
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search"
              style={{
                borderRadius: "100px",
                maxWidth: "800px",
                width: "100%",
              }}
              value={showSearch}
              onChange={(e) => {
                setShowSearch(e.target.value);
              }}
              onKeyDown={onKeyHandler}
            />
            <div style={{ position: "absolute", right: "13px", top: "5px" }}>
              <svg
                width="20"
                height="21"
                viewBox="0 0 27 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3719 24.2622L20.1447 17.7168C21.5608 15.5072 22.2595 12.7463 21.8854 9.8044C21.2476 4.80048 17.3459 0.728341 12.5806 0.0941977C5.49556 -0.848131 -0.462119 5.41401 0.434446 12.8611C1.03791 17.8721 4.91259 21.9765 9.67373 22.6437C12.4726 23.0368 15.0997 22.3027 17.2015 20.814L23.4286 27.3594C24.2412 28.2135 25.559 28.2135 26.3716 27.3594C27.1834 26.5042 27.1834 25.1153 26.3719 24.2622ZM4.45978 11.3738C4.45978 7.51434 7.44694 4.37451 11.1187 4.37451C14.7905 4.37451 17.7777 7.51434 17.7777 11.3738C17.7777 15.2332 14.7905 18.373 11.1187 18.373C7.44694 18.373 4.45978 15.2343 4.45978 11.3738Z"
                  fill="#636363"
                  fillOpacity="0.5"
                />
              </svg>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              backgroundColor: "#F1F0F0",
              borderRadius: "10px",
              height: "45px",
              width: "auto",
            }}
          ></div>
        </div>

        <div style={{ marginTop: "25px", color: "#636363" }}>
          <BootstrapTable
            keyField="id"
            data={state.workflowData.allWorkflowDetails.data}
            columns={columns}
            pagination={pagination}
            bordered={false}
            rowEvents={rowEvents}
            onTableChange={onTableChange}
            noDataIndication={<></>}
            remote
            rowStyle={{ color: "#636363" }}
          />
        </div>
        <DeleteModal
          isOpen={showDelete}
          toggleModal={handleCloseDelete}
          handleSelectDelete={handleSelectDelete}
          message="inactive this workflow?"
          header="Inactivate Workflow"
        />
        <WorkflowCreateUpdate
          show={modalShow}
          onHide={onHide}
          editWorkflow={editWorkflow}
          formSubmit={formSubmit}
          formState={formState}
          setformState={setformState}
          cancel={cancel}
          handleShowDelete={handleShowDelete}
        />
      </div>
    </Layout>
  );
};

export default WorkflowList;

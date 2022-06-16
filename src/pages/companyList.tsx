import React, { useEffect, useState } from "react";
import CompanyCreateUpdate from "../components/company-management/company-modal";
import DeleteModal from "../components/common/DeleteModal";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import {
  addCompany,
  companyDelete,
  updateCompany,
  getPaginatedList,
  companyActivate,
  companySearch,
} from "../redux/actions/companyActions";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import { Button } from "react-bootstrap";

const CompanyList = () => {
  const [selectedRows, setSelectRows] = useState([]); //Get selected row details to array
  const [selectid, setSelectId] = useState(""); //Get selected row id
  const dispatch = useDispatch(); //Dispatch data
  const [modalShow, setModalShow] = React.useState(false); //Show company create/update modal
  const [editCompany, setEditCompany] = React.useState(false); //Check whether editing company details or adding a new company
  const [pageNo, setPageNo] = useState(null); //Set paginated list page number
  const [showDelete, setShowDelete] = useState(false); //Show delete modal
  const handleCloseDelete = () => setShowDelete(false); //Close delete modal when click 'no'
  const [showSearch, setShowSearch] = useState(""); //Set search
  const state = useSelector((state: any) => state); //Global access
  const [formState, setformState] = useState({
    companyId: "",
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    totalStorage: "",
    documentUploadURL: "",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    status: "",
  }); //Set form state

  //Bootstrap column details
  const columns = [
    {
      //Column data
      formatter: (rowContent: any, row: any) => {
        return (
          <div>
            <img src="building.png" style={{ marginRight: "10px", width:"23px" }} />
            {row.companyName}
          </div>
        );
      },
      dataField: "companyName", 
      text: "COMPANY NAME", //Column name
    },
    {
      dataField: "createdDateTime",
      text: "CREATED DATE", //Column name
      formatter: (rowContent: any, row: any) => {
        //Column details
        var d = new Date(0);
        d.setUTCSeconds(rowContent);
        return moment.utc(d).format("YYYY-MM-DD");
      },
    },
    {
      //Column data
      formatter: (rowContent: any, row: any) => {
        return (
          <div>
            {row.status == "Active" ? (
              <img
                src="greendot.png"
                style={{ height: "10px", marginRight: "10px" }}
              />
            ) : (
              <img
                src="reddot.png"
                style={{ height: "10px", marginRight: "10px" }}
              />
            )}
            {row.status}
          </div>
        );
      },
      dataField: "status",
      text: "STATUS", //Column name
    },
    {
      //Column data
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
                cursor:"pointer"
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
      dataField: "Actions",
      text: "", //Column name
    },
  ];

  //Bootstrap row events when click a row
  const rowEvents = {
    onClick: (e: any, row: any, rowIndex: number) => {
      setformState(row);
      setModalShow(true);
      setEditCompany(true);
      setSelectId(row.companyId);
    },
  };

  //Fetch company data according to paginated list
  useEffect(() => {
    dispatch(
      getPaginatedList({
        descending: true,
        limit: 5,
        orderFields: ["company_id"],
        page: pageNo,
      })
    );
  }, []);


//Show delete modal 
  const handleShowDelete = () => {
    setModalShow(false);
    setShowDelete(true);
  };

  //Hide company create/update modal
  const onHide = () => {
    setModalShow(false);
  };

  //Cancel company create/update modal
  const cancel = () => {
    setModalShow(false);
  };


  //Company activate and inactivate
  const handleSelectDelete = () => {
    if (formState.status === "Active") {
      dispatch(companyDelete([formState.companyId]));
    } else {
      dispatch(companyActivate(formState.companyId));
    }
    setSelectId("");
    setSelectRows([]);
    setShowDelete(false);
  };

  //Submit form
  const formSubmit = (e: any) => {
    e.preventDefault();
    if (editCompany) {
      dispatch(updateCompany(formState));
    } else {
      // @ts-ignore
      dispatch(addCompany(formState)).then((data: boolean) => {
        if (data) setShowSearch("");
      });
    }
    setModalShow(false);
    setEditCompany(false);
    setformState({
      companyId: "",
      companyName: "",
      companyEmail: "",
      companyAddress: "",
      totalStorage: "",
      documentUploadURL: "",
      contactName: "",
      contactEmail: "",
      contactNumber: "",
      status: "",
    });
  };


  //Add a new company
  const editsave = () => {
    setModalShow(true);
    setEditCompany(false);
    setformState({
      companyId: "",
      companyName: "",
      companyEmail: "",
      companyAddress: "",
      totalStorage: "",
      documentUploadURL: "",
      contactName: "",
      contactEmail: "",
      contactNumber: "",
      status: "",
    });
  };

  //Get paginated
  const pagination = paginationFactory({
    sizePerPage: 5,
    page: pageNo ? pageNo : 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: state.companyData.allCompanyDetails.totalSize,
  });

  //Load company details when page change
  const onTableChange = (name: any, e: any) => {
    setPageNo(e.page);
    dispatch(
      getPaginatedList({
        descending: true,
        limit: 5,
        orderFields: ["company_id"],
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
            property: "company_name",
            operator: "LIKE",
            value: `${showSearch}`,
          },
        ],
        descending: true,
        limit: 5,
        orderFields: ["company_id"],
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
              Company Management
            </h2>
          </div>
          <div className="d-flex">
            <div className="me-2">
              {selectedRows.length != 0 && (
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
                Add a Company
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
            keyField="companyId"
            data={state.companyData.allCompanyDetails.data}
            columns={columns}
            pagination={pagination}
            rowStyle={{ color: "#636363"}}
            classes="table"
            bordered={false}
            rowEvents={rowEvents}
            onTableChange={onTableChange}
            noDataIndication={<></>}
            remote
          />
        </div>
        <DeleteModal
          isOpen={showDelete}
          toggleModal={handleCloseDelete}
          handleSelectDelete={handleSelectDelete}
          header={formState.status === "Active" ? "Inactivate Company" : "Activate Company"}
          message={formState.status === "Active" ? "inactivate this company?" : "activate this company?"}
        />
        <CompanyCreateUpdate
          show={modalShow}
          onHide={onHide}
          handleShowDelete={handleShowDelete}
          editCompany={editCompany}
          formSubmit={formSubmit}
          formState={formState}
          setformState={setformState}
          cancel={cancel}
        />
      </div>
    </Layout>
  );
};

export default CompanyList;

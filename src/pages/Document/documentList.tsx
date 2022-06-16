import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Layout from "../../Layout";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";

import QuickFileUpload from "../../components/fileUpload/fileUploadModal";
import DocumentModal from "../../components/document-management/documentCreateUpdate";
import DocumentHistory from "../../components/document-management/documentHistory";
import DeleteModal from "../../components/common/DeleteModal";

import {
  addDocument,
  getPaginatedList,
  documentInactive,
  updateDocument,
} from "../../redux/actions/documentActions";
import { getDocumentHistoryList } from "../../redux/actions/documentHistoryActions";
import { getTagDetails } from "../../redux/actions/tagActions";


const stepType = [
  { value: "Document Size", label: "File Size" },
  { value: "Date", label: "Date" },
  { value: "Document name", label: "Document name" },
];

const DocumentList = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const state = useSelector((state: any) => state);

  const [modalShow, setModalShow] = React.useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showDocumentHistoryModal, setShowDocumentHistoryModal] = useState(false);
  const [editDocument, setEditDocument] = useState(true);
  const [isFilesUploded, setisFilesUploded] = React.useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [selectId, setSelectId] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    document_id: null,
    title: "",
    description: "",
    language: "english",
    createdDate: "",
    tags: [],
  });

  const columns = [
    {
      formatter: (rowContent: any, row: any) => {
        return (
          <div>
            <img src="folder 1.png" style={{ marginRight: "10px" }} />
            {row.title}
          </div>
        );
      },
      dataField: "username",
      text: "Title",
    },
    {
      formatter: (rowContent: any, row: any) => {
        return <div>{row.createdDate}</div>;
      },
      dataField: "name",
      text: "Date Created",
      sort: true,
    },
    {
      formatter: (rowContent: any, row: any) => {
        return <div>{row.description.replace(/<[^>]+>/g, "")}</div>;
      },
      dataField: "price",
      text: "Description",
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
                lineHeight: '10px',
                fontSize: 13,
              }}
              onClick={() => onClickEdit(row.document_id)}
            >
              <img
                src="edit.png"
                alt="edit"
                className="actions"
                style={{
                  width: "12px",
                  height: "12px",
                  marginRight: "7px",
                  marginTop: "-3px"
                }}
              />
              Edit
            </Button>
          </div>
        );
      },
      dataField: "Actions",
      text: "",
    },
  ];

  const pagination = paginationFactory({
    sizePerPage: 5,
    page: pageNo ? pageNo : 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: state.documentData.allDocumentDetailes.totalSize,
  });

  useEffect(() => {
    dispatch(
      getPaginatedList({
        descending: true,
        limit: 5,
        orderFields: ["document_id"],
        page: pageNo,
      })
    );
  }, []);

  const formSubmit = (e: any) => {
    e.preventDefault();

    if (editDocument) {
      dispatch(updateDocument(form));
    } else {
      // @ts-ignore
      dispatch(addDocument(form)).then((data: boolean) => {
        if (data) setSearch("");
      });
    }
    setShowDocumentModal(false);
    setEditDocument(false);
    setForm({
      document_id: null,
      title: "",
      description: "",
      language: "english",
      createdDate: "",
      tags: [],
    });
  };

  const onClick = () => {
    setModalShow(true);
  };

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = () => {
    setShowDocumentModal(false);
    setModalShow(false);
    setShowDelete(true);
  };

  const handleSelectDelete = () => {
    if (selectId) {
      dispatch(documentInactive(selectId, pageNo, search));
      setSelectId("");
    }
    setShowDelete(false);
  };

  //function for edit button
  const onClickEdit = (document_id: any) => {
    var document = state.documentData.allDocumentDetailes.data.filter(
      (item: any) => item.document_id === document_id
    )[0];
    setShowDocumentModal(true);
    setForm(document);
    setEditDocument(true);
    setSelectId(document.document_id);
    dispatch(getTagDetails());
  };

  //table row events
  const rowEvents = {
    onClick: (e: any, row: any, rowIndex: number) => {
      if (e.target.className === "") {
        // <setForm(row);
        // setShowDocumentHistoryModal(true);
        setSelectId(row.document_id);
        dispatch(getDocumentHistoryList(row.document_id))
        naviagate("/content", {state: row});
      }

    },
  };

  const onTableChange = (name: any, e: any) => {
    setPageNo(e.page);
    dispatch(
      getPaginatedList({
        descending: true,
        limit: 5,
        orderFields: ["document_id"],
        page: e.page,
      })
    );
  };

  //function for search bar when the enter key pressed.
  const onKeyHandler = (event: any) => {
    if (event.key === "Enter") {
      var searchValue = {
        filterData: [
          {
            property: "document_title",
            operator: "LIKE",
            value: `${event.target.value}`,
          },
        ],
        descending: true,
        limit: 5,
        orderFields: ["document_id"],
        page: 1,
      };
      dispatch(getPaginatedList(searchValue));
    }
  };

  return (
      <Layout>
        <div style={{ paddingTop: "20px" }}>
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <div>
                <h2 style={{ color: "#4B4B4B", fontWeight: "bold" }}>
                  Document Management
                </h2>
              </div>
              <div className="d-flex">
              <div className="upload" style={{ paddingRight: "6px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#00B0FF", border: "#00B0FF" }}
                    onClick={onClick}
                  >
                    <FontAwesomeIcon
                      icon={faUpload}
                      style={{ marginRight: "5px" }}
                    />
                    Quick Upload
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#00B0FF", border: "#00B0FF" }}
                    onClick={() => {
                      setForm({
                        document_id: null,
                        title: "",
                        description: "",
                        language: "english",
                        createdDate: "",
                        tags: [],
                      });
                      dispatch(getTagDetails());
                      setShowDocumentModal(true);
                      setEditDocument(false);
                      
                    }}
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
                    Add a Document
                  </button>
                </div>
              </div>
            </div>

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={onKeyHandler}
                autoComplete="off"
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

            <div style={{ marginTop: "25px", color: "#636363" }}>
              <BootstrapTable
                keyField="document_id"
                data={state.documentData.allDocumentDetailes.data}
                columns={columns}
                pagination={pagination}
                rowStyle={{ color: "#636363", cursor: "pointer", lineHeight: "40px" }}
                classes="table table-hover"
                bordered={false}
                rowEvents={rowEvents}
                onTableChange={onTableChange}
                noDataIndication={<></>}
                remote
              />
            </div>
            <DocumentModal
              show={showDocumentModal}
              form={form}
              setForm={setForm}
              formSubmit={formSubmit}
              editDocument={editDocument}
              handleShowDelete={handleShowDelete}
              cancel={() => setShowDocumentModal(false)}
              tags={state.tagData.allTagDetails}
            />

            {/* <DocumentHistory
              show={showDocumentHistoryModal}
              onHide={() => setShowDocumentHistoryModal(false)}/> */}

            <QuickFileUpload
              show={modalShow}
              handleShowDelete={handleShowDelete}
              cancel={() => setModalShow(false)}
            />

            <DeleteModal
              isOpen={showDelete}
              toggleModal={handleCloseDelete}
              handleSelectDelete={handleSelectDelete}
              message="inactive this document?"
            />
          </div>
        </div>
      </Layout>
    
  );
};

export default DocumentList;

import React from "react";
import { useState, useEffect } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next";
import {  useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  userGroupDelete,
  updateUserGroup,
  addUserGroup,
  getPaginatedList,
} from "../redux/actions/userGroupActions";

import UserGroupModal from "../components/user-group/user-group-modal";
import DeleteModal from "../components/common/DeleteModal";
import { getUsersList } from "../redux/actions/userActions";
import Layout from "../Layout";

const columns = [
  {
    formatter: (rowContent: any, row: any) => {
      return (
        <div>
          <img src="Vector.png" style={{ marginRight: "10px" }} />
          {row.name}
        </div>
      );
    },
    dataField: "name",
    text: "NAME",
  },
  {
     formatter: (rowContent: any, row: any) => {
        return <div>{row.member_count}</div>;
    },
    dataField: "member_count",
    text: "MEMBERS",
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
];

const options = {
  paginationSize: 1,
  pageStartIndex: 1,
  firstPageText: "First",
  prePageText: "Previous",
  nextPageText: "Next",
  lastPageText: "Last",
  nextPageTitle: "First page",
  prePageTitle: "Pre page",
  firstPageTitle: "Next page",
  lastPageTitle: "Last page",
  showTotal: true,
  totalSize: 10,
  disablePageTitle: true,
  sizePerPageList: [
    {
      text: "9",
      value: 2,
    },
  ],
};

const GroupList = () => {
    const dispatch = useDispatch();

    const [modalShow, setModalShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editGroup, setEditgroup] = useState(true);
    const [selected, setSelected] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [pageNo, setPageNo] = useState(1);
  const [form, setForm] = useState({
    name: "",
    parentGroup_id: 0,
    parentGroup_name: "",
  });
  const [search, setSearch] = useState("");
  const state = useSelector((state: any) => state);

  const tableRowEvents = {
    onClick: (e: any, row: any, rowIndex: number) => {
      let parentgroup = state.userGroupData.allUserGroupDetails.data.find(
        (group: any) => group.id == row.parentGroup_id
      );
      if (parentgroup != null) {
        let newForm = { ...row, parentGroup_name: parentgroup.name };
        setForm(newForm);
      } else {
        setForm(row);
      }
      setSelectedId(row.id);
      setModalShow(true);
      setEditgroup(true);
    },
  };

//   const selectRow: SelectRowProps<any> = {
//     mode: "checkbox",
//     onSelect: (row, isSelected, rowIndex) => {
//       let newSelected = JSON.parse(JSON.stringify(selected));
//       if (isSelected) {
//         newSelected.push(row.id);
//       } else {
//         var index = newSelected.indexOf(row.id);
//         newSelected.splice(index, 1);
//       }
//       setSelected(newSelected);
//     },
//     onSelectAll: (isSelect, rows, e) => {
//       let array = JSON.parse(JSON.stringify(selected));

//       if (isSelect) {
//         for (let i = 0; i < rows.length; i++) {
//           array.push(rows[i].id);
//         }
//       } else {
//         array.splice(0, rows.length);
//       }
//       setSelected(array);
//     },
//   };

  const formSubmit = (e: any) => {
    e.preventDefault();

    if (editGroup) {
      dispatch(updateUserGroup(form));
    } else {
      // @ts-ignore
      dispatch(addUserGroup(form)).then((data: boolean)=>{
        if(data) setSearch('')
      })
    }
    setModalShow(false);
    setEditgroup(false);
    setForm({
      name: "",
      parentGroup_id: 0,
      parentGroup_name: "",
    });
  };

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = () => {
    setModalShow(false);
    setShowDelete(true);
  };

  useEffect(() => {
    dispatch(
      getPaginatedList({
        descending: true,
        limit: 5,
        orderFields: ["group_id"],
        page: pageNo,
      })
    );
  }, []);

  const onGroupDelete = () => {
    setShowDelete(true);
  };

  const handleSelectDelete = () => {
    if (selectedId) {
      dispatch(userGroupDelete(selectedId, pageNo, search));
      setSelectedId("");
    } else {
      // dispatch(userGroupDelete(selected));
      setSelected([]);
    }
    setShowDelete(false);
  };

  const onKeyHandler = (e: any) => {
    if (e.key === "Enter") {
      var searchValue = {
        filterData: [
          {
            property: "group_name",
            operator: "LIKE",
            value: `${search}`,
          },
        ],
        descending: true,
        limit: 5,
        orderFields: ["group_id"],
        page: 1,
      };
      dispatch(getPaginatedList(searchValue));
    }
  };
  const cancel = () => {
    setModalShow(false);
  };

  const pagination = paginationFactory({
    sizePerPage: 5,
    page: pageNo ? pageNo : 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: state.userGroupData.allUserGroupDetails.totalSize,
  });

  const onTableChange = (name: any, e: any) => {
    setPageNo(e.page);
    dispatch(
      getPaginatedList({
        // filterData: [{
        //     property: "status",
        //     operator: "EQUAL",
        //     value: "active"
        // }],
        descending: true,
        limit: 5,
        orderFields: ["group_id"],
        page: e.page,
      })
    );
  };
  return (
    <Layout>
      <div>
        <div className="container">
          <div className="d-flex flex-row">
            <div className="Home" style={{ padding: "10px" }}>
              <img
                src="/Home_Button.png"
                alt="img"
                style={{ width: "45px", height: "25px" }}
              />
            </div>
          </div>
          <hr style={{ color: "#636363" }} />
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <div>
              <h2 style={{ color: "#4B4B4B", fontWeight: "bold" }}>
                Group Management
              </h2>
            </div>
            <div className="d-flex">
              <div className="me-2">
                {selected.length != 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#FF0000", border: "#00B0FF" }}
                    onClick={onGroupDelete}
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
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#00B0FF", border: "#00B0FF" }}
                  onClick={() => {
                    setForm({
                      name: "",
                      parentGroup_id: 0,
                      parentGroup_name: "",
                    });
                    setModalShow(true);
                    setEditgroup(false);
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
                  Add a Group
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
              keyField="id"
              data={state.userGroupData.allUserGroupDetails.data}
              columns={columns}
              pagination={pagination}
              rowStyle={{ color: "#636363" }}
              classes="table table-hover"
              bordered={false}
              rowEvents={tableRowEvents}
              onTableChange={onTableChange}
              noDataIndication={<></>}
              remote
            />
          </div>
        </div>
        <UserGroupModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          editGroup={editGroup}
          form={form}
          setForm={setForm}
          formSubmit={formSubmit}
          handleShowDelete={handleShowDelete}
          groups={state.userGroupData.allUserGroupDetails.data}
          cancel={cancel}
        />
        <DeleteModal
          isOpen={showDelete}
          toggleModal={handleCloseDelete}
          handleSelectDelete={handleSelectDelete}
          message="inactive this user group?"
        />
      </div>
    </Layout>
  );
};

export default GroupList;

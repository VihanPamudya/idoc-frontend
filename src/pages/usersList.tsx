import React from "react";
import { useState, useEffect } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "react-pro-sidebar/dist/css/styles.css";

import { getUsersList, userInactive } from "../redux/actions/userActions";
import { getRolesList } from "../redux/actions/roleActions";
import { getGroupList } from "../redux/actions/groupActions";
import UserCreateUpdate from "../components/user-management/userCreateUpdate";
import {
  addUser,
  updateUser,
  getPaginatedList,
} from "../redux/actions/userActions";
import DeleteModal from "../components/common/DeleteModal";
import {
  sendForgotPasswordLink,
  userLogout,
} from "../redux/actions/authActions";
import Layout from "../Layout";

const columns = [
  {
    formatter: (rowContent: any, row: any) => {
      return (
        <div>
          <img src="User.png" style={{ marginRight: "10px" }} />
          {row.firstName} {row.lastName}
        </div>
      );
    },
    dataField: "firstName",
    text: "USERNAME",
  },
  {
    dataField: "",
    text: "ROLE",
    formatter: (rowContent: any, row: any) => {
      return row.roleList.map((item: any) => {
        return (
          <div style={{ marginRight: "10px" }} key={item.id}>
            {item.role.name}
          </div>
        );
      });
    },
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

const UsersList = () => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const [pageNo, setPageNo] = useState(1);
  const [showSearch, setShowSearch] = useState("");
  const state = useSelector((state: any) => state);
  const [selectid, setSelectId] = useState("");
  const [selected, setSelected] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [editUser, setEditUser] = React.useState(false);
  const [formState, setformState] = useState({
    username: "",
    email: "",
    storage: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    password: "",
    groups: "",
    epfNumber: "",
    firstName: "",
    lastName: "",
    roleList: [],
    groupList: [],
  });

  const roleData = useSelector((state: any) =>
    state.roleData.allRoleDetails.map((item: any) => {
      return { value: item.id, label: item.name };
    })
  );

  const groupData = useSelector((state: any) =>
    state.groupData.allGroupDetails.map((item: any) => {
      return { value: item.id, label: item.name };
    })
  );

  useEffect(() => {
    dispatch(
      getPaginatedList({
        descending: true,
        limit: 5,
        orderFields: ["epf_number"],
        page: pageNo,
      })
    );
    dispatch(getRolesList());
    dispatch(getGroupList());
  }, []);

  // const selectRow: SelectRowProps<any> = {
  //   mode: "checkbox",
  //   onSelect: (row, isSelect, rowIndex, e) => {
  //     let rows = JSON.parse(JSON.stringify(selectedRows));

  //     if (isSelect) {
  //       rows.push(row.epfNumber);
  //     } else {
  //       const unSelectedRow = rows.findIndex((item: any) => {
  //         item === row.epfNumber;
  //       });
  //       rows.splice(unSelectedRow, 1);
  //     }
  //     setSelectRows(rows);
  //   },
  //   onSelectAll: (isSelect, rows, e) => {
  //     let array = JSON.parse(JSON.stringify(selectedRows));

  //     if (isSelect) {
  //       for (let i = 0; i < rows.length; i++) {
  //         array.push(rows[i].epfNumber);
  //       }
  //     } else {
  //       array.splice(0, rows.length);
  //     }
  //     setSelectRows(array);
  //   },
  // };

  const rowEvents = {
    onClick: (e: any, row: any, rowIndex: number) => {
      console.log(row);
      setformState(row);
      setModalShow(true);
      setEditUser(true);
      setSelectId(row.epfNumber);
    },
  };

  const handleSelectDelete = () => {
    if (selectid) {
      dispatch(userInactive(selectid, pageNo, showSearch));
      setSelectId("");
    } else {
      setSelected([]);
    }
    setShowDelete(false);
  };

  const handleShowDelete = () => {
    setModalShow(false);
    setShowDelete(true);
  };

  const cancel = () => {
    setModalShow(false);
  };

  const onHide = () => {
    setModalShow(false);
  };

  const formSubmit = (e: any) => {
    e.preventDefault();
    if (editUser) {
      console.log(formState);
      dispatch(updateUser(formState));
    } else {
      dispatch(addUser(formState));
    }

    setModalShow(false);
    setEditUser(false);
    setformState({
      username: "",
      email: "",
      storage: "",
      phone: "",
      gender: "",
      dob: "",
      address: "",
      password: "",
      groups: "",
      epfNumber: "",
      firstName: "",
      lastName: "",
      roleList: [],
      groupList: [],
    });
  };
  const editsave = () => {
    setModalShow(true);
    setEditUser(false);
    setformState({
      username: "",
      email: "",
      storage: "",
      phone: "",
      gender: "",
      dob: "",
      address: "",
      password: "",
      groups: "",
      epfNumber: "",
      firstName: "",
      lastName: "",
      roleList: [],
      groupList: [],
    });
  };

  const sendPWResetLink = () => {
    dispatch(sendForgotPasswordLink(formState.epfNumber));
  };

  const pagination = paginationFactory({
    sizePerPage: 5,
    page: pageNo ? pageNo : 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: state.userData.allUserDetails.totalSize,
  });

  const onTableChange = (name: any, e: any) => {
    setPageNo(e.page);
    dispatch(
      getPaginatedList({
        descending: false,
        limit: 5,
        orderFields: ["epf_number"],
        page: e.page,
      })
    );
  };

  const onKeyHandler = (e: any) => {
    if (e.key === "Enter") {
      var searchValue = {
        filterData: [
          {
            property: "user_name",
            operator: "LIKE",
            value: `${showSearch}`,
          },
        ],
        descending: false,
        limit: 5,
        orderFields: ["epf_number"],
        page: 1,
      };
      dispatch(getPaginatedList(searchValue));
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-row justify-content-between mt-2">
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
              User Management
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
                    width: "100px",
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
                  Delete
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
                Add a User
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
            style={{ borderRadius: "100px", maxWidth: "800px", width: "100%" }}
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
        <div style={{ marginTop: "25px", color: "#636363" }}>
          <BootstrapTable
            keyField="epfNumber"
            data={state.userData.allUserDetails.data}
            columns={columns}
            pagination={pagination}
            rowStyle={{ color: "#636363", cursor: "pointer" }}
            classes="table table-hover"
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
        />
        <UserCreateUpdate
          show={modalShow}
          onHide={onHide}
          handleShowDelete={handleShowDelete}
          editUser={editUser}
          formSubmit={formSubmit}
          formState={formState}
          setformState={setformState}
          roleData={roleData}
          groupData={groupData}
          sendReset={sendPWResetLink}
          cancel={cancel}
        />
      </div>
    </Layout>
  );
};

export default UsersList;

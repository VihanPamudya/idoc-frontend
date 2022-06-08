import React, { useEffect, useState } from "react";
import UserRoleCreate from "../components/user-role/userRole-modal";
import DeleteModal from "../components/common/DeleteModal";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import {
  addUserRole,
  getPaginatedList,
  updateUserRole, userRoleActivate,
  userRoleDelete,
} from "../redux/actions/userRoleActions";
import {getPackageList} from "../redux/actions/packagesActions";

const columns = [
  {
    formatter: (rowContent: any, row: any) => {
      return (
        <div>
          <img src="User.png" style={{ marginRight: "10px" }} />
          {row.name}
        </div>
      );
    },
    dataField: "name",
    text: "NAME",
  },
  {
    dataField: "description",
    text: "DESCRIPTION",
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
            <div>
                {row.status == "Active" ? (
                    <img
                        src="greendot.png"
                        style={{height: "10px", marginRight: "10px"}}
                    />
                ) : (
                    <img
                        src="reddot.png"
                        style={{height: "10px", marginRight: "10px"}}
                    />
                )}
                {row.status}
            </div>
        );
    },
    dataField: "status",
    text: "STATUS",
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

const UserRoleList = () => {
  const state = useSelector((state: any) => state);

  const [selectedRows, setSelectRows] = useState([]);

  const selectRow: SelectRowProps<any> = {
    mode: "checkbox",
    onSelect: (row, isSelect, rowIndex, e) => {
      let rows = JSON.parse(JSON.stringify(selectedRows));

      if (isSelect) {
        rows.push(row.id);
      } else {
        const unSelectedRow = rows.findIndex((item: any) => {
          item === row.id;
        });
        rows.splice(unSelectedRow, 1);
      }
      setSelectRows(rows);
    },
    onSelectAll: (isSelect, rows, e) => {
      let array = JSON.parse(JSON.stringify(selectedRows));

      if (isSelect) {
        for (let i = 0; i < rows.length; i++) {
          array.push(rows[i].id);
        }
      } else {
        array.splice(0, rows.length);
      }
      setSelectRows(array);
    },
  };

  const rowEvents = {
    onClick: (e: any, row: any, rowIndex: number) => {
      let packages = JSON.parse(JSON.stringify(state.packageData.allPackageDetails))
      let packageList = row.permissions?.packageList;

      if(packageList) {
        for (let i = 0; i < packageList.length; i++) {
          let packId = packages.findIndex((el: any) => el.id === packageList[i].id)

          if(packageList[i].subPackageList && packageList[i].subPackageList.length) {
            for (let j = 0; j < packageList[i].subPackageList.length; j++) {
              let subPack = packageList[i].subPackageList[j];
              let subPackId = packages[packId].subPackageList.findIndex((el: any) => el.id === subPack.id)

              if (subPack.actionList && subPack.actionList.length) {
                for (let k = 0; k < subPack.actionList.length; k++) {
                  let actionId = packages[packId].subPackageList[subPackId].actionList.findIndex((el: any) => el.id === subPack.actionList[k].id)

                  packages[packId].subPackageList[subPackId].actionList[actionId].isSelected = true;
                }
              }

              for (let l = 0; l < subPack.moduleList.length; l++) {
                let module = subPack.moduleList[l];
                let moduleId = packages[packId].subPackageList[subPackId].moduleList.findIndex((el: any) => el.id === module.id)

                if (module.actionList && module.actionList.length) {
                  for (let k = 0; k < module.actionList.length; k++) {
                    let actionId = packages[packId].subPackageList[subPackId].moduleList[moduleId].actionList.findIndex((el: any) => el.id === module.actionList[k].id)

                    packages[packId].subPackageList[subPackId].moduleList[moduleId].actionList[actionId].isSelected = true;
                  }
                }
              }
            }
          }
        }
      }

      let obj = {
        id: row.id,
        name: row.name,
        description: row.description,
        packages: packages,
        status: row.status
      }
      setformState(obj);
      setModalShow(true);
      setEditUserRole(true);
    },
  };

  useEffect(() => {
    dispatch(
      getPaginatedList({
        descending: false,
        limit: 5,
        orderFields: ["id"],
        page: pageNo,
      })
    );
    dispatch(getPackageList())
  }, []);

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [editUserRole, setEditUserRole] = React.useState(false);
  const [pageNo, setPageNo] = useState(null);
  const [formState, setformState] = useState({
    id:"",
    name: "",
    description: "",
    packages: [],
    status:"",
  });

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);

  const [showSearch, setShowSearch] = useState("");

  const handleShowDelete = () => {
    setModalShow(false);
    setShowDelete(true);
  };

  const onHide = () => {
    setModalShow(false);
  };

  const handleSelectDelete = () => {
    if (formState.status === "Active") {
      dispatch(userRoleDelete(formState.id));
    } else {
      dispatch(userRoleActivate(formState.id));
    }
    setShowDelete(false);

    setSelectRows([]);
    setShowDelete(false);
  };

  const formSubmit = (e: any) => {
    e.preventDefault();
    let updatedPackages = formState.packages.map((el:any)=>{
      return{
          id:el.id,
          name: el.name,
          description: el.description,
          subPackageList:el.subPackageList.map((el2:any)=>{
            return {
              id:el2.id,
              name: el2.name,
              description: el2.description,
              actionList: el2.actionList.filter((el3: any) => el3.isSelected),
              packageId: el2.packageId,
              sequence: el2.sequence,
              moduleList: el2.moduleList.map((el3:any)=>{
                if(el3.actionList.filter((el4: any) => el4.isSelected).length){
                  return{
                    subPackageId: el3.subPackageId,
                    id:el3.id,
                    name: el3.name,
                    description: el3.description,
                    actionList: el3.actionList.filter((el4: any) => el4.isSelected),
                  }
                }
              })
            }
          })
      }
    })

    let newPackages = [];

    for (let i=0; i<updatedPackages.length; i++){
      let available = false;
      for(let j=0; j<updatedPackages[i].subPackageList.length; j++){
        let subPack = updatedPackages[i].subPackageList[j];
        if(subPack.actionList && subPack.actionList.length){
          newPackages.push(updatedPackages[i])
          break;
        } else if(subPack.moduleList){
          for(let k=0; k<subPack.moduleList.length; k++){
            let module = subPack.moduleList[k];
            if(module?.actionList.length){
              newPackages.push(updatedPackages[i])
              available = true;
              break;
            }
          }
        }
        if(available){
          break;
        }
      }
    }

    let obj = {
      id: formState.id,
      name: formState.name,
      description: formState.description,
      permissions: {
        packageList: newPackages
      }
    }

    if (editUserRole) {
      dispatch(updateUserRole(obj));
    } else {
      // @ts-ignore
      dispatch(addUserRole(obj)).then((data: boolean)=>{
        if(data) setShowSearch('')
      });;
    }

    setModalShow(false);
    setEditUserRole(false);
    setformState({
      id:"",
      name: "",
      description: "",
      packages: [],
      status: ""
    });
  };

  const editsave = () => {
    setModalShow(true);
    setEditUserRole(false);
    setformState({
      id:"",
      name: "",
      description: "",
      packages: state.packageData.allPackageDetails,
      status: ""
    });
  };

  const pagination = paginationFactory({
    sizePerPage: 5,
    page: pageNo ? pageNo : 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: state.userRoleData.allUserRoleDetails.totalSize,
  });

  const onTableChange = (name: any, e: any) => {
    setPageNo(e.page);
    dispatch(
      getPaginatedList({
        descending: false,
        limit: 5,
        orderFields: ["id"],
        page: e.page,
      })
    );
  };

  const onKeyHandler = (e: any) => {
    if (e.key === 'Enter') {
      var searchValue = {
        filterData: [{
          property: "name",
          operator: "LIKE",
          value: `${showSearch}`
        }],
        limit: 5,
        page: 1
      }
      dispatch(getPaginatedList(searchValue));
    }
  };

  return (
    <Layout>
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
              User Role Management
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
                Add a UserRole
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
            data={state.userRoleData.allUserRoleDetails.data}
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
          header={formState.status === "Active" ? "Inactivate Role" : "Activate Role"}
          message={formState.status === "Active" ? "inactivate this role" : "activate this role"}
        />

        <UserRoleCreate
          show={modalShow}
          onHide={onHide}
          handleShowDelete={handleShowDelete}
          editUserRole={editUserRole}
          formSubmit={formSubmit}
          formState={formState}
          setformState={setformState}
        />
      </div>
    </Layout>
  );
};

export default UserRoleList;

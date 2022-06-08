import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../components/common/DeleteModal";
import TagCreateModal from "../components/Tag/tag-modal";
import Layout from "../Layout";
import {
  addTag,
  getChildrenTagDetails,
  getTagDetails,
  tagDelete,
  updateTag,
} from "../redux/actions/tagActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTags } from "@fortawesome/free-solid-svg-icons";
import DropdownTreeSelect from "react-dropdown-tree-select";
import TreeMenu, {
  defaultChildren,
  ItemComponent,
} from "react-simple-tree-menu";

const TagList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editTag, setEditTag] = useState(false);
  const state = useSelector((state: any) => state);
  const [selectid, setSelectId] = useState("");
  const [isChildOpen, setIsChildOpen] = useState(true);
  const dispatch = useDispatch();

  const onClicktag = (row: any) => {
    setformState(row);
    setModalShow(true);
    setEditTag(true);
    setSelectId(row.id);
  };

  const onClickPlusButton = (row: any) => {
    dispatch(getChildrenTagDetails(row));
    setIsChildOpen(false);
  };

  const onClosePlusButton = () => {
    setIsChildOpen(true);
  };

  const [formState, setformState] = useState({
    name: "",
    color: "",
    parentTag_id: 0,
  });

  const onHide = () => {
    setModalShow(false);
    setEditTag(false);
  };

  const editsave = () => {
    setModalShow(true);
    setEditTag(false);
    setformState({
      name: "",
      color: "",
      parentTag_id: 0,
    });
  };

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = () => {
    setModalShow(false);
    setShowDelete(true);
  };

  const formSubmit = (e: any) => {
    e.preventDefault();

    if (editTag) {
      dispatch(updateTag(formState));
    } else {
      dispatch(addTag(formState));
    }
    setModalShow(false);
    setEditTag(false);
    setformState({
      name: "",
      color: "",
      parentTag_id: 0,
    });
  };

  const handleSelectDelete = () => {
    dispatch(tagDelete(selectid));
    setShowDelete(false);
    setSelectId("");
    setShowDelete(false);
  };

  useEffect(() => {
    dispatch(getTagDetails());
    dispatch(getChildrenTagDetails(selectid));
  }, []);

  const cancel = () => {
    setModalShow(false);
  };

  console.log(state.tagData);

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
        <div>
          <hr style={{ color: "#636363" }} />
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <div>
            <h2 style={{ color: "#4B4B4B", fontWeight: "bold" }}>
              Tag Management
            </h2>
          </div>
          <div className="d-flex">
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
                Add a Tag
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
                maxWidth: "1000px",
                width: "100%",
              }}
              // value={showSearch}
              // onChange={(e) => {
              //     setShowSearch(e.target.value);
              // }}
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
        {/* <div className="mt-4">
          {state.tagData.allTagDetails.map((e: any) => {
            return (
              <div className="d-flex flex-column">
                <div className="d-flex flex-row mt-1">
                <div onClick={() => onClickPlusButton(e)}>
                  <div
                    style={{
                      height: "20px",
                      width: "20px",
                      border: "1px solid",
                      borderColor: e.color,
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <span className="ml-4">
                      {isChildOpen ? (
                        <FontAwesomeIcon
                        className="ml-4"
                        icon={faPlus}
                        style={{ color: e.color, cursor: "pointer" }}
                      />
                      ):(
                        <FontAwesomeIcon
                        className="ml-4"
                        icon={faMinus}
                        style={{ color: e.color, cursor: "pointer" }}
                      />
                      )}
                    </span>
                  </div>
                </div>
                <div
                  className="me-4 clickable hover-blue ms-4"
                  onClick={() => onClicktag(e)}
                >
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faTags}
                    style={{ color: e.color }}
                  />{" "}
                  <span style={{ color: e.color, marginRight: "10px" }}>
                    {e.name}
                  </span>
                </div>
                </div>
                <div style={{marginLeft:"50px"}} className="mt-2">
                  {e.childTags && e.childTags.map((item: any) => {
                    return (
                      <div
                        className="me-4 clickable hover-blue ms-4"
                        onClick={() => onClicktag(item)}
                      >
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faTags}
                          style={{ color: item.color }}
                        />{" "}
                        <span style={{ color: item.color, marginRight: "10px" }}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div> */}
        <div style={{ listStyleType: "none", display: "inline" }}>
          {state.tagData.allTagDetails.map((e: any) => {
            return (
              <TreeMenu
                cacheSearch
                data={[
                  {
                    key: e.id,
                    label: e.name,
                    // children: e.childTags.map((item: any) => {
                    //   nodes:
                    //   [
                    //     {
                    //       key: item.id,
                    //       label: item.name,
                    //     },
                    //   ];
                    // }),
                    
                    nodes: [
                      {
                        key: e.id,
                        label: e.name,
                      },
                    ],
                  },
                ]}
                debounceTime={125}
                disableKeyboard={false}
                hasSearch={false}
                onClickItem={() => onClicktag(e)}
                resetOpenNodesOnDataUpdate={false}
              />
            );
          })}
        </div>

        <TagCreateModal
          show={modalShow}
          onHide={onHide}
          handleShowDelete={handleShowDelete}
          formSubmit={formSubmit}
          editTag={editTag}
          formState={formState}
          setformState={setformState}
          tags={state.tagData.allTagDetails}
          cancel={cancel}
        />
        <DeleteModal
          isOpen={showDelete}
          toggleModal={handleCloseDelete}
          handleSelectDelete={handleSelectDelete}
          message="inactive this tag?"
        />
      </div>
    </Layout>
  );
};

export default TagList;

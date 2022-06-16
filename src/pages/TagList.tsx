import React, { Children, useEffect, useState } from "react";
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
import TreeMenu, { ItemComponent } from "react-simple-tree-menu";

const TagList = () => {
  const [modalShow, setModalShow] = React.useState(false); //Show tag create/update modal
  const [showDelete, setShowDelete] = useState(false); //Show delete modal
  const [editTag, setEditTag] = useState(false); //Check whether editing tag or adding a new tag
  const state = useSelector((state: any) => state); //Global access
  const [selectid, setSelectId] = useState(""); //Get selected id
  const dispatch = useDispatch(); //Dispatch data
  const handleCloseDelete = () => setShowDelete(false); //Close delete modal when click 'no'
  const [formState, setformState] = useState({
    name: "",
    color: "",
    parentTag_id: 0,
  }); //Set form state

  //Editing a existing tag
  const onClicktag = (row: any) => {
    let data = {
      id: row.id ? row.id : row.key,
      name: row.label,
      color: row.color,
      parentTag_id: row.parentTag_id ? row.parentTag_id : 0,
    };
    setformState(data);
    setModalShow(true);
    setEditTag(true);
    setSelectId(data.id);
  };

  //Hide tag create/update modal
  const onHide = () => {
    setModalShow(false);
    setEditTag(false);
  };

  //Adding a new tag
  const editsave = () => {
    setModalShow(true);
    setEditTag(false);
    setformState({
      name: "",
      color: "",
      parentTag_id: 0,
    });
  };

  //Show delete modal
  const handleShowDelete = () => {
    setModalShow(false);
    setShowDelete(true);
  };

  //Submit form
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

  //Delete tag
  const handleSelectDelete = () => {
    dispatch(tagDelete(selectid));
    setShowDelete(false);
    setSelectId("");
    setShowDelete(false);
  };

  //Get all tag details
  useEffect(() => {
    dispatch(getTagDetails());
    dispatch(getChildrenTagDetails(selectid));
  }, []);

  //Cancel tag create/update modal
  const cancel = () => {
    setModalShow(false);
  };

  return (
    <Layout>
      <div className="container" style={{ paddingTop: "20px" }}>
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

        <div style={{ marginTop: "50px" }}>
          <TreeMenu
            cacheSearch
            data={state.tagData.allTagDetails.map((e: any) => {
              return {
                key: e.id,
                label: e.name,
                color: e.color,
                parentTag_id: null,
                nodes: e.childTags
                  ? e.childTags.map((item: any) => {
                      return {
                        id: item.id,
                        key: item.id,
                        label: item.name,
                        color: item.color,
                        parentTag_id: item.parentTag_id,
                      };
                    })
                  : " ",
              };
            })}
            debounceTime={125}
            disableKeyboard={false}
            hasSearch={false}
            resetOpenNodesOnDataUpdate={false}
            onClickItem={(e) => onClicktag(e)}
          >
            {({ items }) => (
              <div>
                <ul style={{ listStyleType: "none" }}>
                  {items.map(({ key, color, ...props }) => (
                    <ItemComponent
                      key={key}
                      {...props}
                      style={{ color: color }}
                    ></ItemComponent>
                  ))}
                </ul>
              </div>
            )}
          </TreeMenu>
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
          header="Delete Tag"
          message="delete this tag?"
        />
      </div>
    </Layout>
  );
};

export default TagList;

import { Modal, Form, Col, Row, Button } from "react-bootstrap";
import Select from "react-select";
import SelectTag from "../common/SelectTags";

const TagCreateModal = ({
  show,
  onHide,
  editTag,
  handleShowDelete,
  formSubmit,
  formState,
  setformState,
  tags,
  cancel,
}: {
  show: boolean;
  onHide: () => void;
  editTag: boolean;
  handleShowDelete: () => void;
  formSubmit: any;
  formState: any;
  setformState: any;
  tags: any;
  cancel: any;
}) => {
  //Get parent tag details for tag create/update modal
  const parent = tags.map(function (tag: any) {
    return { value: tag.id, label: tag.name };
  });

  //Delete selected parent tag from tag create/update modal
  const onDelete = (parent: boolean) => {
    if (parent) {
      setformState({ ...formState, parentTag_id: 0 });
    }
  };

  //Get form data
  const onChange = (event: any) => {
    if (event.target) {
      const name = event.target.name;
      const value = event.target.value;
      setformState({ ...formState, [name]: value });
    } else {
      const value = event.value;
      setformState({
        ...formState,
        parentTag_id: value,
      });
    }
  };

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div>
            <div className="d-flex flex-row">
              <h2 style={{ color: "#4B4B4B" }}>
                {editTag ? "Edit" : "New Tag"}
              </h2>
              {editTag ? (
                <div>
                  <h5
                    style={{
                      backgroundColor: "#00B0FF",
                      borderRadius: "10px",
                      textAlign: "center",
                      color: "#4B4B4B",
                      marginTop: "10px",
                      marginLeft: "5px",
                      width: "120px",
                    }}
                  >
                    {formState.name}
                  </h5>
                </div>
              ) : (
                ""
              )}
              {editTag ? (
                <div
                  style={{ marginLeft: "560px", cursor: "pointer" }}
                  onClick={cancel}
                >
                  <img
                    src="error.png"
                    alt="cancel"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
              ) : (
                <div
                  style={{ marginLeft: "79%", cursor: "pointer" }}
                  onClick={cancel}
                >
                  <img
                    src="error.png"
                    alt="cancel"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
              )}
            </div>
            <div
              style={{
                marginTop: "8px",
                marginLeft: "5px",
                width: "80px",
              }}
            ></div>
            <Form onSubmit={formSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  {" "}
                  Tag Name{" "}
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Tag Name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={onChange}
                    autoComplete="off"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  {" "}
                  Color{" "}
                </Form.Label>
                <Col sm={10}>
                  <div className="d-flex">
                    <div>
                      <Form.Control
                        type="color"
                        // placeholder="Select Color"
                        name="color"
                        required
                        style={{ width: "100px", marginLeft: "5px" }}
                        value={formState.color}
                        onChange={onChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  {" "}
                  Parent Tag{" "}
                </Form.Label>
                <Col sm={10}>
                  {formState.parentTag_id == 0 ? (
                    <Select
                      options={parent}
                      placeholder="Search a tag"
                      onChange={onChange}
                    />
                  ) : (
                    <SelectTag
                      value={
                        parent.find(
                          (e: any) => e.value == formState.parentTag_id
                        )?.label
                      }
                      onClick={onDelete}
                      parent={true}
                    />
                  )}
                </Col>
              </Form.Group>
              <div className="mt-5"></div>
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  className={
                    editTag ? "group-update-button" : "group-save-button"
                  }
                >
                  <img
                    src="edit.png"
                    alt="edit"
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "7px",
                    }}
                  />{" "}
                  {editTag ? "Update" : "Save"}
                </Button>
                {editTag && (
                  <Button
                    className="ms-2 group-delete-button"
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
                    />{" "}
                    Delete{" "}
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default TagCreateModal;

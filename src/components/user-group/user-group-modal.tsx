import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import SelectTag from "../common/SelectTags";

const UserGroupModal = ({
  show,
  editGroup,
  handleShowDelete,
  form,
  setForm,
  formSubmit,
  groups,
  cancel,
  onSearch
}: {
  show: boolean;
  editGroup: boolean;
  formSubmit: any;
  handleShowDelete: () => void;
  form: any;
  setForm: any;
  groups: any;
  cancel:any;
  onSearch:any;
}) => {

  //options for form parent groups selection
  const parent = groups.map(function (group: any) {
    return { value: group.id, label: group.name };
  });

  //delete function for selected tags in the form
  const onDelete = (value: any, parent: boolean) => {
    if (parent) {
      setForm({ ...form, parent_group_name: "", parentGroup_id: 0 });
    } 
  };

  //function for form input onChange 
  const onChange = (event: any) => {
    if (event.target) {
      const name = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [name]: value });
    } else {
      setForm({
        ...form,
        parent_group_name: event.label,
        parentGroup_id: event.value,
      });
    }
  };

  
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{paddingLeft :"25px", paddingRight:"25px" }}>
        <div className="d-flex">
          <h3 style={{ fontWeight: "bold", marginBottom: "30px" }}>
            {editGroup ? "Edit Group" : "New Group"}{" "}
          </h3>

          {editGroup ? (
            <div
              style={{ marginTop: "8px", marginLeft: "5px" }}
            >
              <h5
                style={{
                  backgroundColor: "#00B0FF",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "#4B4B4B",
                  width: "auto",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                {form.name}
              </h5>
            </div>
          ) : (
            ""
          )}
           {editGroup ? (
              <div style={{marginLeft:"auto", cursor:"pointer"}} onClick={cancel}>
                <img src="error.png" alt="cancel" style={{width:"25px", height:"25px"}} />
              </div>
              ): (
                <div style={{marginLeft:"auto", cursor:"pointer"}} onClick={cancel}>
                <img src="error.png" alt="cancel" style={{width:"25px", height:"25px"}} />
              </div>
              )}
        </div>
        <Form onSubmit={formSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              {" "}
              Group Name{" "}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Group Name"
                name="name"
                required
                value={form.name}
                onChange={onChange}
                autoComplete="off"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              {" "}
              Parent Group{" "}
            </Form.Label>
            <Col sm={10}>
              {form.parentGroup_id == 0 ? (
                <Select
                  options={parent}
                  placeholder="Search a group"
                  onChange={onChange}
                  onInputChange={onSearch}
                />
              ) : (
                <SelectTag
                  value={form.parent_group_name}
                  onClick={onDelete}
                  parent={true}
                />
              )}
            </Col>
          </Form.Group>

          <div className="mt-2">
           
          </div>
          <div className="d-flex flex-row-reverse">
            <Button
              type="submit"
              className={
                editGroup ? "group-update-button" : "group-save-button"
              }
              style={{ marginLeft: "10px" ,backgroundColor: "#00E676", border: "#00E676"}}
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
              {editGroup ? "Update" : "Save"}
            </Button>
            {editGroup && (
              <Button
              className="btn btn-primary"
              style={{
                backgroundColor: "#FF0000",
                border: "#FF0000",
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
                />{" "}
                Inactivate{" "}
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserGroupModal;

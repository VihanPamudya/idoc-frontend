import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from 'react-quill';
import { languages } from "../../utils/languagesList";
import SelectTag from "../common/SelectTags";

const DocumentModal = ({
  show,
  handleShowDelete,
  cancel,
  form,
  setForm,
  formSubmit,
  editDocument,
  tags,
}: {
  show: boolean;
  handleShowDelete: () => void;
  cancel: any;
  form: any;
  setForm: any;
  formSubmit: any;
  editDocument: any;
  tags: any;
}) => {
  //delete function for selected tags in the form
  const onDelete = (value: any, parent: boolean) => {
    const newTags = form.tags.filter((element: any) => element.name !== value);
    setForm({ ...form, tags: newTags });
  };

  //options for tag selection in the form
  const tagOptions = tags.map(function (tag: any) {
    return { value: tag.id, label: tag.name };
  });

  //function for form input onChange
  const onChange = (event: any) => {
    if (event.target) {
      const name = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [name]: value });
    } else {
      const newTag = tags.filter((tag: any) => tag.id === event.value)[0];
      var newTagList = [...form.tags, newTag];
      setForm({ ...form, tags: newTagList });
    }
  };

  //function for onChange of language selection in form 
  const onLanguageChange = (option: any) => {
    setForm({ ...form, language: option.label });
  };

  //function to store editor input  of the form in the form state.
  const onEditorCHange = (value: any) => {
    setForm({ ...form, description: value });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        <div className="d-flex">
          <h3 style={{ fontWeight: "bold", marginBottom: "30px" }}>
            {editDocument ? "Edit" : "New Document"}{" "}
          </h3>
          {editDocument ? (
            <div style={{ marginTop: "8px", marginLeft: "5px" }}>
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
                {form.title}
              </h5>
            </div>
          ) : (
            ""
          )}
          {editDocument ? (
            <div
              style={{ marginLeft: "auto", cursor: "pointer" }}
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
              style={{ marginLeft: "auto", cursor: "pointer" }}
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

        <Form onSubmit={formSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              {" "}
              Title{" "}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Document Title"
                name="title"
                required
                value={form.title}
                onChange={onChange}
                autoComplete="off"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              {" "}
              Description{" "}
            </Form.Label>
            <Col sm={10}>
              <ReactQuill value={form.description} onChange={onEditorCHange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              {" "}
              Creration Date{" "}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                name="createdDate"
                required
                value={form.createdDate}
                onChange={onChange}
                autoComplete="off"
                max={today}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              {" "}
              Language{" "}
            </Form.Label>
            <Col sm={10}>
              <Select
                options={languages.map((lang) => {
                  return {
                    label: lang[0],
                    value: lang[1],
                  };
                })}
                defaultValue={{
                  label: "english",
                  value: "en",
                }}
                onChange={onLanguageChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              {" "}
              Tags{" "}
            </Form.Label>
            <Col sm={10}>
              <Select
                options={tagOptions}
                placeholder="Search a tag"
                onChange={onChange}
              />
              <div className="d-flex" style={{ marginTop: "10px" }}>
                {form.tags.length != 0
                  ? form.tags.map((tag: any) => (
                      <SelectTag value={tag.name} onClick={onDelete} backColor={tag.color} />
                    ))
                  : ""}
              </div>
            </Col>
          </Form.Group>

          <div className="mt-2"></div>
          <div className="d-flex flex-row-reverse">
            <Button
              type="submit"
              className={
                editDocument ? "document-update-button" : "document-save-button"
              }
              style={{
                marginLeft: "10px",
                backgroundColor: "#00E676",
                border: "#00E676",
              }}
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
              {editDocument ? "Update" : "Save"}
            </Button>
            {editDocument && (
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

export default DocumentModal;

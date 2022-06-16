import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import DocViewer, {
  PDFRenderer,
  PNGRenderer,
  JPGRenderer,
  BMPRenderer,
  MSDocRenderer,
} from "react-doc-viewer";

const FileUploadModal = ({
  show,
  handleShowDelete,
  cancel,
}: {
  show: boolean;
  handleShowDelete: () => void;
  cancel: any;
}) => {
  const [selectFile, setSelectFile] = useState([]); //Set added files
  const [select, setSelect] = useState([]); //Get selected files details using checkbox

  const fileRef = useRef<HTMLInputElement>(null);

  //Adding files
  const handleChange = (e: any) => {
    let rows = JSON.parse(JSON.stringify(selectFile));
    let i: number;
    for (i = 0; i < e.target.files.length; i++) {
      rows.push({
        file: e.target.files[i],
        preview: URL.createObjectURL(e.target.files[i]),
        name: e.target.files[i].name,
        type: e.target.files[i].type,
      });
    }
    setSelectFile(rows);
  };

  //Deleting added files
  const onDelete = (index: number) => {
    let array = JSON.parse(JSON.stringify(selectFile));
    if (select.some((e: any) => e == index)) {
      let arr = JSON.parse(JSON.stringify(select));
      let deleteIndex = arr.find((item: any) => {
        item == index;
      });
      arr.splice(deleteIndex, 1);
      setSelect(arr);
    }
    array.splice(index, 1);
    setSelectFile(array);
  };

  //Get selected files details
  function onSelect(e: any, index: number) {
    let isChecked = e.target.checked;
    let array = JSON.parse(JSON.stringify(select));
    if (isChecked) {
      array.push(index);
    } else {
      let deleteCheckedIndex = array.find((item: any) => {
        item == index;
      });
      array.splice(deleteCheckedIndex, 1);
    }
    setSelect(array);
  }

  //Preview added files
  const RenderPreview = ({ el }: { el: any }) => {
    if (el.type.includes("image/")) {
      return (
        <img
          src={el.preview}
          alt="dummy"
          width="150px"
          height="150px"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%",
          }}
          className="ml-2"
        />
      );
    } else {
      return (
        <iframe
          src={el.preview}
          style={{
            height: "150px",
            width: "150px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="ml-2"
        ></iframe>
      );
    }

    // return(
    //   <DocViewer documents={[el.preview]} pluginRenderers={[PDFRenderer, PNGRenderer, JPGRenderer, BMPRenderer, MSDocRenderer]}/>
    // )
  };

  // clean up
  useEffect(
    () => () => {
      selectFile.forEach((file) => URL.revokeObjectURL(file["preview"]));
    },
    [selectFile]
  );

  return (
    <div>
      <Modal show={show} size="lg">
        <Modal.Body style={{ paddingLeft: "25px", paddingRight: "25px" }}>
          <div
            style={{ marginLeft: "97%", cursor: "pointer" }}
            onClick={cancel}
          >
            <img
              src="error.png"
              alt="cancel"
              style={{ width: "25px", height: "25px" }}
            />
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
            <div
              className="d-flex"
              style={{ fontSize: "25px", color: "#4B4B4B" }}
            >
              Quick Upload
            </div>

            <div>
              <div className="form-check" style={{ padding: "10px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Select all
                </label>
              </div>
            </div>
          </div>
          <hr style={{ color: "#636363" }} />

          <div style={{ border: "1px dashed #636363", borderColor: "#636363" }}>
            <div className="d-flex">
              {selectFile.length
                ? selectFile.map((el: any, index: number) => {
                    return (
                      <Card
                        style={{ width: "200px", marginTop: "10px" }}
                        className="ms-2"
                      >
                        <RenderPreview el={el} />
                        <Card.Body>
                          <Card.Title style={{ fontSize: "10px" }}>
                            {el.name}
                          </Card.Title>
                          <Button
                            variant="danger"
                            className="btn btn-primary"
                            style={{
                              backgroundColor: "#FF0000",
                              border: "#FF0000",
                              width: "50px",
                            }}
                            onClick={() => onDelete(index)}
                          >
                            <img
                              src="delete.png"
                              alt="delete"
                              style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "70%",
                              }}
                            />
                          </Button>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            style={{ marginLeft: "95px" }}
                            onChange={(e) => onSelect(e, index)}
                          />
                        </Card.Body>
                      </Card>
                    );
                  })
                : ""}
            </div>
            {select.length == 0 ? (
              <div
                className="m-3"
                style={{
                  borderRadius: "10px",
                  borderColor: "#636363",
                  marginLeft: "50%",
                }}
              >
                <input
                  ref={fileRef}
                  onChange={handleChange}
                  multiple={true}
                  hidden
                  className="d-none"
                  type="file"
                  accept="image/png,image/jpg,image,jpeg,image/gif,.doc,.docx,application/msword,application/pdf,mp4,mp3"
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="btn btn-outline-primary"
                  style={{ marginLeft: "43%" }}
                >
                  Add Files
                </button>
              </div>
            ) : (
              <div className="mt-2 mb-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#00B0FF",
                    border: "#00B0FF",
                    marginLeft: "38%",
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
                  Add to new Document
                </button>
              </div>
            )}
          </div>

          <div style={{ fontSize: "20px", marginTop: "50px" }}></div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const QuickFileUpload = ({
  show,
  handleShowDelete,
  cancel,
}: {
  show: boolean;
  handleShowDelete: () => void;
  cancel: any;
}) => {
  return (
    <FileUploadModal
      show={show}
      handleShowDelete={handleShowDelete}
      cancel={cancel}
    />
  );
};

export default QuickFileUpload;

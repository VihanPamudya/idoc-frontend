import { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getFileDetails } from "../../redux/actions/FileActions";

const DocumentFiles = () => {
  const [selectFile, setSelectFile] = useState([]); //Set added files
  const [select, setSelect] = useState([]); //Get selected files details using checkbox
  const dispatch = useDispatch(); //Dispatch data

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

  useEffect(() => {
    dispatch(getFileDetails());
  }, []);


  return (
    <div>
      <div style={{ border: "1px dashed #636363", borderColor: "#636363" }}>
        <div>
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
                      </Card.Body>
                    </Card>
                  );
                })
              : ""}
          </div>

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
            <div className="d-flex justify-content-center">
              <button
                onClick={() => fileRef.current?.click()}
                className="btn btn-primary"
                style={{
                  backgroundColor: "#00B0FF",
                  border: "#00B0FF",
                }}
              >
                Add Files
              </button>
              {selectFile.length != 0 ? (
                <Button
                  type="submit"
                  className="group-save-button ms-2"
                  style={{
                    backgroundColor: "#00e676",
                    border: "#00B0FF",
                  }}
                >
                  Save
                </Button>
              ) : (
                " "
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentFiles;

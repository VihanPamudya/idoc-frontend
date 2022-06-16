import { Button, Form, Modal } from "react-bootstrap";

const DocumentShare = ({
  show,
  cancel,
  sharingLink,
  onShare,
  onClick,
  onUnshare,
  shared
}: {
  show: any;
  cancel: any;
  sharingLink: any;
  onShare: any;
  onClick: any;
  onUnshare: any;
  shared: any
}) => {


  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <h4> Shared Document </h4>{" "}
        <div style={{ marginLeft: "auto", cursor: "pointer" }} onClick={cancel}>
          <img
            src="error.png"
            alt="cancel"
            style={{ width: "25px", height: "25px" }}
          />
        </div>
      </Modal.Header>
      <Modal.Body style={{ paddingLeft: "25px", paddingRight: "25px" }}>
      {sharingLink? 
     <div> <p>
          You can share this document by giving this link. Note that everyone
          having this link can see the document.
        </p>
        <Form.Control type="text" name="name" disabled value={sharingLink} /> </div>: 
        <p>
          Click on share button to create a new share link.
        </p>
        }
        
      </Modal.Body>
      <Modal.Footer>
        {sharingLink ? (
          <Button
            className="btn btn-primary"
            style={{ backgroundColor: "#00e676", border: "#00e676" }}
            onClick={onClick}
          >
            {" "}
            Ok
          </Button>
        ) : ( "" )}

        <Button
          className="btn btn-primary"
          style={{
            backgroundColor: sharingLink ? "#FF0000" : "#00B0FF",
            border: sharingLink ? "#FF0000" : "#00B0FF",
          }}
          onClick={sharingLink ? onUnshare : onShare}
        >
          {sharingLink ? "Unshare" : "Share"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentShare;

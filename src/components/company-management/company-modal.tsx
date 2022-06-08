import { Modal } from "react-bootstrap";

const CompanymanagementModal = ({
  show,
  onHide,
  editCompany,
  handleShowDelete,
  formSubmit,
  formState,
  setformState,
  cancel
}: {
  show: boolean;
  onHide: () => void;
  editCompany: boolean;
  handleShowDelete: () => void;
  formSubmit: any;
  formState: any;
  setformState: any;
  cancel:any;
}) => {
  const onChange = (event: any) => {
    var change, value;
    if (event.target) {
      change = event.target.id;
      value = event.target.value;
    }
    setformState({ ...formState, [change]: value });
  };
  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Body style={{paddingLeft :"25px", paddingRight:"25px" }}>
          <div>
            <div className="d-flex flex-row">
              <h2 style={{ color: "#4B4B4B" }}>
                {editCompany ? "Edit" : "New Company"}
              </h2>
              {editCompany ? (
                <div>
                  <h5
                    style={{
                      backgroundColor: "#00B0FF",
                      borderRadius: "10px",
                      textAlign: "center",
                      color: "#4B4B4B",
                      marginTop: "10px",
                      marginLeft: "5px",
                      width: "100px",
                    }}
                  >
                    {formState.companyName}
                  </h5>
                </div>
              ) : (
                ""
              )}
              {editCompany ? (
              <div style={{marginLeft:"560px", cursor:"pointer"}} onClick={cancel}>
                <img src="error.png" alt="cancel" style={{width:"25px", height:"25px"}} />
              </div>
              ): (
                <div style={{marginLeft:"504px", cursor:"pointer"}} onClick={cancel}>
                <img src="error.png" alt="cancel" style={{width:"25px", height:"25px"}} />
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
            <form onSubmit={formSubmit}>
              <div className="mb-0 row">
                <label className="col-sm-2 col-form-label">Company name</label>
                <div className="col-sm-10">
                  <input
                    type={"text"}
                    className="form-control"
                    id="companyName"
                    placeholder="Company Name"
                    value={formState.companyName}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input
                    type={"text"}
                    className="form-control"
                    id="companyEmail"
                    placeholder="Company Email"
                    value={formState.companyEmail}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                  <input
                    type={"text"}
                    className="form-control"
                    id="companyAddress"
                    placeholder="Company Address"
                    value={formState.companyAddress}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Total Storage</label>
                <div className="col-sm-4">
                  <div className="input-group">
                    <input
                      type={"number"}
                      className="form-control"
                      id="totalStorage"
                      placeholder="Total Storage"
                      value={formState.totalStorage}
                      required
                      onChange={onChange}
                      autoComplete={"off"}
                      min={0}
                    />
                    <div className="input-group-text">GB</div>
                  </div>
                </div>

                {editCompany ? (
                  <>
                    <label className="col-sm-2 col-form-label">
                      Used Storage
                    </label>
                    <div className="col-sm-4">
                      <div className="input-group">
                        <input
                          type={"number"}
                          className="form-control"
                          id="ustorage"
                          placeholder="Used Storage"
                          value={formState.ustorage}
                          onChange={onChange}
                          autoComplete={"off"}
                        />
                        <div className="input-group-text">GB</div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>

              {editCompany ? (
                <div className="mb-0 row">
                  <label className="col-sm-2 col-form-label">
                    No of Active Users
                  </label>
                  <div className="col-sm-10">
                    <input
                      type={"number"}
                      className="form-control"
                      id="users"
                      placeholder="No of active users"
                      value={formState.users}
                      onChange={onChange}
                      autoComplete={"off"}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="mb-0 row">
                <label className="col-sm-2 col-form-label">
                  Document Upload URL
                </label>
                <div className="col-sm-10">
                  <input
                    type={"text"}
                    className="form-control"
                    id="documentUploadURL"
                    placeholder="URL"
                    value={formState.documentUploadURL}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
              </div>
              <div className="mt-4">
           
          </div>
              <div>
                <h5>Contact Person Details</h5>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type={"text"}
                    className="form-control"
                    id="contactName"
                    placeholder="Name"
                    value={formState.contactName}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-4">
                  <input
                    type={"text"}
                    className="form-control"
                    id="contactEmail"
                    placeholder="Email"
                    value={formState.contactEmail}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
                <label className="col-sm-2 col-form-label">Phone NO</label>
                <div className="col-sm-4">
                  <input
                    type={"text"}
                    className="form-control"
                    id="contactNumber"
                    placeholder="Phone number"
                    value={formState.contactNumber}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
              </div>
              <div className="d-flex flex-row">
                <div className="col-md-2 col-form-label"></div>
                <div className="col-md-6"></div>
                <div className="d-flex flex-row-reverse col-md-4">
                  <div style={{ marginLeft: "10px" }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
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
                      />
                      {editCompany ? "Update" : "Save"}
                    </button>
                  </div>
                  <div>
                    {editCompany ? (
                      <button
                        type="button"
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
                        />
                        {formState.status == "Active"
                          ? "Inactivate"
                          : "Activate"}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const CompanyCreateUpdate = ({
  show,
  onHide,
  handleShowDelete,
  editCompany,
  formSubmit,
  formState,
  setformState,
  cancel
}: {
  show: boolean;
  onHide: () => void;
  handleShowDelete: () => void;
  editCompany: boolean;
  formSubmit: any;
  formState: any;
  setformState: any;
  cancel:any;
}) => {
  return (
    <>
      <CompanymanagementModal
        show={show}
        onHide={onHide}
        handleShowDelete={handleShowDelete}
        editCompany={editCompany}
        formSubmit={formSubmit}
        formState={formState}
        setformState={setformState}
        cancel={cancel}
      />
    </>
  );
};

export default CompanyCreateUpdate;

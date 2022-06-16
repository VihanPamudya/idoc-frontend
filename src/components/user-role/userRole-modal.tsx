import { Accordion, Form, Modal } from "react-bootstrap";

const UserRolemanagementModal = ({
  show,
  onHide,
  editUserRole,
  handleShowDelete,
  formSubmit,
  formState,
  setformState,
  cancel,
}: {
  show: boolean;
  onHide: () => void;
  editUserRole: boolean;
  handleShowDelete: () => void;
  formSubmit: any;
  formState: any;
  setformState: any;
  cancel: any;
}) => {
  const onChange = (event: any) => {
    var change, value;
    if (event.target) {
      change = event.target.id;
      value = event.target.value;
    }
    setformState({ ...formState, [change]: value });
  };

  const onChangeHandlerCheck = (item: any, data: any, type: number) => {
    let updatedChild: any = null;
    if (type === 2) {
      updatedChild = JSON.parse(
        JSON.stringify(
          formState.packages.find((el: any) =>
            el.subPackageList.some((el2: any) => el2.id === data.id)
          )
        )
      );
      updatedChild.subPackageList
        .find((el: any) => el.id === data.id)
        .actionList.find((el: any) => el.id === item.id).isSelected =
        !item.isSelected;
    } else if (type === 3) {
      updatedChild = JSON.parse(
        JSON.stringify(
          formState.packages.find((el: any) =>
            el.subPackageList.some((el2: any) =>
              el2.moduleList.some((el3: any) => el3.id === data.id)
            )
          )
        )
      );

      let newItem = JSON.parse(JSON.stringify(item));
      newItem.isSelected = !item.isSelected;

      let updatedActionId = data.actionList.findIndex(
        (el: any) => el.id === item.id
      );
      let updatedModule = JSON.parse(JSON.stringify(data));
      updatedModule.actionList.splice(updatedActionId, 1, newItem);

      let updatedSub = updatedChild.subPackageList.find(
        (el: any) => el.id === data.subPackageId
      );

      let updatedModuleId = updatedSub.moduleList.findIndex(
        (el: any) => el.id === updatedModule.id
      );
      updatedSub.moduleList.splice(updatedModuleId, 1, updatedModule);

      let updatedId = updatedChild.subPackageList.findIndex(
        (el: any) => el.id === updatedSub.id
      );
      updatedChild.subPackageList.splice(updatedId, 1, updatedSub);
    }

    let allPackages = JSON.parse(JSON.stringify(formState.packages));
    let updatedId = allPackages.findIndex(
      (el: any) => el.id === updatedChild.id
    );
    allPackages.splice(updatedId, 1, updatedChild);
    setformState({
      ...formState,
      packages: allPackages,
    });
  };

  const getActionForms = (data: any, type: number) => {
    let actions = data.actionList.map((item: any, index: number) => {
      return (
        <Form.Check
          aria-label={"option-" + index}
          label={item?.action?.name}
          style={{ color: "black" }}
          onChange={() => onChangeHandlerCheck(item, data, type)}
          checked={item.isSelected}
        />
      );
    });

    return actions;
  };

  return (
    <div>
      <Modal show={show} size="lg">
        <Modal.Body>
          <div>
            <div className="d-flex">
              <h2 style={{ color: "#4B4B4B" }}>
                {editUserRole ? "Edit" : "New UserRole"}
              </h2>
              {editUserRole ? (
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
              {editUserRole ? (
                <div
                  style={{ cursor: "pointer" , marginLeft:"73%"}}
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
                  style={{ marginLeft: "68%", cursor: "pointer" }}
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
            <form onSubmit={formSubmit}>
              <div className="form-group mt-2">
                <label>Role Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Role Name"
                    id="name"
                    value={formState.name}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
              </div>
              <div className="form-group mt-2 mb-4">
                <label>Description</label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    id="description"
                    value={formState.description}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                  />
                </div>
              </div>

              <Accordion defaultActiveKey={[""]} alwaysOpen>
                {formState.packages.map((item: any, index: number) => {
                  return (
                    <Accordion.Item eventKey={index.toString()}>
                      <Accordion.Header>{item.description}</Accordion.Header>
                      <Accordion.Body>
                        {item.subPackageList.map(
                          (item2: any, index2: number) => {
                            return (
                              <Accordion.Item
                                eventKey={
                                  "main-" + index + "sub-" + index2.toString()
                                }
                              >
                                <Accordion.Header>
                                  {item2.description}
                                </Accordion.Header>
                                <Accordion.Body>
                                  {item2.moduleList.map(
                                    (item3: any, index3: number) => {
                                      return (
                                        <Accordion.Item
                                          eventKey={
                                            "main-" +
                                            index +
                                            "sub-" +
                                            index2.toString() +
                                            "-mod-" +
                                            index3.toString()
                                          }
                                        >
                                          <Accordion.Header>
                                            {item3.description}
                                          </Accordion.Header>
                                          <Accordion.Body>
                                            <>
                                              {item3.actionList?.length &&
                                                getActionForms(item3, 3)}
                                            </>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      );
                                    }
                                  )}

                                  {item2.actionList &&
                                    item2.actionList.length &&
                                    getActionForms(item2, 2)}
                                </Accordion.Body>
                              </Accordion.Item>
                            );
                          }
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              <div className="d-flex flex-row">
                <div className="col-md-2 col-form-label"></div>
                <div className="col-md-6"></div>
                <div className="d-flex flex-row-reverse col-md-4">
                  <div style={{ marginLeft: "10px" }} className="mt-4">
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
                      {editUserRole ? "Update" : "Save"}
                    </button>
                  </div>
                  <div className="mt-4">
                    {editUserRole ? (
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

const UserRoleCreate = ({
  show,
  onHide,
  handleShowDelete,
  editUserRole,
  formSubmit,
  formState,
  setformState,
  cancel,
}: {
  show: boolean;
  onHide: () => void;
  handleShowDelete: () => void;
  editUserRole: boolean;
  formSubmit: any;
  formState: any;
  setformState: any;
  cancel: any;
}) => {
  return (
    <>
      <UserRolemanagementModal
        show={show}
        onHide={onHide}
        handleShowDelete={handleShowDelete}
        editUserRole={editUserRole}
        formSubmit={formSubmit}
        formState={formState}
        setformState={setformState}
        cancel={cancel}
      />
    </>
  );
};

export default UserRoleCreate;

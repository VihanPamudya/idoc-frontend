import { Modal } from "react-bootstrap";
import Select from "react-select";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Permission from "../common/Permission";
import { searchUserUsergroups } from "../../redux/actions/searchAction";

// set the stepType for workflow
const stepType = [
  { value: "Validate", label: "Validate" },
  { value: "Approve", label: "Approve" },
];

const WorkflowmanagementModal = ({
  show,
  onHide,
  editWorkflow,
  formSubmit,
  formState,
  setformState,
  cancel,
  handleShowDelete,
}: {
  show: boolean;
  onHide: () => void;
  editWorkflow: boolean;
  formSubmit: any;
  formState: any;
  setformState: any;
  cancel: any;
  handleShowDelete: any;
}) => {
  const dispatch = useDispatch();
  const onChange = (event: any) => {
    var change, value;
    if (event.target) {
      change = event.target.id;
      value = event.target.value;
    }
    setformState({ ...formState, [change]: value });
  };

  // users and usergroups data
  const searchData = useSelector((state: any) =>
    state.searchData.searchResults.map((item: any) => {
      return { value: item.id, label: item.name, isUser: item.user };
    })
  );

  const onChangeHandlerSteps = (e: any, index: number) => {
    let name = "";
    let value = "";

    if (e.target) {
      name = e.target.id;
      value = e.target.value;
    } else {
      name = e.name;
      value = e.value;
    }

    // set the user or usergroup and other values in steptype
    let oldSteps = JSON.parse(JSON.stringify(formState.steps));
    if (name == "stepAssigned") {
      oldSteps[index].stepAssigned = value;
      oldSteps[index].stepAssignedIsUser = e.isUser;
      oldSteps[index].stepAssignedName = e.label;
    } else {
      oldSteps[index][name] = value;
    }

    setformState({
      ...formState,
      steps: oldSteps,
    });
  };

  // permission table
  const onChangePermission = (permis: any) => {
    setformState({
      ...formState,
      permissionList: permis,
    });
  };

  // drag the workflow step
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const content = reorder(
      formState.steps,
      result.source.index,
      result.destination.index
    );
    setformState({
      ...formState,
      steps: content,
    });
  };

  // search user or usergroup
  const onInputChange = (name: string) => {
    dispatch(searchUserUsergroups(name));
  };

  // reorder the steps after dragging
  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // add another workflow step
  const addclick = () => {
    let stepsArray = JSON.parse(JSON.stringify(formState.steps));
    stepsArray.push({
      stepType: "",
      stepAssigned: "",
      stepAssignedIsUser: "",
      stepAssignedName: "",
      description: "",
      stepAction: "",
    });
    setformState({
      ...formState,
      steps: stepsArray,
    });
  };

  // workflow steps delete
  const handleStepDelete = (id: number) => {
    let steps = JSON.parse(JSON.stringify(formState.steps));

    steps.splice(id, 1);
    setformState({
      ...formState,
      steps: steps,
    });
  };

  return (
    <div>
      <Modal show={show} size="lg">
        <Modal.Body style={{ paddingLeft: "25px", paddingRight: "25px" }}>
          <div>
            <div className="d-flex flex-row">
              <div>
                <h2 style={{ color: "#4B4B4B" }}>
                  {editWorkflow ? "Edit" : "New Workflow"}
                </h2>
              </div>
              {editWorkflow ? (
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "5px",
                  }}
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
                    {formState.workflowName}
                  </h5>
                </div>
              ) : (
                ""
              )}
              {editWorkflow ? (
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

            {/* workflow form */}
            <form onSubmit={formSubmit}>
              {/* set the workflow name */}
              <div className="form-group mt-2">
                <label>Workflow Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Workflow Name"
                    id="workflowName"
                    value={formState.workflowName}
                    required
                    onChange={onChange}
                    autoComplete={"off"}
                    minLength={3}
                    maxLength={15}
                    pattern={"[a-zA-Z]+"}
                  />
                </div>
              </div>

              <DragDropContext onDragEnd={onDragEnd}>
                <div>
                  <Droppable droppableId="paths-system">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {formState.steps.map((e: any, index: number) => {
                          return (
                            <Draggable
                              draggableId={index.toString()}
                              index={index}
                              key={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  key={`paths-${index}`}
                                >
                                  <div>
                                    <div
                                      className="panel-body"
                                      style={{
                                        padding: "15px",
                                        border: "1px solid hsl(0, 0%, 80%)",
                                        marginTop: "20px",
                                      }}
                                    >
                                      <div className="d-flex flex-row-reverse">
                                        <div style={{ marginBottom: "15px" }}>
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                            style={{
                                              backgroundColor: "#FF0000",
                                              border: "#FF0000",
                                            }}
                                            onClick={() =>
                                              handleStepDelete(index)
                                            }
                                          >
                                            <img
                                              src="delete.png"
                                              alt="delete"
                                              style={{
                                                width: "15px",
                                                height: "15px",
                                              }}
                                            />
                                          </button>
                                        </div>
                                        <div className="col-md-6">
                                          <img
                                            src="scroll-arrows.png"
                                            alt="delete"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                            {...provided.dragHandleProps}
                                          />
                                        </div>
                                        <div className="col-md-5">
                                          <h3>{e.stepOrder}</h3>
                                        </div>
                                      </div>

                                      {/* set the step type */}
                                      <div className="mb-3 row">
                                        <label className="col-sm-2 col-form-label">
                                          Step type
                                        </label>
                                        <div className="col-sm-4">
                                          <Select
                                            options={stepType}
                                            placeholder="Step type"
                                            onChange={(e) => {
                                              let data = {
                                                label: e?.label,
                                                value: e?.value,
                                                name: "stepType",
                                              };
                                              onChangeHandlerSteps(data, index);
                                            }}
                                            value={{
                                              value: e.stepType,
                                              label: e.stepType,
                                            }}
                                          />
                                        </div>

                                        {/* set the assign user or usergroup */}
                                        <label className="col-sm-2 col-form-label">
                                          Assigned to
                                        </label>
                                        <div className="col-sm-4">
                                          <Select
                                            placeholder="User or user group"
                                            id="stepAssigned"
                                            options={searchData}
                                            value={{
                                              value: e?.stepAssigned,
                                              isUser: e.stepAssignedIsUser,
                                              label: e.stepAssignedName,
                                            }}
                                            onInputChange={onInputChange}
                                            onChange={(e) => {
                                              let data = {
                                                label: e?.label,
                                                value: e?.value,
                                                isUser: e?.isUser,
                                                name: "stepAssigned",
                                              };
                                              onChangeHandlerSteps(data, index);
                                            }}
                                          />
                                        </div>
                                      </div>

                                      {/* set the description */}
                                      <div className="form-group mt-2">
                                        <div className="mt-2">
                                          <textarea
                                            className="form-control"
                                            placeholder="Step name or description"
                                            id="description"
                                            value={e.description}
                                            required
                                            minLength={3}
                                            maxLength={100}
                                            onChange={(e) =>
                                              onChangeHandlerSteps(e, index)
                                            }
                                            autoComplete={"off"}
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>

              <div className="mt-4"></div>
              {editWorkflow && (
                <Permission
                  onChangePermission={onChangePermission}
                  permissionList={formState.permissionList}
                />
              )}
              <div className="mt-4"></div>

              <div className="d-flex flex-row" style={{ marginTop: "15px" }}>
                <div className="col-md-8">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#1976D2", border: "#1976D2" }}
                    onClick={addclick}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: "5px", marginBottom: "3px" }}
                    >
                      <path
                        d="M16.7143 7.23995H10.9286V1.90302C10.9286 1.24814 10.3528 0.717041 9.64286 0.717041H8.35714C7.64719 0.717041 7.07143 1.24814 7.07143 1.90302V7.23995H1.28571C0.575759 7.23995 0 7.77105 0 8.42594V9.61192C0 10.2668 0.575759 10.7979 1.28571 10.7979H7.07143V16.1348C7.07143 16.7897 7.64719 17.3208 8.35714 17.3208H9.64286C10.3528 17.3208 10.9286 16.7897 10.9286 16.1348V10.7979H16.7143C17.4242 10.7979 18 10.2668 18 9.61192V8.42594C18 7.77105 17.4242 7.23995 16.7143 7.23995Z"
                        fill="white"
                      />
                    </svg>
                    Add a workflow step
                  </button>
                </div>

                <div className="d-flex flex-row-reverse col-md-4">
                  <div style={{ marginLeft: "10px" }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#00E676", border: "#00E676" }}
                      disabled={
                        !formState.steps.stepType ||
                        !formState.steps.stepAssigned.length
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
                      />
                      {editWorkflow ? "Update" : "Save"}
                    </button>
                  </div>
                  <div>
                    {editWorkflow ? (
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
                        Inactivate
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

// values comes from workflow list
const WorkflowCreateUpdate = ({
  show,
  onHide,
  editWorkflow,
  formSubmit,
  formState,
  setformState,
  cancel,
  handleShowDelete,
}: {
  show: boolean;
  onHide: () => void;
  editWorkflow: boolean;
  formSubmit: any;
  formState: any;
  setformState: any;
  cancel: any;
  handleShowDelete: any;
}) => {
  return (
    // set values to the workflow management modal
    <>
      <WorkflowmanagementModal
        show={show}
        onHide={onHide}
        handleShowDelete={handleShowDelete}
        editWorkflow={editWorkflow}
        formSubmit={formSubmit}
        formState={formState}
        setformState={setformState}
        cancel={cancel}
      />
    </>
  );
};

export default WorkflowCreateUpdate;

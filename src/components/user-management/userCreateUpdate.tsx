import { Modal } from "react-bootstrap";
import Select from "react-select";
import { useState, useEffect } from "react";

// Set gender values
const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

// Future values can't select
const today = new Date().toISOString().split("T")[0];

// Values comes from UserCreateUpdate
const UserManagementModal = ({
  show,
  onHide,
  editUser,
  handleShowDelete,
  formSubmit,
  formState,
  setformState,
  roleData,
  groupData,
  sendReset,
  cancel,
}: {
  show: boolean;
  onHide: () => void;
  editUser: boolean;
  handleShowDelete: () => void;
  formSubmit: any;
  formState: any;
  setformState: any;
  roleData: any;
  groupData: any;
  sendReset: () => void;
  cancel: any;
}) => {
  const onChange = (event: any) => {
    var change, value;
    if (event.target) {
      change = event.target.id;
      value = event.target.value;
      setformState({ ...formState, [change]: value });
    } else if (event.id == "groupList") {
      // if the id==groupList set the groups
      const value = event.value;
      let x = [] as object[];
      for (let i = 0; i < value.length; i++) {
        let groupList = {
          userGroup: {
            id: value[i],
          },
        };
        x.push(groupList);
      }
      setformState({ ...formState, groupList: x });
    } else if (event.id == "roleList") {
      // if the id==roleList set the roles
      const value = event.value;
      let x = [] as object[];
      for (let i = 0; i < value.length; i++) {
        let roleList = {
          role: {
            id: value[i],
          },
        };
        x.push(roleList);
      }
      setformState({ ...formState, roleList: x });
    } else {
      change = "gender";
      value = event.value;
      setformState({ ...formState, [change]: value });
    }
  };

  return (
    <div>
      {/* display the modal */}
      <Modal show={show} size="lg">
        <Modal.Body style={{ paddingLeft: "25px", paddingRight: "25px" }}>
          <div>
            <div className="d-flex flex-row">
              <div>
                <h2 style={{ color: "#4B4B4B" }}>
                  {/* change the modal title according to add or update */}
                  {editUser ? "Edit" : "New User"}
                </h2>
              </div>
              {/* set the username of user according to update */}
              {editUser ? (
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
                    {formState.userName}
                  </h5>
                </div>
              ) : (
                ""
              )}
              {editUser ? (
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
            <form onSubmit={formSubmit}>
              {/* Set the employee number */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Emp No</label>
                <div className="col-sm-10">
                  <input
                    type={"text"}
                    className="form-control"
                    id="epfNumber"
                    placeholder="Employee No"
                    onChange={onChange}
                    value={formState.epfNumber}
                    required
                    autoComplete={"off"}
                    minLength={5}
                    maxLength={5}
                  />
                </div>
              </div>

              {/* Set the username */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                  <input
                    type={"text"}
                    className="form-control"
                    id="userName"
                    placeholder="Username"
                    onChange={onChange}
                    value={formState.userName}
                    required
                    autoComplete={"off"}
                    minLength={3}
                    maxLength={10}
                    pattern={"[a-zA-Z0-9]+"}
                  />
                </div>
              </div>

              {/* Set the first name and last name */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Firstname</label>
                <div className="col-sm-4">
                  <div className="input-group">
                    <input
                      type={"text"}
                      className="form-control"
                      id="firstName"
                      placeholder="Firstname"
                      onChange={onChange}
                      value={formState.firstName}
                      required
                      autoComplete={"off"}
                      minLength={3}
                      maxLength={10}
                      pattern={"[a-zA-Z]+"}
                    />
                  </div>
                </div>
                <label className="col-sm-2 col-form-label">Lastname</label>
                <div className="col-sm-4">
                  <input
                    type={"text"}
                    className="form-control"
                    id="lastName"
                    placeholder="Lastname"
                    onChange={onChange}
                    value={formState.lastName}
                    required
                    autoComplete={"off"}
                    minLength={3}
                    maxLength={10}
                    pattern={"[a-zA-Z]+"}
                  />
                </div>
              </div>

              {/* Set the email */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input
                    type={"email"}
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={onChange}
                    value={formState.email}
                    required
                    autoComplete={"off"}
                  />
                </div>
              </div>

              {/* Set the user groups */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Groups</label>
                <div className="col-sm-10">
                  <Select
                    placeholder="Groups"
                    isMulti
                    options={groupData}
                    value={formState.groupList.map((el: any) => {
                      return {
                        value: el.userGroup.id,
                        label: groupData.find(
                          (index: any) => index.value == el.userGroup.id
                        )?.label,
                      };
                    })}
                    onChange={(ex) => {
                      let event = {
                        id: "",
                        value: [] as Number[],
                      };
                      event.id = "groupList";

                      for (let i = 0; i < ex.length; i++) {
                        event.value.push(ex[i].value);
                      }
                      onChange(event);
                    }}
                  />
                </div>
              </div>

              {/* Set the Storage and phone number */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Storage</label>
                <div className="col-sm-4">
                  <div className="input-group">
                    <input
                      type={"number"}
                      className="form-control"
                      id="storageQuota"
                      placeholder="Storage quota"
                      onChange={onChange}
                      value={formState.storageQuota}
                      required
                      autoComplete={"off"}
                      min={0}
                      max={100}
                      pattern={"^(100|[1-9][0-9]?)$"}
                    />
                    <div className="input-group-text">GB</div>
                  </div>
                </div>
                <label className="col-sm-2 col-form-label">Phone No</label>
                <div className="col-sm-4">
                  <input
                    type={"tel"}
                    pattern="[0-9]{10}"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="Phone No"
                    onChange={onChange}
                    value={formState.mobileNumber}
                    required
                    autoComplete={"off"}
                  />
                </div>
              </div>

              {/* Set the gender and date of birth */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Gender</label>
                <div className="col-sm-4">
                  <Select
                    options={gender}
                    placeholder="Gender"
                    onChange={onChange}
                    value={{
                      value: formState.gender,
                      label: formState.gender,
                    }}
                  />
                </div>
                <label className="col-sm-2 col-form-label">Date of Birth</label>
                <div className="col-sm-4">
                  <input
                    type={"date"}
                    max={today}
                    className="form-control"
                    id="dateOfBirth"
                    placeholder="Date of Birth"
                    onChange={onChange}
                    value={formState.dateOfBirth}
                    autoComplete={"off"}
                    required
                  />
                </div>
              </div>

              {/* Set the address */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                  <input
                    type={"text"}
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    onChange={onChange}
                    value={formState.address}
                    required
                    autoComplete={"off"}
                    minLength={3}
                    maxLength={100}
                    pattern={"^([a-zA-z0-9/\\''(),-s])$"}
                  />
                </div>
              </div>

              {/* Set the roles */}
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Position</label>
                <div className="col-sm-10">
                  <Select
                    placeholder="Position"
                    isMulti
                    options={roleData}
                    value={formState.roleList.map((el: any) => {
                      return {
                        value: el.role.id,
                        label: roleData.find(
                          (index: any) => index.value == el.role.id
                        )?.label,
                      };
                    })}
                    onChange={(ex) => {
                      let event = {
                        id: "",
                        value: [] as Number[],
                      };
                      event.id = "roleList";

                      for (let i = 0; i < ex.length; i++) {
                        event.value.push(ex[i].value);
                      }

                      onChange(event);
                    }}
                  />
                </div>
              </div>
              {editUser ? (
                ""
              ) : (
                // Set the password

                <div className="mb-3 row">
                  <label className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input
                      type={"password"}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      className="form-control"
                      id="password"
                      placeholder="password"
                      onChange={onChange}
                      value={formState.password}
                      required
                      autoComplete={"off"}
                    />
                  </div>
                </div>
              )}

              <div className="d-flex flex-row">
                <div className="col-md-2 col-form-label"></div>
                <div className="col-md-6">
                  {editUser ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#1976D2", border: "#1976D2" }}
                      onClick={sendReset}
                    >
                      <img
                        src="sent-mail.png"
                        alt="sent"
                        style={{
                          width: "15px",
                          height: "15px",
                          marginRight: "7px",
                        }}
                      />
                      Send a password reset email to this user
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex flex-row-reverse col-md-4">
                  <div style={{ marginLeft: "10px" }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#00E676", border: "#00E676" }}
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
                      {editUser ? "Update" : "Save"}
                    </button>
                  </div>
                  <div>
                    {editUser ? (
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

// Values pass from userList
const UserCreateUpdate = ({
  show,
  onHide,
  handleShowDelete,
  editUser,
  formSubmit,
  formState,
  setformState,
  roleData,
  groupData,
  sendReset,
  cancel,
}: {
  show: boolean;
  onHide: () => void;
  handleShowDelete: () => void;
  editUser: boolean;
  formSubmit: any;
  formState: any;
  setformState: any;
  roleData: any;
  groupData: any;
  sendReset: () => void;
  cancel: any;
}) => {
  return (
    // Values pass to the UserManagementModal
    <>
      <UserManagementModal
        show={show}
        onHide={onHide}
        handleShowDelete={handleShowDelete}
        editUser={editUser}
        formSubmit={formSubmit}
        formState={formState}
        setformState={setformState}
        roleData={roleData}
        groupData={groupData}
        sendReset={sendReset}
        cancel={cancel}
      />
    </>
  );
};

export default UserCreateUpdate;

import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUserGear,
  faGears,
  faBook,
  faTags,
  faUsers,
  faPowerOff,
  faGear,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/actions/authActions";

const Layout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="header-container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src="/images/logo.png"
            style={{ maxHeight: "65px" }}
            className="ms-3 me-4"
            alt="logo"
          />
          <div className="me-4 clickable hover-blue">
            <FontAwesomeIcon className="me-1" icon={faBook} /> Workplace
          </div>
          <Link to={"/tags"} style={{textDecoration:"none"}}>
          <div className="me-4 clickable hover-blue">
            <FontAwesomeIcon className="me-1" icon={faTags} /> Libraries
          </div>
          </Link>
          <div className="clickable hover-blue">
            <FontAwesomeIcon className="me-1" icon={faUsers} /> Users & Groups
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="me-4 clickable hover-blue position-relative">
            <FontAwesomeIcon className="me-1" icon={faBell} />
            <div className="notification-count">15</div>
          </div>
          <div className="me-4 clickable hover-blue">
            <FontAwesomeIcon className="me-1" icon={faUser} /> Admin
          </div>
          <div className="me-4 clickable hover-blue">
            <FontAwesomeIcon className="me-1" icon={faGear} /> Settings
          </div>
          <div
            onClick={() => dispatch(userLogout())}
            className="clickable hover-blue me-4 pe-1"
          >
            <FontAwesomeIcon className="me-1" icon={faPowerOff} /> Logout
          </div>
        </div>
      </div>
      <div className="d-flex" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div>
          <ProSidebar collapsed={isCollapsed}>
            <SidebarHeader
              className="text-center d-flex align-items-center justify-content-between ps-4"
              style={{ height: "60px" }}
            >
              <FontAwesomeIcon
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={faBars}
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                  color: "#03A9F4",
                }}
              />
            </SidebarHeader>
            <Menu iconShape="square">
              <SubMenu
                title="Personal Settings"
                icon={
                  <FontAwesomeIcon
                    style={{ fontSize: "1.4rem" }}
                    icon={faUserGear}
                  />
                }
              >
                <MenuItem>User Account</MenuItem>
                <MenuItem>Two-factor Authentication</MenuItem>
              </SubMenu>
              <SubMenu
                title="General Settings"
                icon={
                  <FontAwesomeIcon
                    icon={faGears}
                    style={{ fontSize: "1.5rem" }}
                  />
                }
              >
                <MenuItem>
                  Workflow
                  <Link to="/workflow" />
                </MenuItem>
                <MenuItem>
                  Users
                  <Link to="/users" />
                </MenuItem>
                <MenuItem>
                  Groups
                  <Link to="/groups" />
                </MenuItem>
                <MenuItem>
                  Companies
                  <Link to="/company" />
                </MenuItem>
                <MenuItem>Vocabularies</MenuItem>
                <MenuItem>Configuration</MenuItem>
                <MenuItem>
                  User Role <Link to="/userrole" />
                </MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
        </div>

        <div className="ps-4 pe-4 pt-3 " style={{width:"100%"}}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

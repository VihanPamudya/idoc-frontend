import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Alert} from "react-bootstrap";

import UsersList from './pages/usersList';
import GroupList from './pages/Group-list';
import Login from './pages/login';
import ForgotPassword from './pages/forgot-password';
import CompanyList from "./pages/companyList";
import UserRoleList from "./pages/userRoleList";
import WorkflowList from "./pages/workflowList";
import TagList from "./pages/TagList";
import OverlaySpinner from "./components/common/OverlaySpinner";


function App() {

    const userDetails = useSelector((state: any)=> state.userData.userDetails);
    const loadingUtils : {loading: boolean, error: any} = useSelector((state: any) => state.loadingData);
    const state = useSelector((state: any)=> state);

    const [alert, setAlert] = useState('')

    useEffect(()=>{
        if(loadingUtils.error){
            setAlert(loadingUtils.error.message)
            setTimeout(()=>{
                setAlert('')
            },10000)
        } else if(!loadingUtils.error && alert){
            setAlert('')
        }
    }, [JSON.stringify(loadingUtils.error)])

    return (
        <div className="App">

            {alert && <Alert style={{position:'fixed', width:'100%', top:0, left:0, zIndex:1000, textAlign:'right'}} variant='danger'>{alert}</Alert> }
            <OverlaySpinner isLoading={loadingUtils.loading}/>


            <BrowserRouter>
                {userDetails || localStorage.getItem("token") ?
                    <Routes>
                        <Route path="*" element={<Navigate replace to="/users" />} />
                        <Route path="/groups" element={<GroupList/>}/>
                        <Route path="/users" element={<UsersList/>}/>
                        <Route path="/company" element={<CompanyList/>}/>
                        <Route path="/userrole" element={<UserRoleList/>}/>
                        <Route path="/workflow" element={<WorkflowList/>}/>
                        <Route path="/tags" element={<TagList/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="*" element={<Navigate replace to="/login" />} />
                    </Routes>
                }
            </BrowserRouter>
        </div>
    );
}

export default App;

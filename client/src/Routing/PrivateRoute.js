import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UidContext } from "../components/AppContext";
import { useContext } from "react";

import { useSelector } from 'react-redux'



const PrivateRoute = ({ component: Component, ...rest }) => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <div>
            {(uid  && (userData.role)== "Admin")  ? <Route component={Component} {...rest} /> : <Redirect to="/login" />}
        </div>
    )
}

export default PrivateRoute

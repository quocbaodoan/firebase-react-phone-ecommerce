import React from 'react'
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function AdminRoute({ component: Component, ...rest }) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <Route
            {...rest}
            render={props => {
                return (userInfo && userInfo.email === "quocbaodoan1999@gmail.com") ? <Component {...props} /> : <Redirect to="/signin" />
            }}
        >
        </Route>
    )
}

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Component/Authentication/Login";
import { useAuth } from './AuthContext/AuthContext';
import BasePage from "./BasePage"


export default function RoutesConfig() {
    const { state } = useAuth();

    const isAuthorized = state?.isAuthenticated;
  
    

    return (

        <Switch>
             
            {!isAuthorized ? (
                <Route>
                    <Login />
                    <Redirect from="/" to="/Login" />
                </Route>
            ) : (
                <><Redirect from="/Login" to="/dashboard" /><BasePage /></>
            )}

            <Route path="/Login" component={Login} />
           

           
        </Switch>
    );
}

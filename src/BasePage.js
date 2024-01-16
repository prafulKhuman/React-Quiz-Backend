import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";


const Dashboard = lazy(() => import("./Partition/Dashboard"));
const Question = lazy(() => import("./Partition/Question"));
const Quiz = lazy(() => import("./Partition/Quiz"));
const Category = lazy(() => import("./Partition/Category"));
const Rules = lazy(() => import("./Partition/Rules"));

export default function BasePage() {
  return (
    <Suspense >
      <Switch>
        
        
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/question" component={Question} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/category" component={Category} />
        <Route path="/rules" component={Rules} />
        
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Suspense>
  );
}



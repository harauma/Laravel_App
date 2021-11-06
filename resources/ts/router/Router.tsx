import React from "react";
import { memo, VFC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/todo">
        <Login />
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});

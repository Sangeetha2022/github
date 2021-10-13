import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UserLayout from "./Layout/UserLayout/UserLayout";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/user"
            render={(props: any) => <UserLayout {...props} />}
          />
          <Route
            path="/auth"
            render={(props: any) => <AuthLayout {...props} />}
          />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default App;

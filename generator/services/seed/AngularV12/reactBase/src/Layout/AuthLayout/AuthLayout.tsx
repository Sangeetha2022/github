import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../routes";
import "./AuthLayout.scss";
const AuthLayout = () => {
  const getRoutes = (routes: any[]) => {
    return routes.map((prop, key) => {
      console.log("I am from routes----------->>>>", prop);
      let Component = prop.component;

      if (prop.layout === "/auth") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            key={key}
            render={(props) => <Component {...prop} {...props} />}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div className="container-fluid background-image d-flex justify-content-center align-items-center text-center">
        <div>
          <img src="http://electricglide-5746.geppetto.link/assets/img/Group2704.png"></img>
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/auth/login" />
      </Switch>
      </div>
    </div>
  );
};

export default AuthLayout;

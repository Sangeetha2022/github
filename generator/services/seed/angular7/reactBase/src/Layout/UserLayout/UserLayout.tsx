import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import routes from "../../routes";

const UserLayout = () => {
  const getRoutes = (routes: any[]) => {
    return routes.map((prop, key) => {
      console.log("I am from routes----------->>>>", prop);
      let Component = prop.component;
      if (prop.layout === "/user") {
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
    <div>
      <NavBar></NavBar>
      <Switch>
        {getRoutes(routes)}
        {/* <Redirect from="*" to="/auth/login" /> */}
      </Switch>
      <Footer></Footer>
    </div>
  );
};

export default UserLayout;

import React from "react";
import "./Login.scss";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Login = (props:any) => {
  return (
    <div className="login-Wrappe text-left ">
      <h3 className="login-title">Please login</h3>
      <div className="text-align-left">
        <Form>
          <FormGroup>
            <Label className="login-label" for="exampleEmail">
              Email
            </Label>
            <Input
              className="login-input"
              type="text"
              name="email"
              id="exampleEmail"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label className="login-label" for="examplePassword">
              Password
            </Label>
            <Input
              className="login-input"
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
            />
          </FormGroup>
          <div className="text-center mb-3">
            <Button className="login-btn-width">Submit</Button>
          </div>
        </Form>
      </div>
      <span className="signup-text-color">Please Login or <span className="span-text-link" onClick={()=>props.history.push("/auth/signup")}>Login</span></span>
    </div>
  );
};
export default Login;

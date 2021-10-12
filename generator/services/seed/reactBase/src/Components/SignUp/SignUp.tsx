
import React from "react";
import "./SignUp.scss";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const SignUp = (props:any) => {
  return (
    <div className="login-Wrappe text-left ">
      <h3 className="login-title">Please Register</h3>
      <div className="text-align-left">
        <Form>
          <FormGroup>
            <Label className="login-label" for="exampleEmail">
              First Name
            </Label>
            <Input
              className="login-input"
              type="text"
              name="email"
              id="exampleEmail"
              placeholder="First Name"
            />
          </FormGroup>
          <FormGroup>
            <Label className="login-label" for="examplePassword">
              Last Name
            </Label>
            <Input
              className="login-input"
              type="text"
              name="password"
              id="examplePassword"
              placeholder="Last Name"
            />
          </FormGroup>
          <FormGroup>
            <Label className="login-label" for="examplePassword">
              Email
            </Label>
            <Input
              className="login-input"
              type="text"
              name="password"
              id="examplePassword"
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
      <span className="signup-text-color">Already Registered? <span className="span-text-link" onClick={()=>props.history.push("/auth/login")}>Login Here</span></span>
    </div>
  );
};
export default SignUp;

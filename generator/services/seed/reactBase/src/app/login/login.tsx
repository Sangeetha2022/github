import React, { useEffect, useState } from "react";
import "./login.scss";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import logo from '../../assets/img/Group2704.png';
import { login } from "./login.services";

const Login = (props:any) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
});

const { email, password } = formData;

const onChange = (e:any) => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async (e:any) => {
    e.preventDefault();
    const data = JSON.stringify(formData);
    login(data).then(datas => {
      console.log('login data', datas);
    });
};
  return (
    <div className="background-images">
    <div className="container left_align">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className="main">
            <div className="geppetto-img">
              <img src={logo}/>
            </div>
              <div className="login-Wrappe text-left ">
                <h3 className="login-title">Please login</h3>
                <div className="text-align-left">
                  <Form onSubmit={e => onSubmit(e)}>
                    <FormGroup>
                      <Label className="login-label" for="exampleEmail">
                        Email
                      </Label>
                      <Input
                        className="login-input"
                        type="text"
                        name="email"
                        value={email}
                        id="exampleEmail"
                        placeholder="Email"
                        onChange={e => onChange(e)}
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
                        value={password}
                        id="examplePassword"
                        placeholder="password"
                        onChange={e => onChange(e)}
                      />
                    </FormGroup>
                    <div className="text-center mb-3">
                      <Button className="login-btn-width">Submit</Button>
                    </div>
                  </Form>
                </div>
                <span className="signup-text-color">Please Login or <span className="span-text-link" onClick={()=>props.history.push("/signup")}>Login</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

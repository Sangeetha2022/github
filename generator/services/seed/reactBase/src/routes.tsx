import Template from "./app/template/template";
import Login from "./app/login/login";
import Signup from "./app/signup/signup";
import Home from "./app/home/home";
import Admin from "./app/admin/admin";
import React from 'react';
import { Route, Switch } from 'react-router-dom';


let routes: any = [
    {  path: "/home",  component: Home },
    {  path: "/", component: Template },
    {  path: "/login",  component: Login },
    {  path: "/signup",  component: Signup },
    {  path: "/admin",  component: Admin },
]

export default routes;


import CreateScreen from "./Components/CreateScreen/CreateScreen";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

var routes: any = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        layout: "/auth",
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
        layout: "/auth",
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        layout: "/user",
    },
    {
        path: "/createscreen",
        name: "Createscreen",
        component: CreateScreen,
        layout: "/user",
    },
]

export default routes;

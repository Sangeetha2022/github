import CreateScreen from "./app/createscreen/createscreen";
import Home from "./app/home/home";
import Login from "./app/login/login";
import SignUp from "./app/signup/signup";

var routes: any = [
    {
        path: "/login", name: "Login", component: Login, layout: "/auth",
    },
    {
        path: "/signup", name: "SignUp", component: SignUp, layout: "/auth",
    },
    {
        path: "/home", name: "Home", component: Home, layout: "/user",
    },
    {
        path: "/createscreen", name: "Createscreen", component: CreateScreen, layout: "/user",
    },
]

export default routes;

import LoginPage from "../../pages/Auth/LoginPage";
import MainPage from "../../pages/Main/MainPage";

const routes = [
  {
    path: "/",
    component: MainPage,
    exact: true,
  },
  {
    path: "/auth",
    component: LoginPage,
    exact: true,
  },
];

export default routes;

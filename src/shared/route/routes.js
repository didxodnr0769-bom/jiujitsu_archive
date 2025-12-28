import LoginPage from "../../pages/Auth/LoginPage";
import MainPage from "../../pages/Main/MainPage";

const routes = [
  {
    path: "/:categoryId?",
    component: MainPage,
  },
  {
    path: "/auth",
    component: LoginPage,
    exact: true,
  },
];

export default routes;

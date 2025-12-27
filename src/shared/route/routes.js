import LoginPage from "../../pages/Auth/LoginPage";
import MainPage from "../../pages/Main/MainPage";
import VideoPage from "../../pages/Video/VideoPage";

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
  {
    path: "/video",
    component: VideoPage,
    exact: true,
  },
  {
    path: "/video/:id",
    component: VideoPage,
    exact: true,
  },
];

export default routes;

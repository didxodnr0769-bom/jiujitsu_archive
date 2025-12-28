import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import { MainLayout } from "../presentation/layouts/MainLayout";

const AppRoute = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const PageComponent = route.component;

        // Routes that require the main layout
        const routesWithLayout = ["/"];
        const hideLayout = ["/auth"];

        if (hideLayout.includes(route.path)) {
          return (
            <Route key={index} path={route.path} element={<PageComponent />} />
          );
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <MainLayout>
                <PageComponent />
              </MainLayout>
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoute;

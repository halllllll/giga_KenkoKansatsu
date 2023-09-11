import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import ErrorPage from "../components/error-page";
import Card from "../components/menuParts/Card";
import TeachersDomain from "../components/menuParts/DomainForm/DomainFormRoot";
import Info from "../components/menuParts/Info";
import ParentPassword from "../components/menuParts/ParentPassForm/ParentPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Card message="メニューを選んでね" /> },
      {
        path: "parent",
        element: <ParentPassword />,
      },
      {
        path: "teachers_domain",
        element: <TeachersDomain />,
      },
      {
        path: "info",
        element: <Info />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;

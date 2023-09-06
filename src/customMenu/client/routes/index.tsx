import { Navigate, createBrowserRouter } from "react-router-dom";
import Card from "../components/Card";
import Home from "../components/Home";
import ParentPassword from "../components/ParentPassword";
import TeachersDomain from "../components/TeachersDomain";
import ErrorPage from "../components/error-page";

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
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;

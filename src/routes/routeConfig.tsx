import { createBrowserRouter } from 'react-router';
import AuthLayout from '../features/auth/pages/AuthLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import ProtectedRoute from '../features/auth/pages/ProtectedRoute';
import RegisterPage from '../features/auth/pages/RegisterPage';
import Layout from '../layout/Layout';
import CreateRecordPage from '../pages/CreateRecordPage';
import DetailsPage from '../pages/DetailsPage';
import ErrorPage from '../pages/errorPage/ErrorPage';
import HomePage from '../pages/HomePage';
import RecordTablePage from '../pages/RecordTablePage';
import UpdateRecordPage from '../pages/UpdateRecordPage';
import { MainPath } from '../layout/nav/enums';

const routeConfig = createBrowserRouter([
  {
    path: MainPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: MainPath.Login,
            element: <LoginPage />,
          },
          {
            path: MainPath.Register,
            element: <RegisterPage />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: MainPath.Records,
            element: <RecordTablePage />,
          },
          {
            path: `${MainPath.Details}/:id`,
            element: <DetailsPage />,
          },
          {
            path: `${MainPath.Update}/:id`,
            element: <UpdateRecordPage />,
          },
          {
            path: MainPath.Create,
            element: <CreateRecordPage />,
          },
        ],
      },
    ],
  },
]);

export default routeConfig;

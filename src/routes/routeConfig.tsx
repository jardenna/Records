import { createBrowserRouter } from 'react-router';
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
import { MainPath } from '../types/enums';

const routeConfig = createBrowserRouter([
  {
    path: MainPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
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
      {
        path: MainPath.Register,
        element: <RegisterPage />,
      },
      {
        path: 'protected',
        element: <ProtectedRoute />,
      },
      {
        path: MainPath.Login,
        element: <LoginPage />,
      },
    ],
  },
]);

export default routeConfig;

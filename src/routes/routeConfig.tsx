import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import CreateRecordPage from '../pages/CreateRecordPage';
import DetailsPage from '../pages/DetailsPage';
import ErrorPage from '../pages/errorPage/ErrorPage';
import HomePage from '../pages/HomePage';
import RecordTablePage from '../pages/RecordTablePage';
import UpdateRecordPage from '../pages/UpdateRecordPage';
import { MainPath } from '../types/enums';
import RegisterPage from '../features/auth/pages/RegisterPage';

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
    ],
  },
]);

export default routeConfig;

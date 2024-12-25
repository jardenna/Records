import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import CreateRecord from '../pages/CreateRecord';
import DetailsPage from '../pages/details/DetailsPage';
import ErrorPage from '../pages/errorPage/ErrorPage';
import HomePage from '../pages/HomePage';
import Records from '../pages/Records';
import Update from '../pages/UpdateRecord';
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
        element: <Records />,
      },
      {
        path: `${MainPath.Details}/:id`,
        element: <DetailsPage />,
      },
      {
        path: `${MainPath.Update}/:id`,
        element: <Update />,
      },
      {
        path: MainPath.Create,
        element: <CreateRecord />,
      },
    ],
  },
]);

export default routeConfig;

import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import routeConfig from './routes/routeConfig';

const App: FC = () => (
  <RouterProvider
    router={routeConfig}
    fallbackElement={<p>Initial Load...</p>}
  />
);

export default App;

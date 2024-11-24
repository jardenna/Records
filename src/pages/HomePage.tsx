import { FC } from 'react';
import ToastButton from './toasts/ToastButton';
import ToastList from './toasts/ToastList';

const HomePage: FC = () => (
  <div className="home-page">
    <h1>Welcome to the Home Page</h1>
    <ToastButton />
    <ToastList />
  </div>
);
export default HomePage;

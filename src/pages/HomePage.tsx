import { FC } from 'react';
import Button from '../components/Button';
import ToastList from './toasts/ToastList';
import useToast from './toasts/useToast';

const HomePage: FC = () => {
  const { adToast } = useToast();

  const handleOpenToast = () => {
    adToast({
      message: 'Toast message example',
      toastType: 'success',
    });
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <Button onClick={handleOpenToast}>Show Toast</Button>
      <ToastList />
    </div>
  );
};
export default HomePage;

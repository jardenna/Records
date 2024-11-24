import { FC } from 'react';
import Toast from '../components/toast/Toast';
import useToast from '../components/toast/useToast';

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
      <button type="button" onClick={handleOpenToast}>
        Klik
      </button>
      <Toast />
    </div>
  );
};
export default HomePage;

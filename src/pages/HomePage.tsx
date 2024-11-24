import { FC } from 'react';
import { useAppDispatch } from '../app/hooks';
import Button from '../components/Button';
import Toast from '../components/toast/Toast';
import { addToast } from '../features/toastSlice';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const handleOpenToast = () => {
    dispatch(
      addToast({
        message: 'hello from toast',
        toastType: 'success',
      }),
    );
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <Button onClick={handleOpenToast}>Klik</Button>
      <Toast />
    </div>
  );
};
export default HomePage;

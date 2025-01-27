import { FC } from 'react';
import { useRegisterMutation } from '../authApiSlice';

const RegisterPage: FC = () => {
  const user = { username: 'Per', email: 'per@mail.com', password: 'per123' };

  const [registerUser] = useRegisterMutation();

  const handleRegisterUser = () => {
    registerUser(user);
  };

  return (
    <section>
      <button type="button" onClick={handleRegisterUser}>
        klik
      </button>
    </section>
  );
};

export default RegisterPage;

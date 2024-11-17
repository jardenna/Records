import { FC } from 'react';
import DeleteRecordModal from '../components/DeleteRecordModal';
import { ModalId } from '../types/enums';
import DeleteRecordBtn from './details/DeleteRecordBtn';

const HomePage: FC = () => (
  <div>
    <h1>Welcome to the Home Page</h1>
    <DeleteRecordBtn id={ModalId.LoginModal} />
    <DeleteRecordModal id={ModalId.LoginModal} />
  </div>
);

export default HomePage;

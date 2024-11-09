import { FC } from 'react';
import Table from '../components/recordTable/Table';

interface SampleData {
  amount: string;
  date: number;
  id: number;
  name: string;
}

const HomePage: FC = () => {
  const sampleHeaders = {
    id: 'Id',
    name: 'Name',
    date: 'Date',
    amount: 'Amount',
  };
  const sampleData: SampleData[] = [
    { id: 1, name: 'John Doe', date: 1630437821, amount: '1000' },
    { id: 2, name: 'Jane Doe', date: 1630437831, amount: '2000' },
  ];
  return (
    <section>
      <Table headers={sampleHeaders} tableData={sampleData} />
    </section>
  );
};

export default HomePage;

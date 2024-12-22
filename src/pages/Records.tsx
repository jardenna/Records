import { FC, useState } from 'react';
import { SortOrder } from '../app/api/apiTypes';
import CustomSelect, {
  SelectedOption,
} from '../components/formElements/SelectBox';
import MetaTags from '../components/MetaTags';
import Pagination from '../components/pagination/Pagination';
import usePagination from '../components/pagination/usePagination';
import RecordTable from '../components/recordTable/RecordTable';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';
import useFormValidation from '../hooks/useFormValidation';

const Records: FC = () => {
  const pageLimit = 5;
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState(SortOrder.Desc);
  const [filters, setFilters] = useState<any>({ artist: '', title: '' });
  const [currentPage, setCurrentPage] = useState(1);

  const initialState = {
    categories: '10',
  };
  const { onCustomChange, values } = useFormValidation({
    initialState,
  });

  const { data: records } = useGetPaginatedRecordsQuery({
    page: currentPage,
    limit: Number(values.categories),
    sortField,
    sortOrder,
    artist: filters.artist,
  });

  const totalCount = records ? records.recordsCount : Number(values.categories);

  const {
    pageRange,
    totalPageCount,
    onPaginationItemClick,
    onPaginationAction,
  } = usePagination({
    totalCount,
    rowsPerPage: Number(values.categories),
    pageLimit,
    currentPage,
    setCurrentPage,
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
      );
    } else {
      setSortField(field);
      setSortOrder(SortOrder.Asc);
    }
  };

  const handleFilter = (e: any) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = (name: string, selectedOption: SelectedOption) => {
    const options = Array.isArray(selectedOption)
      ? selectedOption
      : [selectedOption];

    options.forEach((option) => {
      if (option) {
        onCustomChange(name, option.value);
      }
    });
  };

  return (
    <section>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title="Album table"
      />

      <form onSubmit={(e) => e.preventDefault()}>
        <CustomSelect
          name="categories"
          options={[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: totalCount, label: 'All' },
          ]}
          id="categories"
          onChange={(selectedOption) =>
            handleSearch('categories', selectedOption)
          }
          labelText="Results per page"
          defaultValue={{ value: 10, label: '10' }}
        />
        <input
          type="search"
          name="artist"
          id="artist"
          placeholder="Filter by artist"
          value={filters.artist}
          onChange={handleFilter}
        />
      </form>
      <h1>Records</h1>
      {records && <RecordTable records={records.results} onSort={handleSort} />}
      <div>
        {Number(values.categories)} of {records?.recordsCount} {currentPage}
        25
        {/* btn 1 = 1 - 10 records
       btn 2 = 11 - 21 records
       btn 3 = 22 - 32 records */}
      </div>
      <Pagination
        currentPage={currentPage}
        onPaginationItemClick={onPaginationItemClick}
        onPaginationAction={onPaginationAction}
        pageLimit={pageLimit}
        pageRange={pageRange}
        totalPageCount={totalPageCount}
      />
    </section>
  );
};

export default Records;

const baseRecordApi = 'records';

const endpoints = {
  amountOfRecords: `${baseRecordApi}/amount`,
  firstSix: `${baseRecordApi}/firstSix`,
  deleteRecord: `${baseRecordApi}/delete`,
  records: baseRecordApi,
};

export default endpoints;

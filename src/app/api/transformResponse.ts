/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
function transformId(data: any) {
  data.results.forEach((result: any) => {
    result.id = result._id;
    delete result._id;
  });
  return data;
}

export default transformId;

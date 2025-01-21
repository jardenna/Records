/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
function transformId(data: any) {
  data.forEach((result: any) => {
    result.id = result._id;
    delete result._id;
  });
  return data;
}

export default transformId;

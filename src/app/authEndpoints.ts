const baseAuthApi = 'auth';

const authEndpoints = {
  register: `${baseAuthApi}/register`,
  login: `${baseAuthApi}/login`,
  checkAuth: `${baseAuthApi}/check-auth`,
};

export default authEndpoints;

import axios from "axios";

const login = (username, password) => {
  const URL = '/api/v1/user/login';
  const data = { username, password };
  return axios.post(URL, data);
};

const register = (username, password) => {
  const URL = '/api/v1/user/register';
  const data = { username, password };
  return axios.post(URL, data);
};

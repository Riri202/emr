// import axios from 'axios';
import httpService from '../../../utils/axios';
import setAuthToken from '../../../utils/setAuthToken';
// const API_URL = 'https://emr-server.herokuapp.com';
const loginUrl = '/auth/login';

const login = (userData) => {
  return httpService.post(loginUrl, userData);
  // return await axios({
  //   method: 'post',
  //   url: `${API_URL}/auth/login`,
  //   data: userData
  //   // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  // }).then((response) => {
  //   if (response.data.token) {
  //     localStorage.setItem('user', JSON.stringify(response.data));
  //     setAuthToken(response.data.token);
  //   }
  //   console.log(response);
  //   return response.data;
  // });
};

const logout = () => {
  localStorage.removeItem('user');
  setAuthToken();
};

const authService = { login, logout };
export default authService;

import axios from 'axios';
const API_URL = 'https://emr-server.herokuapp.com';

const login = async (userData) => {
  return await axios({
    method: 'post',
    url: `${API_URL}/auth/login`,
    data: userData
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then((response) => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    console.log(response);
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = { login, logout };
export default authService;

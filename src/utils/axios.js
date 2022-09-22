import axios from 'axios';

//TODO use env variable instead
const httpService = axios.create({
  // baseURL: 'https://emr-server.herokuapp.com'
  baseURL: 'http://localhost:3111'
});

export default httpService;

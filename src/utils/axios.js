import axios from 'axios';

//TODO use env variable instead
const httpService = axios.create({ baseURL: 'https://emr-server.herokuapp.com' });

export default httpService;

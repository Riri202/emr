import axios from 'axios';

const httpService = axios.create({ baseURL: 'https://emr-server.herokuapp.com' });

export default httpService;

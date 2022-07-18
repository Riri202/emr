import axios from 'axios';
import authHeader from '../../redux/features/auth/authHeader';
import { API_URL } from '../constants';

export const getAllStaff = async () => {
  try {
    const { response } = await axios({
      method: 'get',
      url: `${API_URL}/staff`,
      params: {
        page: 0,
        size: 20
      },
      headers: authHeader()
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

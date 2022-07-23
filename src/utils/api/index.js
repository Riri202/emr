import axios from 'axios';
import authHeader from '../../redux/features/auth/authHeader';
import httpService from '../axios';
import { API_URL } from '../constants';

const addStaffUrl = '/staff';
const InventoryUrl = '/inventory';
const PatientUrl = '/patient';

export const getAllStaff = async () => {
  try {
    return await axios({
      method: 'get',
      url: `${API_URL}/staff`,
      params: {
        page: 0,
        size: 20
      },
      headers: authHeader()
    }).then((response) => {
      return response.data.rows;
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendQueue = async (patientId, toStaffId) => {
  try {
    return await axios({
      method: 'post',
      url: `${API_URL}/queue/add`,
      data: {
        patientId,
        toStaffId
      },
      headers: authHeader()
    }).then((response) => {
      console.log(response);
      return response.data.rows;
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSentQueues = async (staffId, status) => {
  try {
    return await axios({
      method: 'get',
      url: `${API_URL}/queue/staff/sent`,
      params: {
        staffId,
        status
      },
      headers: authHeader()
    }).then((response) => {
      console.log(response);
      return response.data;
    });
  } catch (error) {
    console.log(error);
  }
};
export const updatePatient = (data) => {
  return httpService.patch(PatientUrl, data);
};
export const addNewStaff = (data) => {
  return httpService.post(addStaffUrl, data);
};

export const addNewInventory = (data) => {
  return httpService.post(InventoryUrl, data);
};

export const updateInventory = (data) => {
  return httpService.patch(InventoryUrl, data);
};

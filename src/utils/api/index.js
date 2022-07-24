// import axios from 'axios';
// import authHeader from '../../redux/features/auth/authHeader';
import httpService from '../axios';
// import { API_URL } from '../constants';

const StaffUrl = '/staff';
const InventoryUrl = '/inventory';
const PatientUrl = '/patient';
const ReceivedQueuesUrl = '/queue/staff/received';
const sendQueueUrl = '/queue/add';
const PrescriptionUrl = '/prescription';
const SessionUrl = '/session';

// export const getAllStaff = async () => {
//   try {
//     return await axios({
//       method: 'get',
//       url: `${API_URL}/staff`,
//       params: {
//         page: 0,
//         size: 20
//       },
//       headers: authHeader()
//     }).then((response) => {
//       return response.data.rows;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const sendQueue = async (patientId, toStaffId) => {
//   try {
//     return await axios({
//       method: 'post',
//       url: `${API_URL}/queue/add`,
//       data: {
//         patientId,
//         toStaffId
//       },
//       headers: authHeader()
//     }).then((response) => {
//       console.log(response);
//       return response.data.rows;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getSentQueues = async (staffId, status) => {
//   try {
//     return await axios({
//       method: 'get',
//       url: `${API_URL}/queue/staff/sent`,
//       params: {
//         staffId,
//         status
//       },
//       headers: authHeader()
//     }).then((response) => {
//       console.log(response);
//       return response.data;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const addNewStaff = (data) => {
  return httpService.post(StaffUrl, data);
};
export const getAllStaff = (page, size) => {
  return httpService.get(StaffUrl, { params: { page, size } });
};
export const sendQueue = (data) => {
  return httpService.post(sendQueueUrl, data);
};
export const getReceivedQueues = (staffId, status) => {
  return httpService.get(ReceivedQueuesUrl, { params: { staffId, status } });
};
export const getAllPatients = (page, size) => {
  return httpService.get(PatientUrl, { params: { page, size } });
};
export const updatePatient = (data) => {
  return httpService.patch(PatientUrl, data);
};
export const addNewInventory = (data) => {
  return httpService.post(InventoryUrl, data);
};

export const updateInventory = (data) => {
  return httpService.patch(InventoryUrl, data);
};

export const addPrescription = (data) => {
  return httpService.post(PrescriptionUrl, data);
};
export const updatePrescription = (data) => {
  return httpService.patch(PrescriptionUrl, data);
};
export const getSessions = (page, size) => {
  return httpService.get(SessionUrl, { params: { page, size } });
};

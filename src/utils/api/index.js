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
const PrescriptionInSessionUrl = '/prescription/session/';
const TestsInSessionUrl = '/lab/session/';
const LabUrl = '/lab';
const DiagnosisUrl = '/diagnosis';
const SymptomsUrl = '/symptoms';

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

export const addNewPatients = (data) => {
  return httpService.post(PatientUrl, data);
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
export const getAllInventoryItems = (page, size) => {
  return httpService.get(InventoryUrl, { params: { page, size } });
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
export const getSessionPrescriptions = (sessionId) => {
  return httpService.get(PrescriptionInSessionUrl + sessionId, { params: { page: 0, size: 10 } });
};

export const addNewTest = (data) => {
  return httpService.post(LabUrl, data);
};
export const getSessionTests = (sessionId) => {
  return httpService.get(TestsInSessionUrl + sessionId, { params: { page: 0, size: 10 } });
};

export const getSessions = (page, size) => {
  return httpService.get(SessionUrl, { params: { page, size } });
};

export const addNewDiagnosis = (data) => {
  return httpService.post(DiagnosisUrl, data);
};

export const addNewSymptom = (data) => {
  return httpService.post(SymptomsUrl, data);
};

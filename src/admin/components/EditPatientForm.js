/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import EditForm from './EditForm';
import { toast } from 'react-toastify';
import { updatePatient } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

const user = JSON.parse(localStorage.getItem('user'));
export default function EditWorkerForm({ selectedPatient, setRows, rows }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    name: selectedPatient.name,
    email: selectedPatient.email,
    phoneNumber: selectedPatient.phoneNumber,
    dob: selectedPatient.dob
  });
  const { name, email, phoneNumber, dob } = inputData;
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // add changes made to the patient table
  const updatedPatient = (id, inputData) => {
    setRows(rows.map((row) => (row.uuid === id ? inputData : row)));
  };

  const handleUpdatePatientDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const uuid = selectedPatient.uuid;
    const patientFormData = { name, email, phoneNumber, dob, uuid };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await updatePatient(patientFormData);
      updatedPatient(uuid, inputData);
      setIsLoading(false);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const formDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Name',
      defaultValue: name
    },
    {
      name: 'email',
      id: 'email',
      label: 'Email',
      defaultValue: email
    },
    {
      name: 'phoneNumber',
      id: 'phoneNumber',
      label: 'Phone Number',
      defaultValue: phoneNumber
    },
    {
      name: 'dob',
      id: 'dob',
      label: 'Date of Birth',
      defaultValue: dob
    }
  ];

  return (
    <div>
      <EditForm
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={handleUpdatePatientDetails}
        handleChange={handleChange}
        formDetails={formDetails}
        isLoading={isLoading}
        titleText="patient"
        btnText="patient"
      />
    </div>
  );
}

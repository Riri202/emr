/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { updateStaff } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import EditForm from './EditForm';

export default function EditWorkerForm({ selectedWorker, setRows, rows, user }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    fullName: selectedWorker.fullName,
    username: selectedWorker.username,
    role: selectedWorker.role,
    uuid: selectedWorker.uuid
  });
  const { fullName, username, role, uuid } = inputData;
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

  // add changes made to the staff table
  const updatedStaff = (id, inputData) => {
    setRows(rows.map((row) => (row.uuid === id ? inputData : row)));
  };

  const handleUpdateStaffDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const uuid = selectedWorker.uuid;
    // const staffFormData = { fullName, username, role, uuid };

    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await updateStaff(inputData);
      updatedStaff(uuid, inputData);
      setIsLoading(false);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  const formDetails = [
    {
      name: 'fullName',
      id: 'fullname',
      label: 'Name',
      defaultValue: fullName
    },
    {
      name: 'username',
      id: 'username',
      label: 'Username',
      defaultValue: username
    },
    {
      name: 'role',
      id: 'role',
      label: 'Role',
      defaultValue: role
    }
  ];
  return (
    <div>
      <EditForm
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={handleUpdateStaffDetails}
        handleChange={handleChange}
        formDetails={formDetails}
        isLoading={isLoading}
        titleText="staff"
        btnText="staff"
      />
    </div>
  );
}

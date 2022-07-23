/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import authHeader from '../../redux/features/auth/authHeader';
import EditForm from './EditForm';

export default function EditWorkerForm({ selectedWorker, setRows, rows }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    fullName: selectedWorker.fullName,
    username: selectedWorker.username,
    password: selectedWorker.password,
    role: selectedWorker.role
  });
  const { fullName, username, password, role } = inputData;
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
    const uuid = selectedWorker.uuid;
    console.log(uuid);
    const staffFormData = { fullName, username, password, role, uuid };

    try {
      const response = await axios({
        method: 'patch',
        url: 'https://emr-server.herokuapp.com/staff',
        data: staffFormData,
        headers: authHeader()
      }).then((response) => {
        console.log(response);
        updatedStaff(uuid, inputData);
        setIsLoading(false);
        setOpen(false);
      });
      // TODO maybe return response or find out something else you can do with it
      console.log(response);
    } catch (error) {
      console.log(error);
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
      name: 'password',
      id: 'password',
      label: 'Password',
      defaultValue: password
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
      />
    </div>
  );
}

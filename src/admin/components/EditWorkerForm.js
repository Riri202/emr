/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import authHeader from '../../redux/features/auth/authHeader';

export default function EditWorkerForm({ selectedWorker, setRows, rows }) {
  const [open, setOpen] = useState(false);

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
        console.log(JSON.parse(response.config.data));
        updatedStaff(uuid, inputData);
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <IconButton className="outline-none" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={handleUpdateStaffDetails} className="w-full">
          <DialogTitle>Edit Worker Details</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit details below</DialogContentText>
            <div className="flex flex-col space-y-2">
              <TextField
                name="fullName"
                id="fullname"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                defaultValue={fullName}
              />
              <TextField
                name="username"
                id="username"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                defaultValue={username}
              />
              <TextField
                name="password"
                id="password"
                label="Password"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                defaultValue={password}
              />
              <TextField
                name="role"
                id="role"
                label="Role"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                defaultValue={role}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className="pt-2 pb-2 pl-4 pr-4 mt-1 bg-green-500 text-[#000] ml-3">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleClose}
              className="pt-2 pb-2 pl-6 pr-6 mt-1 bg-green-500 text-[#000] ml-3">
              Edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

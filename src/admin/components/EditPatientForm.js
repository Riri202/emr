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
import IntuitiveButton from '../../common-components/IntuitiveButton';

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

  const handleUpdateStaffDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const uuid = selectedPatient.uuid;
    console.log(uuid);
    const patientFormData = { name, email, phoneNumber, dob, uuid };

    try {
      const response = await axios({
        method: 'patch',
        url: 'https://emr-server.herokuapp.com/patient',
        data: patientFormData,
        headers: authHeader()
      }).then((response) => {
        console.log(response);
        updatedPatient(uuid, inputData);
        setIsLoading(false);
        setOpen(false);
      });
      // TODO maybe return response or find out something else you can do with it
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
          <DialogTitle>Edit Pateint Details</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit details below</DialogContentText>
            <div className="flex flex-col space-y-2">
              <TextField
                name="name"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                defaultValue={name}
              />
              <TextField
                name="email"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                defaultValue={email}
              />
              <TextField
                name="phoneNumber"
                id="phoneNumber"
                label="Phone Number"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                defaultValue={phoneNumber}
              />
              <div className="w-full">
                <input
                  name="dob"
                  type="date"
                  id="dob"
                  defaultValue={dob}
                  onChange={handleChange}
                  className="p-3"
                />
              </div>

              {/* <TextField
                name="role"
                id="role"
                label="Role"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                defaultValue={role}
              /> */}
              <div className="w-full">
                <IntuitiveButton text="Edit Patient" isLoading={isLoading} />
              </div>
              {/* <Button
                fullWidth
                type="submit"
                onClick={handleClose}
                className="bg-green-500 text-[#000]">
                Edit Staff
              </Button> */}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className="pt-2 pb-2 pl-4 pr-4 mt-1 bg-green-500 text-[#000] self-end">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

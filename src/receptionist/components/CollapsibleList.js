/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { sendQueue } from '../../utils/api';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import DropdownButton from '../../common-components/DropdownButton';
import setAuthToken from '../../utils/setAuthToken';

const user = JSON.parse(localStorage.getItem('user'));

const CustomizedListItem = ({ patient, doctorsList }) => {
  const [open, setOpen] = useState(false);
  const [staffName, setStaffName] = useState('');
  const handleClick = () => {
    setOpen(!open);
  };

  const doctorNames = doctorsList.map((doctor) => doctor.fullName);
  // eslint-disable-next-line no-unused-vars
  const arr = () => doctorNames.map((i) => false);

  const handleDoctorChoice = (event) => {
    setStaffName(event.target.value);
    console.log(staffName);
  };

  const getSelectedDoctorInfo = (name, doctorsList) => {
    return doctorsList.find((doctor) => doctor.fullName === name);
  };
  const handleSendToDoctor = async (event, patientId) => {
    event.preventDefault();
    const doctor = getSelectedDoctorInfo(staffName, doctorsList);
    const toStaffId = doctor.uuid;
    const requestData = { patientId, toStaffId };
    console.log(requestData);
    if (user) {
      setAuthToken(user.token);
    }

    try {
      const { data } = await sendQueue(requestData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={() => handleSendToDoctor(event, patient.uuid)}>
      <ListItem button key={patient.id} onClick={handleClick}>
        <ListItemText primary={patient.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="li" disablePadding key={patient.id}>
          <ListItem button>
            <ListItemIcon>{/* <InsertDriveFileTwoToneIcon /> */}</ListItemIcon>
            <ListItemText primary={patient.email} />
            <ListItemText primary={patient.id} />
            <ListItemText primary={patient.dob} />
            <ListItemText primary={patient.phoneNumber} />
          </ListItem>
        </List>
        <div>
          <DropdownButton
            choice={staffName}
            menuItems={doctorNames}
            onChange={handleDoctorChoice}
          />
          <IntuitiveButton text="send to doctor" />
        </div>
      </Collapse>
    </form>
  );
};

export default function CollapsibleList({ patientsList, doctorsList, doctorNames }) {
  return (
    <div>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {patientsList &&
          patientsList.map((patient) => {
            return (
              <CustomizedListItem
                key={patient.id}
                patient={patient}
                doctorsList={doctorsList}
                doctorNames={doctorNames}
              />
            );
          })}
      </List>
    </div>
  );
}

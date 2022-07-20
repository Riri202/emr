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
import DropdownButton from './DropdownButton';
import IntuitiveButton from './IntuitiveButton';
import { sendQueue } from '../utils/api';

// function CustomizedList({ patient, doctorNames, doctorsList }) {
//   const [open, setOpen] = useState(true);
//   const [staffName, setStaffName] = useState('');

//   const handleClick = () => {
//     setOpen(!open);
//   };
//   const handleDoctorChoice = (event) => {
//     if (event.target.checked) {
//       setStaffName(event.target.value);
//     }
//   };
//   const getSelectedDoctorInfo = (name, doctorsList) => {
//     return doctorsList.find((doctor) => doctor.name === name);
//   };
//   const handleSendToDoctor = async (patientId) => {
//     const doctor = getSelectedDoctorInfo(staffName, doctorsList);
//     const toStaffId = doctor.uuid;
//     const data = await sendQueue(patientId, toStaffId);
//     console.log(data);
//   };

//   return (
//     <>
//       <form onSubmit={() => handleSendToDoctor(patient.uuid)}>
//         <ListItemButton id={patient.id} onClick={handleClick}>
//           <ListItemIcon>
//             <InboxIcon />
//           </ListItemIcon>
//           <ListItemText primary={patient.name} />
//           {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {/* <ListItemButton sx={{ pl: 4 }}>
//                   <ListItemIcon>
//                     <StarBorder />
//                   </ListItemIcon> */}
//             <ListItemText primary={patient.id} />
//             <ListItemText primary={patient.dob} />
//             <ListItemText primary={patient.phoneNumber} />
//             <ListItemText primary={patient.email} />
//             {/* </ListItemButton> */}
//           </List>
//           <div>
//             <DropdownButton
//               btnText="Select a doctor"
//               menuItems={doctorNames}
//               handleCheckboxChange={handleDoctorChoice}
//             />
//             <IntuitiveButton text="send to doctor" />
//           </div>
//         </Collapse>
//       </form>
//     </>
//   );
// }

// export default function CollapsibleList({ patientsList, doctorNames, doctorsList }) {
//   return (
//     <div>
//       <List
//         sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//         component="div"
//         aria-labelledby="nested-list-subheader"
//         subheader={
//           <ListSubheader component="div" id="nested-list-subheader">
//             Nested List Items
//           </ListSubheader>
//         }>
//         {patientsList &&
//           patientsList.map((patient, key) => {
//             <CustomizedList
//               key={key}
//               patient={patient}
//               doctorNames={doctorNames}
//               doctorsList={doctorsList}
//             />;
//           })}
//       </List>
//     </div>
//   );
// }

const CustomizedListItem = ({ patient, doctorsList, doctorNames }) => {
  const [open, setOpen] = useState(false);
  const [staffName, setStaffName] = useState('');
  const handleClick = () => {
    setOpen(!open);
  };
  const handleDoctorChoice = (event) => {
    if (event.target.checked) {
      setStaffName(event.target.value);
    }
  };
  const getSelectedDoctorInfo = (name, doctorsList) => {
    return doctorsList.find((doctor) => doctor.name === name);
  };
  const handleSendToDoctor = async (patientId) => {
    const doctor = getSelectedDoctorInfo(staffName, doctorsList);
    const toStaffId = doctor.uuid;
    const data = await sendQueue(patientId, toStaffId);
    console.log(data);
  };

  return (
    <form onSubmit={() => handleSendToDoctor(patient.uuid)}>
      <ListItem button key={patient.id} onClick={handleClick}>
        <ListItemText primary={patient.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse key={patient.id} in={open} timeout="auto" unmountOnExit>
        <List component="li" disablePadding key={patient.id}>
          <ListItem button key={patient.id}>
            <ListItemIcon>{/* <InsertDriveFileTwoToneIcon /> */}</ListItemIcon>
            <ListItemText key={patient.id} primary={patient.email} />
            <ListItemText primary={patient.id} />
            <ListItemText primary={patient.dob} />
            <ListItemText primary={patient.phoneNumber} />
          </ListItem>
        </List>
        <div>
          <DropdownButton
            btnText="Select a doctor"
            menuItems={doctorNames}
            handleCheckboxChange={handleDoctorChoice}
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

/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../common-components/Nav';
import PatientSearchBar from '../../common-components/PatientSearchBar';
import Box from '@mui/material/Box';
import Paper from '@material-ui/core/Paper';
import authHeader from '../../redux/features/auth/authHeader';
import { getAllStaff } from '../../utils/api';
import CollapsibleList from '../components/CollapsibleList';
import setAuthToken from '../../utils/setAuthToken';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const user = JSON.parse(localStorage.getItem('user'));

function ReceptionistHome() {
  const [searchQuery, setSearchQuery] = useState('');

  // get patients list from admin
  const [patientsList, setPatientsList] = useState([]);
  // get doctors list from admin
  const [doctorsList, setDoctorsList] = useState([]);
  // const [staffName, setStaffName] = useState('');

  const today = new Date();
  const date = today.toDateString();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  const filterData = (query, patientsList) => {
    if (!query) {
      return patientsList;
    } else {
      return patientsList
        .map((patient) => patient)
        .filter((patient) => patient.name.toLowerCase().includes(query.toLowerCase()));
    }
  };

  const getAvailableDoctors = (allStaff) => {
    const allDoctors = allStaff.rows.filter(
      // TODO this filter should have a condition to also return doctors with available property set to true
      (staff) => staff.role === 'DOCTOR'
    );
    setDoctorsList([...allDoctors]);
    console.log(doctorsList);
  };

  const getAllPatients = async () => {
    // setIsLoading(true);
    try {
      const response = await axios({
        method: 'get',
        url: 'https://emr-server.herokuapp.com/patient',
        params: {
          page: 0,
          size: 20
        },
        headers: authHeader()
      }).then((response) => {
        console.log(response);
        if (response.data.rows.length) {
          setPatientsList(response.data.rows);
          filterData(searchQuery, patientsList);
          console.log(patientsList);
        }
        // setIsLoading(false);
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const dataFiltered = filterData(searchQuery, patientsList);

  const getAllDoctors = async () => {
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllStaff(page, size);
      if (data) {
        getAvailableDoctors(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPatients();
    getAllDoctors();
  }, []);

  return (
    <div>
      <Nav />
      <Box>
        <div className="flex flex-row items-start w-screen space-x-10 p-10">
          <div>
            <List>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="h6">Receptionist {user.user.fullName}</Typography>}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary={date} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary={time} />
              </ListItem>
            </List>
          </div>
          <div className="flex-grow">
            <PatientSearchBar setSearchQuery={setSearchQuery} label="Find a patient" />
          </div>
        </div>

        <div className="p-20">
          <p className="text-lg font-bold">Incoming patients</p>
          <Paper style={{ padding: 15, borderRadius: 16 }}>
            {!patientsList.length ? (
              <p className="text-lg mb-3 text-red-500">Patient list is empty.</p>
            ) : !dataFiltered.length ? (
              <p className="text-lg mb-3 text-red-500">Patient is not on the list.</p>
            ) : (
              <div>
                {dataFiltered ? (
                  <CollapsibleList patientsList={dataFiltered} doctorsList={doctorsList} />
                ) : null}
              </div>
            )}
          </Paper>
        </div>
      </Box>
    </div>
  );
}

export default ReceptionistHome;

// {
/* <div style={{ padding: 3 }}>
{patientsList && isSearching ? (
  <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          {headers.map((header, key) => {
            return (
              <TableCell key={key} align="center" className="bg-green-500">
                {header}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      {patientsList.length === 0 ? (
        <h1 className="text-lg mb-3 text-red-500">Patient is not on the list.</h1>
      ) : (
        <TableBody>
          {patientsList.map((patient, index) => (
            // <form onSubmit={() => handleSendToDoctor(patient.uuid)}>
            <TableRow key={index}>
              <TableCell align="center" component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {patient.id}
              </TableCell>
              <TableCell align="center">{patient.name}</TableCell>
              <TableCell align="center" component="th" scope="row">
                <Checkbox
                  size="small"
                  // checked={isIncomingPatient}
                  onChange={() =>
                    handleCheckboxChange(event, setChoice, choice, patient.uuid)
                  }
                  value={patient.name}
                />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <DropdownButton btnText="Select a doctor" menuItems={doctorNames} />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <IntuitiveButton text="send to doctor" />
              </TableCell>
            </TableRow>
            // {/* </form> */
// }
// ))}
// </TableBody>
// )}
// </Table>
// </TableContainer>
// ) : null}
// </div> */}

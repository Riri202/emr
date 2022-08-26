/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import Nav from '../../common-components/Nav';
import PatientSearchBar from '../../common-components/PatientSearchBar';
import Box from '@mui/material/Box';
import Paper from '@material-ui/core/Paper';
import { getAllPatients, getAllStaff } from '../../utils/api';
import CollapsibleList from '../components/CollapsibleList';
import setAuthToken from '../../utils/setAuthToken';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useCurrentUser } from '../../utils/hooks';

// const user = JSON.parse(localStorage.getItem('user'));

function ReceptionistHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const user = useCurrentUser();

  const [patientsList, setPatientsList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const getPatients = async () => {
    setIsLoading(true);
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllPatients(page, size);
      setIsLoading(false);
      if (data) {
        setPatientsList(data.rows);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('an error occured');
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
    getPatients();
    getAllDoctors();
  }, []);

  return (
    <div>
      {/* <Nav /> */}
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
            {isLoading ? (
              <CircularProgress size={30} />
            ) : !patientsList.length ? (
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

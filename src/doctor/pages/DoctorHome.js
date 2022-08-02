/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Person } from '@mui/icons-material';
import Nav from '../../common-components/Nav';
import PatientSearchBar from '../../common-components/PatientSearchBar';
import { FaUserMd } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import PatientsPersonalPage from './PatientsPersonalPage';
import { getReceivedQueues } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
const user = JSON.parse(localStorage.getItem('user'));
function DoctorHome() {
  const classes = useStyles();
  const headers = ['Index', 'ID', 'Name', 'Email', 'Phone No', 'DOB'];
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [patientsList, setPatientsList] = useState([]);
  // const allWorkers = JSON.parse(localStorage.getItem('allWorkers'));
  const [isDoctorAvailable, setIsDoctorAvailable] = useState(
    JSON.parse(localStorage.getItem('isDoctorAvailable')) ?? false
  );
  const [availableDoctors, setAvailableDoctors] = useState(
    JSON.parse(localStorage.getItem('availableDoctors')) ?? []
  );
  const filterData = (query, patientsList) => {
    if (!query) {
      return patientsList;
    } else {
      return patientsList
        .map((row) => row.Patient)
        .filter((patient) => patient.name.toLowerCase().includes(query));
    }
  };
  const patientsFromReceptionist = async () => {
    const staffId = user.user.uuid;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getReceivedQueues(staffId, 'PENDING');
      const patients = data.rows;
      console.log(data);
      if (data) {
        setPatientsList(patients);
        console.log(patientsList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dataFiltered = filterData(searchQuery, patientsList);

  // TODO this list should come from the receptionist so set receptionist send to in localstorage and then get it from here for specific doctor
  // const patientsList = JSON.parse(localStorage.getItem('patients')) ?? [];

  // const findDoctor = (role, id) => {
  //   return allWorkers.filter((worker) => worker.role === role && worker.id === id);
  // };
  // const thisDoctor = findDoctor('doctor', 4);
  // console.log(thisDoctor);

  // TODO this function will instead make a patch or put request to update the doctors availability on the backend
  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setIsDoctorAvailable(true);
      if (availableDoctors.length > 0) {
        setAvailableDoctors(availableDoctors.push(user.user.fullName));
      } else if (availableDoctors.length === 0) {
        setAvailableDoctors([user.user.fullName]);
      }
    }
    if (!event.target.checked) {
      setIsDoctorAvailable(false);
      setAvailableDoctors(availableDoctors.filter((doc) => doc !== user.user.fullName));
    }
  };
  useEffect(() => {
    localStorage.setItem('availableDoctors', JSON.stringify(availableDoctors));
  }, [availableDoctors]);

  useEffect(() => {
    localStorage.setItem('isDoctorAvailable', JSON.stringify(isDoctorAvailable));
  }, [isDoctorAvailable]);

  useEffect(() => {
    patientsFromReceptionist();
  }, []);
  return (
    <div>
      <Nav />
      <div className="p-8">
        <section className="flex justify-between">
          <div>
            <div className="flex space-x-2">
              <FaUserMd className="mt-5" />
              <h2 className="text-xl">Dr. {user.user.fullName} </h2>
            </div>
            <div className="flex space-x-2 mt-[-2px]">
              <Checkbox size="small" checked={isDoctorAvailable} onChange={handleCheckboxChange} />
              <p className="text-sm">Available (online)</p>
            </div>
          </div>
          <div className="">
            <PatientSearchBar
              setIsSearching={setIsSearching}
              setSearchQuery={setSearchQuery}
              label="Find a patient"
            />
          </div>
        </section>
        <section className="mt-6">
          <div className="flex justify-start">
            <AvatarGroup total={patientsList.length}>
              <Avatar className="bg-orange-500 mt-1" variant="circular">
                <Person />
              </Avatar>
            </AvatarGroup>
          </div>
          <p className="text-sm mt-[-2px]">Incoming patients</p>
        </section>
      </div>
      <section className="flex flex-row justify-center items-center">
        {patientsList ? (
          <TableContainer component={Paper} style={{ width: '90vw' }}>
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
              {/* TODO change this PatientList back to dataFiltered and figure out how to implement search again */}
              {!patientsList.length ? (
                <h1 className="text-lg mb-3 text-red-500">Patient is not on the list.</h1>
              ) : (
                <TableBody>
                  {patientsList &&
                    patientsList.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{data.Patient.id}</TableCell>
                        <TableCell align="center">
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/patient/${data.Patient.uuid}/${data.Patient.name}/${data.session.id}`}>
                            {data.Patient.name}
                          </Link>
                        </TableCell>
                        <TableCell align="center">{data.Patient.email}</TableCell>
                        <TableCell align="center">{data.Patient.phoneNumber}</TableCell>
                        <TableCell align="center">{data.Patient.dob}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        ) : null}
      </section>
    </div>
  );
}

export default DoctorHome;

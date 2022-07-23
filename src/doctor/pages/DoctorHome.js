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
import { filterData } from '../../utils/index';
// import PatientsPersonalPage from './PatientsPersonalPage';
import { getSentQueues } from '../../utils/api';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
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

  const user = JSON.parse(localStorage.getItem('user'));

  const patientsFromReceptionist = async () => {
    const staffId = user.user.uuid;
    const data = await getSentQueues(staffId, 'PENDING');
    console.log(data);
    const patients = data.rows.map((row) => row.Patient);
    if (data) {
      setPatientsList(patients);
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
              {/* <h2 className="text-xl">Dr. {user.user.fullName} </h2> */}
              <h2 className="text-xl">Dr. doctortoror </h2>
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
            {dataFiltered.length === 0 ? (
              <h1 className="text-lg mb-3 text-red-500">Patient is not on the list.</h1>
            ) : (
              <TableBody>
                {dataFiltered.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {data.id}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/patient/${data.uuid}/${data.fullName}`}>
                        {data.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {data.email}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {data.phoneNumber}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {data.dob}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
}

export default DoctorHome;

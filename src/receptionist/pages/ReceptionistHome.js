/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import Nav from '../../common-components/Nav';
import PatientSearchBar from '../../common-components/PatientSearchBar';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
function ReceptionistHome() {
  const classes = useStyles();
  const headers = ['Index', 'ID', 'Name', 'Select'];
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // list of patients to send to doctor
  // eslint-disable-next-line no-unused-vars
  const [incomingPatientsList, setIncomingPatientsList] = useState([]);
  // to have checkbox checked state persist on page refresh
  const [isIncomingPatient, setIsIncomingPatient] = useState(
    JSON.parse(localStorage.getItem('IncomingPatient')) ?? false
  );
  // get patients list from admin
  const patientsList = JSON.parse(localStorage.getItem('patients')) ?? [];
  const [arr, setArr] = useState([]);
  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      console.log(event.target.value);

      if (arr.length > 0) {
        setArr([...arr, JSON.parse(event.target.value)]);
        // arr.push(...arr, JSON.parse(event.target.value));
      }
      if (arr.length === 0) {
        // arr.push(JSON.parse(event.target.value));
        // setArr([JSON.parse(event.target.value)]);
        // setArr(arr.push(JSON.parse(event.target.value)));
        setArr(arr.push(JSON.parse(event.target.value)));
      }
      console.log(arr);
      setIsIncomingPatient(true);
      // if (incomingPatientsList.length > 0) {
      //   setIncomingPatientsList(incomingPatientsList.push(JSON.parse(event.target.value)));
      //   console.log(incomingPatientsList);
      // } else if (incomingPatientsList.length === 0) {
      //   setIncomingPatientsList([JSON.parse(event.target.value)]);
      //   console.log(incomingPatientsList);
      // }
    }
    if (!event.target.checked) {
      console.log('uncjecked');
      // setIsIncomingPatient(false);
      // setIncomingPatientsList(
      //   incomingPatientsList.filter((patient) => patient !== event.target.value)
      // );
    }
  };

  const filterData = (query, patientsList) => {
    if (!query) {
      return patientsList;
    } else {
      return patientsList.filter((patient) => patient.name.toLowerCase().includes(query));
    }
  };

  const dataFiltered = filterData(searchQuery, patientsList);

  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  useEffect(() => {
    localStorage.setItem('incomingPatientsList', JSON.stringify(incomingPatientsList));
  }, [incomingPatientsList]);
  useEffect(() => {
    localStorage.setItem('isIncomingPatient', JSON.stringify(isIncomingPatient));
  }, [isIncomingPatient]);

  return (
    <div>
      <Nav />
      <Box>
        <div className="flex flex-row w-screen space-x-5 p-10">
          <div>
            <h2 className="text-lg mb-3">Receptionist Name</h2>
            <p>Date: {date}</p>
            <p>time: {time}</p>
          </div>
          <div className="flex-grow">
            <PatientSearchBar setIsSearching={setIsSearching} setSearchQuery={setSearchQuery} />
          </div>
        </div>
        <div style={{ padding: 3 }}>
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
                    {dataFiltered.map((d, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {d.id}
                        </TableCell>
                        <TableCell align="center">{d.name}</TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <Checkbox
                            size="small"
                            // checked={isIncomingPatient}
                            onChange={handleCheckboxChange}
                            value={JSON.stringify(d)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          ) : null}
        </div>
      </Box>
    </div>
  );
}

export default ReceptionistHome;

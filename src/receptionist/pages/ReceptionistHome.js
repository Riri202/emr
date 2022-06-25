/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import Nav from '../../common-components/Nav';
import DropdownButton from '../../common-components/DropdownButton';
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
import { filterData, handleCheckboxChange } from '../../utils';
import { Chip } from '@mui/material';

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

  // get patients list from admin
  const patientsList = JSON.parse(localStorage.getItem('patients')) ?? [];
  // to display patients in chips when selected from the table
  const [choice, setChoice] = useState([]);

  // const filterData = (query, patientsList) => {
  //   if (!query) {
  //     return patientsList;
  //   } else {
  //     return patientsList.filter((patient) => patient.name.toLowerCase().includes(query));
  //   }
  // };

  const dataFiltered = filterData(searchQuery, patientsList);

  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  // useEffect(() => {
  //   localStorage.setItem('incomingPatientsList', JSON.stringify(incomingPatientsList));
  // }, [incomingPatientsList]);
  // useEffect(() => {
  //   localStorage.setItem('isIncomingPatient', JSON.stringify(isIncomingPatient));
  // }, [isIncomingPatient]);

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
        {choice.length ? (
          <Paper style={{ marginBottom: '8px' }}>
            <div className="flex flex-row space-x-4  p-5">
              <span className="text-lg text-red-500">Selected patients</span>
              <DropdownButton
                btnText="send to"
                menuItems={['dr. Stark', 'Dr Drake Remurray']}
                handleCheckboxChange={() => console.log('send to doctor')}
              />
            </div>
            <div className="flex flex-row space-x-2 p-5 flex-wrap">
              {choice.map((c, index) => {
                return (
                  <Chip
                    key={index}
                    label={c}
                    onDelete={() => console.log('deleted chip')}
                    variant="outlined"
                  />
                );
              })}
            </div>
          </Paper>
        ) : null}

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
                            onChange={() => handleCheckboxChange(event, setChoice, choice)}
                            value={d.name}
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

/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../common-components/Nav';
// import DropdownButton from '../../common-components/DropdownButton';
import PatientSearchBar from '../../common-components/PatientSearchBar';
import Box from '@mui/material/Box';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import { handleCheckboxChange } from '../../utils';
// import { Chip } from '@mui/material';
import authHeader from '../../redux/features/auth/authHeader';
import { getAllStaff } from '../../utils/api';
// import IntuitiveButton from '../../common-components/IntuitiveButton';
import { filterData } from '../../utils';
import CollapsibleList from '../components/CollapsibleList';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650
//   }
// });
// const headers = ['Index', 'ID', 'Name', 'Select Doctor', 'Send'];
function ReceptionistHome() {
  // const classes = useStyles();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // get patients list from admin
  const [patientsList, setPatientsList] = useState([]);
  // get doctors list from admin
  const [doctorsList, setDoctorsList] = useState([]);
  // const [staffName, setStaffName] = useState('');

  // to display patients in chips when selected from the table
  // const [choice, setChoice] = useState([
  //   {
  //     value: '',
  //     id: ''
  //   }
  // ]);

  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  // const filterData = (query, patientsList) => {
  //   if (!query) {
  //     return patientsList;
  //   } else {
  //     return patientsList.filter((patient) => patient.name.toLowerCase().includes(query));
  //   }
  // };
  const getAvailableDoctors = (allStaff) => {
    const allDoctors = allStaff.filter(
      // TODO this filter should have a condition to also return doctors with available property set to true
      (staff) => staff.role === 'DOCTOR' || staff.role === 'doctor'
    );
    setDoctorsList([...allDoctors]);
  };
  const doctorNames = doctorsList.map((doctor) => doctor.name);

  // const handleDoctorChoice = (event) => {
  //   if (event.target.checked) {
  //     setStaffName(event.target.value);
  //   }
  // };

  // const getSelectedDoctorInfo = (name, doctorsList) => {
  //   return doctorsList.find((doctor) => doctor.name === name);
  // };
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
  // const getAllDoctors = async () => {
  //   // setIsLoading(true);
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       url: 'https://emr-server.herokuapp.com/staff',
  //       params: {
  //         page: 0,
  //         size: 20
  //       },
  //       headers: authHeader()
  //     }).then((response) => {
  //       console.log(response);
  //       if (response.data.rows.length) {
  //         getAvailableDoctors(response.data.rows);
  //       }
  //       // setIsLoading(false);
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getAllDoctors = async () => {
    const data = await getAllStaff();
    if (data) {
      getAvailableDoctors(data);
    }
  };

  // const handleSendToDoctor = async (patientId) => {
  //   const doctor = getSelectedDoctorInfo(staffName, doctorsList);
  //   const toStaffId = doctor.uuid;
  //   const data = await sendQueue(patientId, toStaffId);
  //   console.log(data);
  // };

  useEffect(() => {
    getAllPatients();
    getAllDoctors();
  }, []);

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
            <PatientSearchBar
              setIsSearching={setIsSearching}
              setSearchQuery={setSearchQuery}
              label="Find a patient"
            />
          </div>
        </div>
        {/* {choice.length ? (
          <Paper style={{ marginBottom: '8px' }}>
            <form onSubmit={() => handleSendToDoctor(choice.id)}>
              <div className="flex flex-row space-x-4  p-5">
                <span className="text-lg text-red-500">Selected patients</span>
                <DropdownButton
                  btnText="Select a doctor"
                  menuItems={doctorNames}
                  handleCheckboxChange={handleDoctorChoice}
                />
              </div>
              <div className="flex flex-row space-x-2 p-5 flex-wrap">
                {choice.map((c, index) => {
                  return (
                    <Chip
                      key={index}
                      label={c.value}
                      onDelete={() => console.log('deleted chip')}
                      variant="outlined"
                    />
                  );
                })}
              </div>
              <div className="flex justify-center mt-2 mb-2">
                <div className="w-1/2">
                  <IntuitiveButton text="send to doctor" />
                </div>
              </div>
            </form>
          </Paper>
        ) : null} */}

        <div className="p-20">
          <p>Incoming Patients</p>
          <Paper style={{ padding: 15, borderRadius: 16 }}>
            {!patientsList.length ? (
              <p className="text-lg mb-3 text-red-500">Patient is not on the list.</p>
            ) : (
              <div>
                {patientsList && isSearching ? (
                  <CollapsibleList
                    patientsList={patientsList}
                    doctorNames={doctorNames}
                    doctorsList={doctorsList}
                  />
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

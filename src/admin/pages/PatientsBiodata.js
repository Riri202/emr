import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteDialog from '../components/DeleteDialog';
import authHeader from '../../redux/features/auth/authHeader';
import axios from 'axios';
import EditPatientForm from '../components/EditPatientForm';
import InputDetailsForm from '../components/InputDetailsForm';
import { addNewPatients } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['Index', 'ID', 'Name', 'Email', 'Phone No', 'DOB', 'Edit', 'Delete'];
const user = JSON.parse(localStorage.getItem('user'));

function PatientsBiodata() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dob: ''
  });
  const { name, email, phoneNumber, dob } = inputData;

  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleCsvChange = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        //push Parsed Data Response to rows array
        // rows.push(...results.data);
        // console.log(rows);
        if (rows.length === 0) {
          rows.push(...results.data);
          console.log(rows);
        } else if (rows.length > 0) {
          rows.push(...results.data);
          console.log(rows);
        }
      }
    });
  };
  const addPatient = async (e) => {
    e.preventDefault();
    setIsAddingPatient(true);
    const patientFormData = { name, email, phoneNumber, dob };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await addNewPatients(patientFormData);
      setIsAddingPatient(false);
      if (rows.length > 0) {
        setRows([...rows, data]);
      }
      if (rows.length === 0) {
        setRows([data]);
      }
    } catch (error) {
      console.log(error);
      setIsAddingPatient(false);
    }
  };
  // const addPatient = async (e) => {
  //   e.preventDefault();
  //   setIsAddingPatient(true);
  //   const patientFormData = { name, email, phoneNumber, dob };

  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: 'https://emr-server.herokuapp.com/patient',
  //       data: patientFormData,
  //       headers: authHeader()
  //     }).then((response) => {
  //       console.log(response.data.patient);
  //       if (rows.length > 0) {
  //         setRows([...rows, response.data.patient]);
  //       }
  //       if (rows.length === 0) {
  //         setRows([response.patient]);
  //       }
  //     });
  //     // return {response.data.patient}
  //     console.log(response);
  //     // setIsAddingPatient(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
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
          setRows(response.data.rows);
        }
        // setIsLoading(false);
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPatients();
  }, []);
  const formInputDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Name'
    },
    {
      name: 'email',
      id: 'email',
      label: 'Email'
    },
    {
      name: 'phoneNumber',
      id: 'phoneNumber',
      label: 'Phone No.'
    }
  ];
  return (
    <div>
      <h2 className="text-lg mb-3">Patients Biodata</h2>
      <InputDetailsForm
        onSubmit={addPatient}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingPatient}
        formDetails={formInputDetails}
        btnText="Add new patient"
        isDateRequired={true}
      />
      {/* <Box
        component={Paper}
        sx={{ mb: 4, padding: 2, display: 'flex', flexDirection: 'column', spacing: 2 }}>
        <form onSubmit={addPatient}>
          <div className="flex flex-row justify-center space-x-4">
            <TextField
              name="name"
              id="name"
              label="Name"
              type="text"
              onChange={handleChange}
              variant="standard"
              sx={{ mr: 3 }}></TextField>
            <TextField
              name="email"
              id="email"
              label="Email"
              type="email"
              onChange={handleChange}
              variant="standard"
              sx={{ mr: 3 }}></TextField>
            <TextField
              name="phoneNumber"
              id="phoneNumber"
              label="Phone No."
              type="number"
              onChange={handleChange}
              variant="standard"
              sx={{ mr: 3 }}></TextField>
            <input name="dob" type="date" id="dob" onChange={handleChange} className="p-3" />
          </div>
          <div className="flex justify-center mt-2 mb-2"> */}
      {/* <div className="w-1/2">
              <IntuitiveButton text="Add new patient" isLoading={isAddingPatient} />
            </div> */}
      {/* <Button type="submit" variant="outlined" className="w-1/2 p-3 bg-green-500 text-[#000]">
              Add new patient
            </Button>
          </div>
        </form>
        <Divider className="mt-2 mb-2" orientation="horizontal" variant="fullWidth" />
        <form className="flex flex-row mt-2 justify-center">
          <div className="p-3 bg-green-500 rounded-md">
            <label htmlFor="csvFile" className="cursor-pointer">
              Import a csv files <FaFileCsv className="text-[30px] mb-[-5px]" />
              <input
                type={'file'}
                id="csvFile"
                accept={'.csv'}
                onChange={handleCsvChange}
                className="hidden"
              />
            </label>
          </div>
        </form>
      </Box> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, key) => {
                return (
                  <TableCell key={key} align="right" className="bg-green-500">
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {rows.length === 0 ? (
            <h1 className="text-lg mb-3 text-red-500">
              Patients list is empty. Add new Patients above
            </h1>
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/patients-biodata/${row.id}/${row.name}`}>
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">{row.dob}</TableCell>
                  <TableCell align="center">
                    <EditPatientForm selectedPatient={row} setRows={setRows} rows={rows} />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteDialog id={row.uuid} setRows={setRows} rows={rows} role="patient" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export default PatientsBiodata;

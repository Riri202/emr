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
import useForm from '../../utils/formValidations/useForm';

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
  // const [inputData, setInputData] = useState({
  //   name: '',
  //   email: '',
  //   phoneNumber: '',
  //   dob: ''
  // });
  // const { name, email, phoneNumber, dob } = inputData;

  // const handleChange = (e) => {
  //   setInputData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value
  //   }));
  // };

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

  const { handleChange, values, errors, handleSubmit } = useForm(addPatient);

  const { name, email, phoneNumber, dob } = values;

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
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingPatient}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add new patient"
        isDateRequired={true}
      />
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
          {rows.length === 0 ? (
            <p className="text-lg mb-3 pl-3 text-red-500">
              Patients list is empty. Add new Patients above
            </p>
          ) : (
            <TableBody>
              {rows.map((row, index) => {
                const dob = new Date(row.dob).toDateString();
                return (
                  <TableRow key={row.name}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/patients-biodata/${row.id}/${row.name}`}>
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phoneNumber}</TableCell>
                    <TableCell align="center">{dob}</TableCell>
                    <TableCell align="center">
                      <EditPatientForm selectedPatient={row} setRows={setRows} rows={rows} />
                    </TableCell>
                    <TableCell align="center">
                      <DeleteDialog id={row.uuid} setRows={setRows} rows={rows} role="patient" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export default PatientsBiodata;

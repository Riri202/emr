/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DeleteDialog from '../components/DeleteDialog';
import { Divider } from '@material-ui/core';
import InputDetailsForm from '../components/InputDetailsForm';
import useForm from '../../utils/formValidations/useForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function Diagnosis() {
  const classes = useStyles();
  const headers = ['No', 'Diagnosis', 'Edit', 'Delete'];
  const [isAddingDiagnosis, setIsAddingDiagnosis] = useState(false);
  const [rows, setRows] = useState(JSON.parse(localStorage.getItem('diagnosisRows')) ?? []);
  // const [inputData, setInputData] = useState({
  //   id: '',
  //   diagnosis: ''
  // });
  // const { id, diagnosis } = inputData;
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

  const addDiagnosis = (e) => {
    e.preventDefault();
    const inputData = { id, diagnosis };
    setIsAddingDiagnosis(true);
    if (rows.length > 0) {
      setRows([...rows, inputData]);
    }
    if (rows.length === 0) {
      setRows([inputData]);
    }
    setIsAddingDiagnosis(false);
  };

  // persist data in local storage
  useEffect(() => {
    localStorage.setItem('diagnosisRows', JSON.stringify(rows));
  }, [rows]);

  const { handleChange, values, errors, handleSubmit } = useForm(addDiagnosis);

  const { id, diagnosis } = values;
  const formInputDetails = [
    {
      // Name might change depending on what is in the backend
      name: 'diagnosis',
      id: 'diagnosis',
      label: 'Diagnosis'
    },
    {
      name: 'id',
      id: 'id',
      label: 'ID'
    }
  ];
  return (
    <div>
      <h2 className="text-lg mb-3">Diagnosis</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingDiagnosis}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add diagnosis"
      />
      <TableContainer component={Paper}>
        <h2 className="text-lg mb-3 pl-3">Diagnoses List</h2>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                return (
                  <TableCell key={index} align="center" className="bg-green-500">
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {rows.length === 0 ? (
            <p className="text-lg mb-3 pl-3 text-red-500">
              Diagnoses list is empty. Add new diagnosis above
            </p>
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.diagnosis}</TableCell>
                  <TableCell align="center">
                    <IconButton className="outline-none">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <DeleteDialog id={row.id} setRows={setRows} rows={rows} />
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

export default Diagnosis;

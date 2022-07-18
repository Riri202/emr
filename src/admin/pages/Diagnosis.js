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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function Diagnosis() {
  const classes = useStyles();
  const headers = ['No', 'Diagnosis', 'Edit', 'Delete'];
  const [rows, setRows] = useState(JSON.parse(localStorage.getItem('diagnosisRows')) ?? []);
  const [inputData, setInputData] = useState({
    id: '',
    diagnosis: ''
  });
  const { id, diagnosis } = inputData;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rows.length > 0) {
      setRows([...rows, inputData]);
    }
    if (rows.length === 0) {
      setRows([inputData]);
    }
  };

  // persist data in local storage
  useEffect(() => {
    localStorage.setItem('diagnosisRows', JSON.stringify(rows));
  }, [rows]);

  return (
    <div>
      <h2 className="text-lg mb-3">Diagnosis</h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="diagnosis"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            name="id"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" className="p-3 mt-1 bg-green-500 text-[#000] mr-3">
            Add new diagnosis
          </Button>
        </form>
        <Divider orientation="vertical" variant="middle" flexItem />
        <form>
          <input type={'file'} accept={'.csv'} onChange={handleCsvChange} />
        </form>
      </Box>
      <TableContainer component={Paper}>
        <h2 className="text-lg mb-3">Diagnoses List</h2>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                return (
                  <TableCell key={index} align="right" className="bg-green-500">
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {rows.length === 0 ? (
            <h1 className="text-lg mb-3 text-red-500">
              Diagnoses list is empty. Add new diagnosis above
            </h1>
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{row.diagnosis}</TableCell>
                  <TableCell align="right">
                    <IconButton className="outline-none">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
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

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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import FormDialog from '../components/Dialog';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['Index', 'ID', 'Name', 'Edit', 'Delete'];

function PatientsBiodata() {
  const classes = useStyles();
  const [rows, setRows] = useState(JSON.parse(localStorage.getItem('patients')) ?? []);
  const [inputData, setInputData] = useState({
    id: '',
    name: ''
  });
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  // const handleNameChange = (e) => {
  //   setInputData({
  //     ...inputData,
  //     name: e.target.value
  //   });
  // };
  // const handleIdChange = (e) => {
  //   setInputData({
  //     ...inputData,
  //     username: e.target.value
  //   });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rows.length > 0) {
      setRows([...rows, inputData]);
    }
    if (rows.length === 0) {
      setRows([inputData]);
    }
  };
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(rows));
  }, [rows]);
  return (
    <div>
      <h2 className="text-lg mb-3">Patients Biodata</h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            onChange={handleChange}
            // value={inputData.name}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            name="id"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" variant="contained" color="primary">
            Add new patient
          </Button>
        </form>
        <Divider orientation="vertical" variant="middle" flexItem />
        <form>
          <input type={'file'} accept={'.csv'} onChange={handleCsvChange} />
        </form>
      </Box>
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
                  <TableCell align="right">
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/patients-biodata/${row.id}/${row.name}`}>
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton className="outline-none">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <FormDialog id={row.id} setRows={setRows} rows={rows} />
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

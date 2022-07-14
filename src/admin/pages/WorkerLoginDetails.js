import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Papa from 'papaparse';
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
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@material-ui/core';
import authHeader from '../../redux/features/auth/authHeader';
import EditWorkerForm from '../components/EditWorkerForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = [
  'Name',
  'Username',
  'Password',
  'Role',
  'Shift start',
  'Shift end',
  'Edit',
  'Delete'
];

function WorkerLoginDetails() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  // const [rows, setRows] = useState([
  //   {
  //     id: 1,
  //     fullName: 'Snow',
  //     username: 'Jon',
  //     password: 35,
  //     role: 'nurse',
  //     shiftStart: '10am',
  //     shiftEnd: '8pm'
  //   },
  //   {
  //     id: 2,
  //     fullName: 'Lannister',
  //     username: 'Cersei',
  //     password: 42,
  //     role: 'nurse',
  //     shiftStart: '10am',
  //     shiftEnd: '8pm'
  //   },
  //   {
  //     id: 3,
  //     fullName: 'Lannister',
  //     username: 'Jaime',
  //     password: 45,
  //     role: 'nurse',
  //     shiftStart: '10am',
  //     shiftEnd: '8pm'
  //   },
  //   {
  //     id: 4,
  //     fullName: 'Stark',
  //     username: 'Arya',
  //     password: 16,
  //     role: 'doctor',
  //     shiftStart: '10am',
  //     shiftEnd: '8pm'
  //   }
  // ]);
  const [inputData, setInputData] = useState({
    fullName: '',
    username: '',
    password: '',
    role: ''
  });
  const { fullName, username, password, role } = inputData;
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleRowDelete = (id) => {
    const filteredRows = rows.filter((row) => row.uuid !== id);
    setRows(filteredRows);
  };
  const handleCsvChange = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // console.log(results.data);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const staffFormData = { fullName, username, password, role };

    try {
      const response = await axios({
        method: 'post',
        url: 'https://emr-server.herokuapp.com/staff',
        data: staffFormData,
        headers: authHeader()
      }).then((response) => {
        console.log(response);
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    if (rows.length > 0) {
      setRows([...rows, inputData]);
    }
    if (rows.length === 0) {
      setRows([inputData]);
    }
  };

  const getAllStaff = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://emr-server.herokuapp.com/staff',
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
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.setItem('allWorkers', JSON.stringify(rows));
  }, [rows]);

  useEffect(() => {
    getAllStaff();
  }, []);
  return (
    <>
      <h2 className="text-lg mb-3">Worker Login Details</h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="fullname"
            name="fullName"
            onChange={handleChange}
            // value={inputData.name}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="username"
            name="username"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="password"
            name="password"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="role"
            name="role"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" variant="contained" color="primary">
            Add new worker
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
          {!rows.length ? (
            <p className="text-lg mb-3 text-red-500">
              Staff list is empty. Enter staff details above to add to list
            </p>
          ) : (
            <TableBody>
              {rows.map((row, key) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell align="right">{row.username}</TableCell>
                  <TableCell align="right">{row.password}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="right">
                    <input type="time" />
                  </TableCell>
                  <TableCell align="right">
                    <input type="time" />
                  </TableCell>
                  <TableCell align="right">
                    <EditWorkerForm selectedWorker={row} setRows={setRows} rows={rows} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleRowDelete(row.uuid)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
export default WorkerLoginDetails;

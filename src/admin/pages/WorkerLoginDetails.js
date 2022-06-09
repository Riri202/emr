import React, { useState } from 'react';
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
import { Edit, Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

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
  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'Snow',
      username: 'Jon',
      password: 35,
      role: 'nurse',
      shiftStart: '10am',
      shiftEnd: '8pm'
    },
    {
      id: 2,
      name: 'Lannister',
      username: 'Cersei',
      password: 42,
      role: 'nurse',
      shiftStart: '10am',
      shiftEnd: '8pm'
    },
    {
      id: 3,
      name: 'Lannister',
      username: 'Jaime',
      password: 45,
      role: 'nurse',
      shiftStart: '10am',
      shiftEnd: '8pm'
    },
    {
      id: 4,
      name: 'Stark',
      username: 'Arya',
      password: 16,
      role: 'nurse',
      shiftStart: '10am',
      shiftEnd: '8pm'
    }
  ]);
  const [inputData, setInputData] = useState({
    id: 0,
    name: '',
    username: '',
    password: ''
  });
  const handleNameChange = (e) => {
    setInputData({
      ...inputData,
      name: e.target.value
    });
  };
  const handleUsernameChange = (e) => {
    setInputData({
      ...inputData,
      username: e.target.value
    });
  };
  const handlePasswordChange = (e) => {
    setInputData({
      ...inputData,
      password: e.target.value
    });
  };
  const handleRowDelete = (id) => {
    const filteredRows = rows.filter((row) => row.id !== id);
    setRows(filteredRows);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setRows([...rows, inputData]);
    //TODO: fix row only being updated on second click
    console.log(rows);
  };

  return (
    <>
      <h2 className="text-lg mb-3">Worker Login Details</h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="name"
            onChange={handleNameChange}
            // value={inputData.name}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="username"
            onChange={handleUsernameChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="password"
            onChange={handlePasswordChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" variant="contained" color="primary">
            Add new worker
          </Button>
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
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
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
                  <IconButton className="outline-none">
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleRowDelete(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default WorkerLoginDetails;

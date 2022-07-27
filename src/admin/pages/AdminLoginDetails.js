import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { Edit, Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputDetailsForm from '../components/InputDetailsForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['name', 'username', 'password', 'access', 'edit', 'delete'];

function AdminLoginDetails() {
  const classes = useStyles();
  const [rows, setRows] = useState([
    { id: 1, fullName: 'Snow', username: 'Jon', password: 35 },
    { id: 2, fullName: 'Lannister', username: 'Cersei', password: 42 },
    { id: 3, fullName: 'Lannister', username: 'Jaime', password: 45 },
    { id: 4, fullName: 'Stark', username: 'Arya', password: 16 },
    { id: 5, fullName: 'Targaryen', username: 'Daenerys', password: null },
    { id: 6, fullName: 'Melisandre', username: 'null', password: 150 },
    { id: 7, fullName: 'Clifford', username: 'Ferrara', password: 44 },
    { id: 8, fullName: 'Frances', username: 'Rossini', password: 36 },
    { id: 9, fullName: 'Roxie', username: 'Harvey', password: 65 }
  ]);
  const [inputData, setInputData] = useState({
    fullName: '',
    username: '',
    password: ''
  });
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleRowDelete = (id) => {
    const filteredRows = rows.filter((row) => row.id !== id);
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
    const staffFormData = new FormData();
    staffFormData.append('fullName', inputData.fullName);
    staffFormData.append('username', inputData.username);
    staffFormData.append('password', inputData.password);

    try {
      const response = await axios({
        method: 'post',
        url: 'https://emr-server.herokuapp.com/staff',
        data: staffFormData
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
  const formInputDetails = [
    {
      name: 'fullName',
      id: 'fullname',
      label: 'Name'
    },
    {
      name: 'username',
      id: 'username',
      label: 'Username'
    },
    {
      name: 'password',
      id: 'password',
      label: 'Password'
    }
  ];
  return (
    <>
      <h2 className="text-lg mb-3">Admin Login Details</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        // isLoading={isAddingStaff}
        formDetails={formInputDetails}
        btnText="Add new admin"
      />
      {/* <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="name"
            name="fullName"
            onChange={handleChange}
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
          <Button type="submit" variant="contained">
            Add new admin
          </Button>
        </form>
        <Divider orientation="vertical" variant="middle" flexItem />
        <form>
          <input type={'file'} accept={'.csv'} onChange={handleCsvChange} />
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
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right">
                  <Switch defaultChecked />
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
export default AdminLoginDetails;

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
// import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import authHeader from '../../redux/features/auth/authHeader';
import EditWorkerForm from '../components/EditWorkerForm';
import DeleteDialog from '../components/DeleteDialog';
import { FaFileCsv } from 'react-icons/fa';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import { addNewStaff } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['Name', 'Username', 'Role', 'Shift start', 'Shift end', 'Edit', 'Delete'];
const user = JSON.parse(localStorage.getItem('user'));

function WorkerLoginDetails() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isAddingStaff, setIsAddingStaff] = useState(false);

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
  const addStaff = async (e) => {
    e.preventDefault();
    setIsAddingStaff(true);
    const staffFormData = { fullName, username, password, role };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const data = await addNewStaff(staffFormData);
      setIsAddingStaff(false);
      if (rows.length > 0) {
        setRows([...rows, data]);
      }
      if (rows.length === 0) {
        setRows([data]);
      }
    } catch (error) {
      console.log(error);
    }

    // try {
    //   return await axios({
    //     method: 'post',
    //     url: 'https://emr-server.herokuapp.com/staff',
    //     data: staffFormData,
    //     headers: authHeader()
    //   }).then((response) => {
    //     console.log(response);
    //     setIsAddingStaff(false);
    //     if (rows.length > 0) {
    //       setRows([...rows, response.data]);
    //     }
    //     if (rows.length === 0) {
    //       setRows([response.data]);
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getAllStaff = async () => {
    // setIsLoading(true);
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
        // setIsLoading(false);
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
      <Box
        component={Paper}
        sx={{ mb: 4, padding: 2, display: 'flex', flexDirection: 'column', spacing: 2 }}>
        <form onSubmit={addStaff}>
          <div className="flex flex-row justify-center space-x-4">
            <TextField
              label="fullname"
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
            <TextField
              label="role"
              name="role"
              onChange={handleChange}
              variant="standard"
              sx={{ mr: 3 }}></TextField>
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <div className="w-1/2">
              <IntuitiveButton text="Add new worker" isLoading={isAddingStaff} />
            </div>
            {/* <Button
              type="submit"
              variant="outlined"
              color="success"
              className="w-1/2 p-3 bg-green-500 text-[#000]">
              Add new worker
            </Button> */}
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
          {/* {isLoading && (
            <Box sx={{ position: 'relative' }}>
              <CircularProgress
                color="success"
                size={35}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  zIndex: 1,
                  marginTop: '-12px',
                  marginLeft: '-12px'
                }}
              />
            </Box>
          )} */}
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
                    <DeleteDialog id={row.uuid} setRows={setRows} rows={rows} role="staff" />
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

import React, { useState, useEffect } from 'react';
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
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@material-ui/core';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import { FaFileCsv } from 'react-icons/fa';
import setAuthToken from '../../utils/setAuthToken';
import { addNewInventory } from '../../utils/api';
import EditInventoryForm from '../components/EditInventoryForm';
import DeleteDialog from '../components/DeleteDialog';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['No', 'Name', 'Quantity', 'Unit Price (#)', 'Edit', 'Delete'];
const user = JSON.parse(localStorage.getItem('user'));

function Inventory() {
  const classes = useStyles();
  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'Panadol',
      quantity: 3,
      price: 35,
      type: 'DRUG'
    },
    {
      id: 2,
      name: 'Ampiclox',
      quantity: 3,
      price: 13,
      type: 'DRUG'
    },
    {
      id: 3,
      name: 'Sphygomanometer',
      quantity: 6,
      price: 45,
      type: 'TEST'
    }
  ]);
  const [inputData, setInputData] = useState({
    drug: '',
    quantity: '',
    price: '',
    type: ''
  });
  const { drug, quantity, price, type } = inputData;
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
  const addInventory = async (e) => {
    e.preventDefault();
    setIsAddingInventory(true);
    const inventoryFormData = { drug, quantity, price, type };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const data = await addNewInventory(inventoryFormData);
      setIsAddingInventory(false);
      if (rows.length > 0) {
        setRows([...rows, data]);
      }
      if (rows.length === 0) {
        setRows([data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.setItem('drugsList', JSON.stringify(rows));
  }, [rows]);
  return (
    <div>
      <h2 className="text-lg mb-3">Inventory</h2>
      <Box
        component={Paper}
        sx={{ mb: 4, padding: 2, display: 'flex', flexDirection: 'column', spacing: 2 }}>
        <form onSubmit={addInventory}>
          <div className="flex flex-row justify-center space-x-4">
            <TextField
              label="name"
              name="name"
              onChange={handleChange}
              variant="standard"
              sx={{ mr: 3 }}></TextField>
            <TextField
              label="quantity"
              name="quantity"
              onChange={handleChange}
              variant="standard"
              sx={{ mr: 3 }}></TextField>
            <TextField
              label="unit price"
              name="unit price"
              onChange={handleChange}
              variant="standard"
              sx={{ mr: 3 }}></TextField>
            <TextField
              label="type"
              name="type"
              onChange={handleChange}
              variant="standard"
              sx={{ mr: 3 }}></TextField>
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <div className="w-1/2">
              <IntuitiveButton text="Add to inventory" isLoading={isAddingInventory} />
            </div>
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
        <h2 className="text-lg mb-3">Drugs</h2>
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
          <TableBody>
            {rows
              .filter((row) => row.type === 'DRUG')
              .map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <EditInventoryForm selectedItem={row} setRows={setRows} rows={rows} />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteDialog id={row.id} setRows={setRows} rows={rows} role="staff" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} style={{ marginTop: 5 }}>
        <h2 className="text-lg mb-3">Test Equipment</h2>
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
          <TableBody>
            {rows
              .filter((row) => row.type === 'TEST')
              .map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <EditInventoryForm selectedItem={row} setRows={setRows} rows={rows} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Inventory;

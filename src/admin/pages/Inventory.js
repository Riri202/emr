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
import Button from '@mui/material/Button';
import { Edit, Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['No', 'Name', 'Quantity', 'No in pack', 'Unit Price (#)', 'Edit', 'Delete'];

function Inventory() {
  const classes = useStyles();
  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'Panadol',
      quantity: 3,
      noInPack: 5,
      unitPrice: 35
    },
    {
      id: 2,
      name: 'Ampiclox',
      quantity: 3,
      noInPack: 5,
      unitPrice: 13
    },
    {
      id: 3,
      name: 'Penicillin',
      quantity: 6,
      noInPack: 5,
      unitPrice: 45
    }
  ]);
  const [inputData, setInputData] = useState({
    id: rows.map((row) => row.id++),
    drug: '',
    quantity: 0,
    unitPrice: 0
  });
  const handleInventoryChange = (e) => {
    setInputData({
      ...inputData,
      name: e.target.value
    });
  };
  const handleQuantityChange = (e) => {
    setInputData({
      ...inputData,
      username: e.target.value
    });
  };
  const handleUnitPriceChange = (e) => {
    setInputData({
      ...inputData,
      password: e.target.value
    });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setRows([...rows, inputData]);
    //TODO: fix row only being updated on second click
    console.log(rows);
  };
  useEffect(() => {
    localStorage.setItem('drugsList', JSON.stringify(rows));
  }, [rows]);
  return (
    <div>
      <h2 className="text-lg mb-3">Inventory</h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="name"
            onChange={handleInventoryChange}
            // value={inputData.name}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="quantity"
            onChange={handleQuantityChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="unit price"
            onChange={handleUnitPriceChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" className="p-3 mt-1 bg-green-500 text-[#000] mr-3">
            Add new drug
          </Button>
          <Button type="submit" className="p-3 mt-1 bg-green-500 text-[#000]">
            Add new equipment
          </Button>
        </form>
        <Divider orientation="vertical" variant="middle" flexItem />
        <form>
          <input type={'file'} accept={'.csv'} onChange={handleCsvChange} />
        </form>
      </Box>
      <TableContainer component={Paper}>
        <h2 className="text-lg mb-3">Drugs</h2>
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
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.noInPack}</TableCell>
                <TableCell align="right">{row.unitPrice}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleRowDelete(row.id)} className="outline-none">
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <h2 className="text-lg mb-3">Test Equipment</h2>
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
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.unitPrice}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleRowDelete(row.id)} className="outline-none">
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
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

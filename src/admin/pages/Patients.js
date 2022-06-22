import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const headers = ['Index', 'Title', 'Biodata', 'Edit', 'Delete'];

function PatientDetails() {
  let { id, name } = useParams();
  const classes = useStyles();
  const [rows, setRows] = useState([
    {
      id: 0,
      title: 'Blood Pressure',
      biodata: '80/120'
    },
    {
      id: 1,
      title: 'Heart Rate',
      biodata: '70'
    },
    {
      id: 2,
      title: 'Temperature',
      biodata: '80'
    }
  ]);
  const [inputData, setInputData] = useState({
    id: 0,
    title: '',
    biodata: ''
  });
  const handleTitleChange = (e) => {
    setInputData({
      ...inputData,
      title: e.target.value
    });
  };
  const handleBiodataChange = (e) => {
    setInputData({
      ...inputData,
      biodata: e.target.value
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
  useEffect(() => {
    localStorage.setItem('patientsInfo/Biodata', JSON.stringify(rows));
  }, [rows]);
  return (
    <div className="p-6">
      <h2 className="text-lg mb-3">Patient Biodata Details</h2>
      <h2 className="text-lg mb-3">
        {id}: {name}
      </h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="title"
            onChange={handleTitleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="biodata"
            onChange={handleBiodataChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" className="p-3 mt-1 bg-green-500">
            Add new biodata
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
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.biodata}</TableCell>
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
    </div>
  );
}
export default PatientDetails;

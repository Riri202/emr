import React, { useState } from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['Index', 'ID', 'Name', 'Edit', 'Delete'];

function PatientsBiodata() {
  const classes = useStyles();
  const [rows, setRows] = useState([
    {
      id: 'HOD1',
      name: 'Snow'
    },
    {
      id: 'HOD2',
      name: 'Lannister'
    },
    {
      id: 'HOD3',
      name: 'Arya'
    }
  ]);
  const [inputData, setInputData] = useState({
    id: `HOD+`,
    name: ''
  });
  const handleNameChange = (e) => {
    setInputData({
      ...inputData,
      name: e.target.value
    });
  };
  const handleIdChange = (e) => {
    setInputData({
      ...inputData,
      username: e.target.value
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
    <div>
      <h2 className="text-lg mb-3">Patients Biodata</h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="name"
            onChange={handleNameChange}
            // value={inputData.name}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="id"
            onChange={handleIdChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" variant="contained" color="primary">
            Add new patient
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
                  {/* <IconButton onClick={() => handleRowDelete(row.id)}>
                    <Delete />
                  </IconButton> */}
                  <FormDialog
                    id={row.id}
                    setRows={setRows}
                    rows={rows}
                    delete={() => handleRowDelete(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PatientsBiodata;

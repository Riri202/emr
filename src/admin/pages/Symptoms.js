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
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import FormDialog from '../components/Dialog';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['No', 'Symptom', 'Edit', 'Delete'];

function Symptoms() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [inputData, setInputData] = useState({
    id: '',
    symptom: ''
  });
  const handleSymptomChange = (e) => {
    setInputData({
      ...inputData,
      symptom: e.target.value
    });
  };
  const handleIdChange = (e) => {
    setInputData({
      ...inputData,
      id: e.target.value
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
    console.log(rows);
  };

  return (
    <div>
      <h2 className="text-lg mb-3">Symptoms</h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="name"
            onChange={handleSymptomChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="id"
            onChange={handleIdChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" className="p-3 mt-1 bg-green-500 text-[#000] mr-3">
            Add new symptom
          </Button>
        </form>
      </Box>
      <TableContainer component={Paper}>
        <h2 className="text-lg mb-3">Symptoms List</h2>
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
              Symptoms list is empty. Add new symptoms above
            </h1>
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{row.symptom}</TableCell>
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

export default Symptoms;

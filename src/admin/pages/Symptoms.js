import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DeleteDialog from '../components/DeleteDialog';
import InputDetailsForm from '../components/InputDetailsForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['No', 'Symptom', 'Edit', 'Delete'];

function Symptoms() {
  const classes = useStyles();
  const [isAddingSymptom, setIsAddingSymptom] = useState(false);
  const [rows, setRows] = useState(JSON.parse(localStorage.getItem('symptomsRows')) ?? []);
  const [inputData, setInputData] = useState({
    id: '',
    symptom: ''
  });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAddingSymptom(true);
    if (rows.length > 0) {
      setRows([...rows, inputData]);
    }
    if (rows.length === 0) {
      setRows([inputData]);
    }
    console.log(rows);
    setIsAddingSymptom(false);
  };
  // persist data in local storage
  useEffect(() => {
    localStorage.setItem('symptomsRows', JSON.stringify(rows));
  }, [rows]);
  const formInputDetails = [
    {
      // Name might change depending on what is in the backend
      name: 'symptom',
      id: 'symptom',
      label: 'Symptom'
    },
    {
      name: 'id',
      id: 'id',
      label: 'ID'
    }
  ];
  return (
    <div>
      <h2 className="text-lg mb-3">Symptoms</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingSymptom}
        formDetails={formInputDetails}
        btnText="Add symptom"
      />
      {/* <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="symptom"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            name="id"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" className="p-3 mt-1 bg-green-500 text-[#000] mr-3">
            Add new symptom
          </Button>
        </form>
        <Divider orientation="vertical" variant="middle" flexItem />
        <form>
          <input type={'file'} accept={'.csv'} onChange={handleCsvChange} />
        </form>
      </Box> */}
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
                    <DeleteDialog id={row.id} setRows={setRows} rows={rows} />
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

/* eslint-disable no-unused-vars */
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
import { toast } from 'react-toastify';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DeleteDialog from '../components/DeleteDialog';
import InputDetailsForm from '../components/InputDetailsForm';
import useForm from '../../utils/formValidations/useForm';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';
import { addToDiagnosisList } from '../../utils/api';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function Diagnosis() {
  const classes = useStyles();
  const user = useCurrentUser();

  const headers = ['No', 'Diagnosis', 'Edit', 'Delete'];
  const [isAddingDiagnosis, setIsAddingDiagnosis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState([]);

  const handleCsvChange = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        //push Parsed Data Response to rows array
        // rows.push(...results.data);
        // console.log(rows);
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

  const addDiagnosis = async () => {
    setIsAddingDiagnosis(true);
    const requestData = { name };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await addToDiagnosisList(requestData);
      setIsAddingDiagnosis(false);
      toast.success('Item added successfully');
      if (rows.length) {
        setRows([...rows, data]);
      }
      if (!rows.length) {
        setRows([data]);
      }
    } catch (error) {
      setIsAddingDiagnosis(false);
      toast.error(error.message);
    }
  };

  const { handleChange, values, errors, handleSubmit } = useForm(addDiagnosis);

  const { name } = values;
  const formInputDetails = [
    {
      name: 'name',
      label: 'Diagnosis'
    }
  ];
  return (
    <div>
      <h2 className="text-lg mb-3">Diagnosis</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingDiagnosis}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add diagnosis"
      />
      <TableContainer component={Paper}>
        <h2 className="text-lg mb-3 pl-3">Diagnosis List</h2>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                return (
                  <TableCell key={index} align="center" className="bg-green-500">
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {!isLoading && !rows.length ? (
            <tbody>
              <tr>
                <td className="text-lg pl-3 mb-3 text-red-500">
                  Diagnosis list is empty. Add new diagnosis above
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    <IconButton className="outline-none">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
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

export default Diagnosis;

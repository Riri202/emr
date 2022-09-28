/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useCurrentUser } from '../../utils/hooks';
import { useParams } from 'react-router';
import setAuthToken from '../../utils/setAuthToken';
import { getApprovedPaymentsForPatient } from '../../utils/api';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
const drugHeaders = [
  'Index',
  'Name',
  'Quantity prescribed',
  'Dosage period',
  'Price',
  'Note',
  'Amount'
];
const testHeaders = ['Index', 'Title', 'Description', 'Amount'];
function PharmacistInvoice() {
  const user = useCurrentUser();
  const { patientId, sessionId } = useParams();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  // get drugs total amount

  const getPatientsApprovedInvoice = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getApprovedPaymentsForPatient(patientId, sessionId);
      setIsLoading(false);
      if (data) {
        setRows(data);
        console.log(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error('an error occured');
    }
  };
  useEffect(() => {
    getPatientsApprovedInvoice();
  }, []);
  return (
    <>
      <div className="p-8">
        <h1>Patient Invoice</h1>
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">Pharmacist</p>
          </div>
          <h2 className="text-xl">{user.user.fullName} </h2>
        </div>
        <section>
          <Paper className="flex flex-col items-center flex-1 px-3">
            <h3>Drugs</h3>
            {isLoading ? (
              <CircularProgress size={30} />
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      {drugHeaders.map((header, key) => {
                        return (
                          <TableCell key={key} align="center" className="bg-green-500">
                            {header}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  {!isLoading && rows && rows.prescriptions && !rows.prescriptions.length ? (
                    <tbody>
                      <tr>
                        <td className="text-lg pl-3 mb-3 text-red-500">
                          No drugs in this invoice.{' '}
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    rows &&
                    rows.drugs &&
                    rows.drugs.map((drug, index) => {
                      const { days, name, quantity, note, id } = drug;
                      return (
                        <TableBody key={id}>
                          <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">{quantity}</TableCell>
                            <TableCell align="center">{days} days</TableCell>
                            <TableCell align="center">
                              <span>&#8358;</span>
                            </TableCell>
                            <TableCell align="center">{note}</TableCell>
                            <TableCell align="center">
                              <span>&#8358;</span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })
                  )}
                </Table>
              </TableContainer>
            )}
            <p className="flex self-end text-lg font-bold">
              Total:&nbsp; <span>&#8358;</span>
            </p>
          </Paper>
        </section>

        <section className="mt-5">
          <Paper className="flex flex-col items-center flex-1 px-3">
            <h3>Tests</h3>
            {isLoading ? (
              <CircularProgress size={30} />
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      {testHeaders.map((header, key) => {
                        return (
                          <TableCell key={key} align="center" className="bg-green-500">
                            {header}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!isLoading && rows && rows.tests && !rows.tests.length ? (
                      <tr>
                        <td className="text-lg pl-3 mb-3 text-red-500">
                          No tests in this invoice.{' '}
                        </td>
                      </tr>
                    ) : (
                      rows &&
                      rows.tests &&
                      rows.tests.map((test, index) => {
                        const { title, description, price } = test;
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{title}</TableCell>
                            <TableCell align="center">{description}</TableCell>
                            <TableCell align="center">{price}</TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <p className="flex self-end text-lg font-bold">
              Total:&nbsp; <span>&#8358;</span>
            </p>
          </Paper>
        </section>
      </div>
    </>
  );
}

export default PharmacistInvoice;

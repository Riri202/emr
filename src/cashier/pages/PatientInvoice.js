/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Nav from '../../common-components/Nav';
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
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { getSessionPrescriptions, getSessionTests } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import ApprovePayment from '../components/ApprovePayment';

const user = JSON.parse(localStorage.getItem('user'));

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
function PatientInvoice() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState([]);
  const [tests, setTests] = useState([]);

  const classes = useStyles();
  const headers = [
    'Index',
    'Name',
    'Quantity prescribed',
    'Dosage period',
    'Price',
    'Note',
    'Amount'
  ];

  let total;
  const calcTotalAmount = (prescription) => {
    return (
      prescription &&
      prescription
        .map((item) => item.quantity * item.drug.price)
        .reduce((prev, curr) => prev + curr, 0)
    );
  };
  const getPrescriptionsInSession = async () => {
    const sessionId = String(id);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionPrescriptions(sessionId);
      if (data) {
        setPrescription(data.Prescriptions);
        console.log(data);
        const drugs = prescription.map((item) => item.drug);
        calcTotalAmount(drugs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTestsInSession = async () => {
    const sessionId = String(id);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionTests(sessionId);
      if (data) {
        setTests(data.LabTests);
        console.log(data);
        console.log(tests);
        // const testArr = tests.map((item) => item.drug);
        // calcTotalAmount(testArr);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const grandTotal = calcTotalAmount(prescription);

  useEffect(() => {
    getPrescriptionsInSession();
    getTestsInSession();
  }, []);

  return (
    <>
      <Nav />
      <div className="p-8">
        <h1>PatientInvoice</h1>
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">Cashier</p>
          </div>
          <h2 className="text-xl">Rose Odewuyi </h2>
        </div>
        <section className="flex flex-col space-y-3">
          <Paper className="flex flex-col items-center flex-1 px-3">
            <h3>Drugs and Test</h3>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
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
                  {prescription.map((item, index) => {
                    const { drug, note, id, quantity, days } = item;
                    const total = quantity * drug.price;
                    return (
                      <TableRow key={id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{drug.name}</TableCell>
                        <TableCell align="center">{quantity}</TableCell>
                        <TableCell align="center">{days} days</TableCell>
                        <TableCell align="center">
                          <span>&#8358;</span> {drug.price}
                        </TableCell>
                        <TableCell align="center">{note}</TableCell>
                        <TableCell align="center">
                          <span>&#8358;</span> {total.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <p className="flex self-end text-lg font-bold">
              Grand Total:&nbsp; <span>&#8358;</span> {grandTotal.toLocaleString()}
            </p>
          </Paper>
          <div className="w-full flex self-end">
            <ApprovePayment user={user} />
          </div>
        </section>
      </div>
    </>
  );
}

export default PatientInvoice;

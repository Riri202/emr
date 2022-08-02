/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Nav from '../../common-components/Nav';
import { Grow, Chip, CircularProgress, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import DropdownButton from '../../common-components/DropdownButton';
import ApprovePaymentBtn from '../components/ApprovePaymentBtn';
import { useParams } from 'react-router';
import { getSessionPrescriptions, getSessionTests } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

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

  let drugTotal = 0;

  const classes = useStyles();
  const headers = ['Item description', 'Qty', 'Rate', 'Amount'];

  const calcTotalAmount = (arr) => {
    drugTotal = arr
      .map((drug) => drug.quantity * drug.price)
      .reduce((prev, curr) => prev + curr, 0);
    return drugTotal;
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

  useEffect(() => {
    getPrescriptionsInSession();
    getTestsInSession();
  }, []);
  // get drugs list
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  // get drugs total amount
  const drugsTotalAmount = drugs
    .map((drug) => drug.quantity * drug.unitPrice)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <>
      <Nav />
      <div className="p-8">
        <h1>PatientInvoice</h1>
        {/* {prescription.map((item, key) => {
          const { drug } = item;
          return (
            <>
              <p key={key}>
                {drug.name} {drug.price}
              </p>
              <p>{drugTotal}</p>
            </>
          );
        })} */}
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">Cashier</p>
          </div>
          <h2 className="text-xl">Rose Odewuyi </h2>
        </div>
        <section className="flex flex-row space-x-2">
          <Paper className="flex flex-col items-center flex-1">
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
                  {drugs.map((drug, key) => (
                    <TableRow key={key}>
                      <TableCell align="center" component="th" scope="row">
                        {drug.name}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {drug.quantity}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        <span>&#8358;</span> {drug.unitPrice}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        <span>&#8358;</span> {drug.quantity * drug.unitPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="bg-green-500 font-bold">
                      Total Amount
                    </TableCell>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="bg-green-500 font-bold">
                      <span>&#8358;</span> {drugsTotalAmount}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <ApprovePaymentBtn amount={drugsTotalAmount} />
        </section>
      </div>
    </>
  );
}

export default PatientInvoice;

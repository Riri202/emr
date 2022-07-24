import React, { useState } from 'react';
import Nav from '../../common-components/Nav';
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
// import Button from '@mui/material/Button';
import { Chip } from '@mui/material';
import DropdownButton from '../../common-components/DropdownButton';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
function PharmacistInvoice() {
  const classes = useStyles();
  const headers = ['Item description', 'Qty', 'Rate', 'Amount'];

  // get drugs list
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  // get drugs total amount
  const drugsTotalAmount = drugs
    .map((drug) => drug.quantity * drug.unitPrice)
    .reduce((prev, curr) => prev + curr, 0);
  const [choice, setChoice] = useState([]);

  const handleChoice = (event) => {
    setChoice([event.target.value]);
  };

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
            <p className="text-xs">Pharmacist</p>
          </div>
          <h2 className="text-xl">Nosa Omoruyi </h2>
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
                    <DropdownButton
                      choice={choice}
                      onChange={handleChoice}
                      menuItems={['Lab', 'X-ray']}
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <div>
            <Chip
              label="Payment has been approved by Cashier Rose"
              icon={<CheckCircleIcon />}
              color="success"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default PharmacistInvoice;

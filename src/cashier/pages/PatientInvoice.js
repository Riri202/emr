/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
function PatientInvoice() {
  const classes = useStyles();
  const headers = ['Item description', 'Qty', 'Rate', 'Amount'];

  // state for changing button color when payment is approved
  const [isPaymentApproved, setIsPaymentApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // get drugs list
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  // get drugs total amount
  const drugsTotalAmount = drugs
    .map((drug) => drug.quantity * drug.unitPrice)
    .reduce((prev, curr) => prev + curr, 0);

  const handleApprovePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsPaymentApproved(true);
      setIsLoading(false);
    }, 6000);
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
          <div>
            {!isPaymentApproved ? (
              <Box sx={{ position: 'relative' }}>
                <Button
                  disabled={isLoading}
                  onClick={handleApprovePayment}
                  className="p-2 mt-1 bg-green-500 text-[#000] ml-3">
                  Approve payment of&nbsp;
                  <span> &#8358;</span>
                  {drugsTotalAmount}
                </Button>
                {isLoading && (
                  <CircularProgress
                    color="success"
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      zIndex: 1,
                      marginTop: '-12px',
                      marginLeft: '-12px'
                    }}
                  />
                )}
              </Box>
            ) : (
              <>
                <Grow in={isPaymentApproved}>
                  <div className="flex flex-col">
                    <Chip
                      label="Payment has been approved by Cashier Rose"
                      icon={<CheckCircleIcon />}
                      color="success"
                    />
                    <Box className="flex justify-end mt-3 bg-white p-1">
                      <DropdownButton
                        btnText="send to"
                        menuItems={['dr. Stark', 'Dr Drake Remurray']}
                      />
                    </Box>
                  </div>
                </Grow>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default PatientInvoice;

import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';

function CashierHome() {
  // get list of patients
  const patientsList = JSON.parse(localStorage.getItem('patients'));

  return (
    <>
      <Nav />
      <div className="p-8">
        <h1>Cashier Home</h1>
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">Cashier</p>
          </div>
          <h2 className="text-xl">Rose Odewuyi </h2>
        </div>

        <section>
          <Paper sx={{ width: '70vw' }} className="p-4">
            <h3>Incoming patients</h3>
            <ol>
              {patientsList.map((patient, key) => {
                return (
                  <li key={key}>
                    <Link to={'/patient-invoice'} style={{ textDecoration: 'none' }}>
                      {patient.id} {patient.name}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Paper>
        </section>
      </div>
    </>
  );
}

export default CashierHome;

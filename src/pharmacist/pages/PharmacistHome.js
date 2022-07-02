import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Nav from '../../common-components/Nav';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';

function PharmacistHome() {
  // get list of patients
  const patientsList = JSON.parse(localStorage.getItem('patients'));

  return (
    <>
      <Nav />
      <div className="p-8">
        <h1>Pharmacist Home</h1>
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">Pharmacist</p>
          </div>
          <h2 className="text-xl">Nosa Omoruyi </h2>
        </div>
        <section>
          <Paper sx={{ width: '70vw' }} className="p-4">
            <h3>Incoming patients</h3>
            <ol>
              {patientsList.map((patient, key) => {
                return (
                  <li key={key}>
                    <Link to={'/approved-invoice'} style={{ textDecoration: 'none' }}>
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

export default PharmacistHome;

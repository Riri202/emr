import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import { getAllStaff } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

const user = JSON.parse(localStorage.getItem('user'));

function CashierHome() {
  // get list of patients
  // const patientsList = JSON.parse(localStorage.getItem('patients'));
  const [doctors, setDoctors] = useState([]);

  const getAvailableDoctors = (allStaff) => {
    const allDoctors = allStaff.rows.filter((staff) => staff.role === 'DOCTOR');
    setDoctors([...allDoctors]);
    console.log(doctors);
  };

  const getAllDoctors = async () => {
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllStaff(page, size);
      if (data) {
        getAvailableDoctors(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
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
              {doctors.map((doctor, key) => {
                return (
                  <li key={key}>
                    <Link to={`/doctor/${doctor.uuid}`} style={{ textDecoration: 'none' }}>
                      {doctor.fullName}
                    </Link>
                  </li>
                );
              })}
              {/* {doctors.map((patient, key) => {
                return (
                  <li key={key}>
                    <Link to={'/patient-invoice'} style={{ textDecoration: 'none' }}>
                      {patient.id} {patient.name}
                    </Link>
                  </li>
                );
              })} */}
            </ol>
          </Paper>
        </section>
      </div>
    </>
  );
}

export default CashierHome;

// 1. get all doctors and their received queues
// 2. see which one has a queue with status in progress and check if they have prescription then display the patient in the queue in a list
// 3. diplay prescription details in cashier invoice

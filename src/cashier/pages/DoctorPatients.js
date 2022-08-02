import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import { getReceivedQueues } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

const user = JSON.parse(localStorage.getItem('user'));

function DoctorPatients() {
  const { uuid } = useParams();
  const [patientsList, setPatientsList] = useState([]);

  const patientsFromDoctor = async () => {
    const staffId = uuid;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getReceivedQueues(staffId, 'PENDING');
      const patients = data.rows;
      console.log(data);
      if (data) {
        setPatientsList(patients);
        console.log(patientsList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    patientsFromDoctor();
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
              {patientsList.map((data, key) => {
                return (
                  <li key={key}>
                    <Link
                      to={`/patient-invoice/${data.session.id}`}
                      style={{ textDecoration: 'none' }}>
                      {data.Patient.name}
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

export default DoctorPatients;

// 1. get all doctors and their received queues
// 2. see which one has a queue with status in progress and check if they have prescription then display the patient in the queue in a list
// 3. diplay prescription details in cashier invoice

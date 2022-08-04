/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Nav from '../../common-components/Nav';
import { ArrowForward, ArrowBack, Person } from '@mui/icons-material';
import { getSessionPrescriptions, getSessionTests } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

const user = JSON.parse(localStorage.getItem('user'));

function PatientHistory() {
  let { sessionId } = useParams();
  const [prescription, setPrescription] = useState([]);
  const [tests, setTests] = useState([]);

  const getPrescriptionsInSession = async () => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionPrescriptions(sessionId);
      if (data) {
        setPrescription(data.Prescriptions);
        console.log(data);
        // const drugs = prescription.map((item) => item.drug);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTestsInSession = async () => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionTests(sessionId);
      if (data) {
        setTests(data.LabTests);
        console.log(data);
        console.log(tests);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPrescriptionsInSession();
    getTestsInSession();
  }, []);
  // var items = [
  //   {
  //     name: 'Patient Name #1',
  //     description: 'Patient history desc',
  //     date: 'Jan 2nd 2022',
  //     time: '2pm',
  //     doctor: 'Dr Stark'
  //   },
  //   {
  //     name: 'Random Name #2',
  //     description: 'Patient history desc',
  //     date: 'May 2nd 2022',
  //     time: '4pm',
  //     doctor: 'Dr Butler'
  //   }
  // ];
  function Item({ prescription }) {
    return (
      <>
        <div className="flex space-x-3">
          <Avatar className="bg-orange-500 mt-1" variant="circular">
            <Person />
          </Avatar>
          <h4 className="text-lg mb-3"> Patient ID: {prescription.patient.id}</h4>
          <h4 className="text-lg mb-3"> Patient Name: {prescription.patient.name}</h4>
        </div>
        {/* <div className="mb-3">
          <span className="font-bold">Date: </span>
          {props.item.date}, <span className="font-bold">Time: </span>
          {props.item.time}, <span className="font-bold">Doctor: </span>
          {props.item.doctor}
        </div> */}
        <section className="">
          {/* symptoms card */}
          {/* <div className="w-2/3">
            <Paper sx={{ height: '70vh', flexGrow: 1, padding: 5 }}>
              <h3 className="text-lg mb-3">Symptoms</h3>
              <ol>
                <li>{props.item.name}</li>
                <li>{props.item.description}</li>
              </ol>
            </Paper>
          </div> */}

          {/* diagnosis card */}
          {/* <div className="w-2/3">
            <Paper sx={{ height: '70vh', flexGrow: 1, padding: 5 }}>
              <h3>Diagnosis</h3>
              <div>
                <ol>
                  <li>{props.item.name}</li>
                  <li>{props.item.description}</li>
                </ol>
              </div>
            </Paper>
          </div> */}

          <div className="">
            <Paper sx={{ height: '70vh', flexGrow: 1, padding: 5 }}>
              <h3>Drugs</h3>
              <div>
                <ol>
                  <li>{prescription.drug.name}</li>
                  <li>{prescription.drug.description}</li>
                  <li>{prescription.note}</li>
                  <li>{prescription.days}</li>
                  <li>{prescription.quantity}</li>
                </ol>
              </div>
            </Paper>
          </div>
        </section>
      </>
    );
  }

  return (
    <div>
      <Nav />
      <h1>Patient History</h1>
      <section className="p-10">
        <Carousel
          navButtonsAlwaysVisible={true}
          autoPlay={false}
          NextIcon={<ArrowForward />}
          PrevIcon={<ArrowBack />}
          className="h-[70vh]">
          {prescription.map((prescription, index) => (
            <Item key={index} prescription={prescription} />
          ))}
        </Carousel>
      </section>
    </div>
  );
}

export default PatientHistory;

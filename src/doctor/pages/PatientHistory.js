/* eslint-disable react/prop-types */
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Nav from '../../common-components/Nav';
import { ArrowForward, ArrowBack, Person } from '@mui/icons-material';

function PatientHistory() {
  var items = [
    {
      name: 'Patient Name #1',
      description: 'Patient history desc',
      date: 'Jan 2nd 2022',
      time: '2pm',
      doctor: 'Dr Stark'
    },
    {
      name: 'Random Name #2',
      description: 'Patient history desc',
      date: 'May 2nd 2022',
      time: '4pm',
      doctor: 'Dr Butler'
    }
  ];
  function Item(props) {
    return (
      <>
        <div className="flex space-x-3">
          <Avatar className="bg-orange-500 mt-1" variant="circular">
            <Person />
          </Avatar>
          <h2 className="text-lg mb-3">id: name</h2>
        </div>
        <div className="mb-3">
          <span className="font-bold">Date: </span>
          {props.item.date}, <span className="font-bold">Time: </span>
          {props.item.time}, <span className="font-bold">Doctor: </span>
          {props.item.doctor}
        </div>
        <section className="flex space-x-2">
          {/* symptoms card */}
          <div className="w-2/3">
            <Paper sx={{ height: '70vh', flexGrow: 1, padding: 5 }}>
              <h3 className="text-lg mb-3">Symptoms</h3>
              <ol>
                <li>{props.item.name}</li>
                <li>{props.item.description}</li>
              </ol>
            </Paper>
          </div>

          {/* diagnosis card */}
          <div className="w-2/3">
            <Paper sx={{ height: '70vh', flexGrow: 1, padding: 5 }}>
              <h3>Diagnosis</h3>
              <div>
                <ol>
                  <li>{props.item.name}</li>
                  <li>{props.item.description}</li>
                </ol>
              </div>
            </Paper>
          </div>

          <div className="w-2/3">
            <Paper sx={{ height: '70vh', flexGrow: 1, padding: 5 }}>
              <h3>Drugs</h3>
              <div>
                <ol>
                  <li>{props.item.name}</li>
                  <li>{props.item.description}</li>
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
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </section>
    </div>
  );
}

export default PatientHistory;

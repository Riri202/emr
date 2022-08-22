/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
import Nav from '../../common-components/Nav';
// import { ArrowForward, ArrowBack, Person } from '@mui/icons-material';
import { getSessionPrescriptions, getSessionTests } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import PrescriptionHistory from '../components/PrescriptionHistory';
import TestHistory from '../components/TestHistory';

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
        console.log(prescription);
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

  return (
    <>
      <Nav />
      <div className="p-10">
        <h1 className="">Patient History</h1>
        <Paper>
          <PrescriptionHistory />
          <TestHistory />
        </Paper>
      </div>
    </>
  );
}

export default PatientHistory;
// function Prescriptions({ prescription }) {
//   return (
//     <>
//       <div className="flex space-x-3">
//         <Avatar className="bg-orange-500 mt-1" variant="circular">
//           <Person />
//         </Avatar>
//         <h4 className="text-lg mb-3"> Patient ID: {prescription.patient.id}</h4>
//         <h4 className="text-lg mb-3"> Patient Name: {prescription.patient.name}</h4>
//         <h4 className="text-lg mb-3"> Created at: {prescription.createdAt}</h4>
//       </div>
//       <section className="">
//         <div className="">
//           <Paper sx={{ flexGrow: 1, padding: 5 }}>
//             <h3>Drugs</h3>
//             <div>
//               <ol>
//                 <li>{prescription.drug.name}</li>
//                 <li>{prescription.drug.description}</li>
//                 <li>{prescription.note}</li>
//                 <li>{prescription.days}</li>
//                 <li>{prescription.quantity}</li>
//               </ol>
//             </div>
//           </Paper>
//         </div>
//       </section>
//     </>
//   );
// }

// return (
//   <div>
//     <Nav />
//     <h1 className=" ml-5">Patient History</h1>
//     <section className="p-10">
//       <Carousel
//         navButtonsAlwaysVisible={true}
//         autoPlay={false}
//         NextIcon={<ArrowForward />}
//         PrevIcon={<ArrowBack />}
//         className="h-[70vh]">
//         {history.Prescriptions.map((prescription, index) => (
//           <Prescriptions key={index} prescription={prescription} />
//         ))}
//         {history.Prescriptions.map((prescription, index) => (
//           <Prescriptions key={index} prescription={prescription} />
//         ))}
//         {history.Prescriptions.map((prescription, index) => (
//           <Prescriptions key={index} prescription={prescription} />
//         ))}
//       </Carousel>
//     </section>
//   </div>
// );

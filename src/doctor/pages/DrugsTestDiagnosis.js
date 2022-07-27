import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import SymptomsCard from '../components/SymptomsCard';
import DiagnosisCard from '../components/DiagnosisCard';
import { getAllInventoryItems } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import Prescription from '../components/Prescription';
import LabTest from '../components/LabTest';

const user = JSON.parse(localStorage.getItem('user'));

function DrugsTestDiagnosis() {
  const { patientId, sessionId } = useParams();

  const [drugsList, setDrugsList] = useState([]);
  const [testsList, setTestsList] = useState([]);

  const getInventory = async () => {
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllInventoryItems(page, size);
      if (data) {
        const drugs = data.rows.filter((item) => item.type === 'DRUG');
        const tests = data.rows.filter((item) => item.type === 'TEST');
        setDrugsList(drugs);
        setTestsList(tests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <Nav />
      <div className="p-10">
        <section>
          <h1>Symptoms, Diagnosis, Drugs and Tests</h1>
          <div className="flex space-x-3">
            <Avatar className="bg-orange-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <h2 className="text-lg mb-3">id: name</h2>
          </div>
          <div className="mb-3">
            <Link to={'/history-overview'}>View patients history</Link>
          </div>
        </section>
        <section className="flex space-x-3">
          <div className="w-1/2">
            <SymptomsCard sessionId={sessionId} patientId={patientId} />
          </div>

          <div className="w-1/2">
            <DiagnosisCard sessionId={sessionId} patientId={patientId} />
          </div>
        </section>

        <section className="mt-3">
          <div className="w-full">
            <Paper sx={{ flexGrow: 1 }} className="p-3">
              <div className="flex justify-center">
                <h3 className="text-lg mb-3">Drugs and Tests</h3>
              </div>
              <section className="flex flex-col space-y-3">
                <Prescription drugsList={drugsList} sessionId={sessionId} patientId={patientId} />
                <LabTest testsList={testsList} sessionId={sessionId} />
              </section>
            </Paper>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DrugsTestDiagnosis;

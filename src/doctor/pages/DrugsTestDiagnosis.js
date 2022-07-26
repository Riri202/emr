import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import SymptomsCard from '../components/SymptomsCard';
import DiagnosisCard from '../components/DiagnosisCard';
import { addNewTest, addPrescription, getAllInventoryItems } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import Prescription from '../components/Prescription';
import LabTest from '../components/LabTest';

const user = JSON.parse(localStorage.getItem('user'));

function DrugsTestDiagnosis() {
  const { patientId, sessionId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [drugsList, setDrugsList] = useState([]);

  const [drugInputData, setDrugInputData] = useState({
    quantity: '',
    days: '',
    note: ''
  });
  const [testInputData, setTestInputData] = useState({
    title: '',
    description: ''
  });

  const handleDrugFormChange = (e) => {
    setDrugInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const { days, quantity, note } = drugInputData;

  const handleTestFormChange = (e) => {
    setTestInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const { title, description } = testInputData;

  const getSelectedDrugId = (drug, allDrugs) => {
    const selectedDrug = allDrugs.find((item) => item.name === drug);
    return selectedDrug.id;
  };

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
        setDrugsList(drugs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitDrugForm = async (event, drugChoice) => {
    event.preventDefault();
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const drugId = getSelectedDrugId(drugChoice, drugsList);
      const requestBody = { patientId, sessionId, drugId, quantity, days, note };
      await addPrescription(requestBody);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const onSubmitTestForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const requestBody = { description, sessionId, title };
      await addNewTest(requestBody);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
                <Prescription
                  onSubmit={onSubmitDrugForm}
                  handleChange={handleDrugFormChange}
                  isLoading={isLoading}
                />
                <LabTest
                  isLoading={isLoading}
                  handleChange={handleTestFormChange}
                  onSubmit={onSubmitTestForm}
                />
              </section>
            </Paper>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DrugsTestDiagnosis;

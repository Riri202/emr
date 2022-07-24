import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import Avatar from '@mui/material/Avatar';
import { Person, Add } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import DropdownButton from '../../common-components/DropdownButton';
import DropdownSearch from '../../common-components/DropdownSearch';
import SymptomsCard from '../components/SymptomsCard';
import DiagnosisCard from '../components/DiagnosisCard';
import { addPrescription } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import IntuitiveButton from '../../common-components/IntuitiveButton';

const user = JSON.parse(localStorage.getItem('user'));

function DrugsTestDiagnosis() {
  // const patientsInfo = JSON.parse(localStorage.getItem('patientsInfo/Biodata'));
  // console.log(patientsInfo);

  // get dropdown menu items obj from local storage, map through them to get the items
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  const drugsArr = drugs.map((drug) => drug.name);

  const [drugChoice, setDrugChoice] = useState([]);
  const [labTestChoice, setLabTestChoice] = useState([]);
  const [xrayTestChoice, setXrayTestChoice] = useState([]);
  const [drugInputData, setDrugInputData] = useState({
    quantity: '',
    days: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { days, quantity } = drugInputData;
  const { patientId, sessionId } = useParams();
  const [choice, setChoice] = useState([]);

  const handleDoctorChoice = (event) => {
    setChoice([event.target.value]);
  };

  // function to handle checkbox change in dropdown button component to get and store value in api or localStorage
  const handleDrugChoice = async (event) => {
    if (event.target.checked && !drugChoice.length) {
      setDrugChoice([event.target.value]);
    } else if (event.target.checked && drugChoice.length > 0) {
      setDrugChoice([...drugChoice, event.target.value]);
    }
    // remove choice from list when you uncheck its checkbox
    if (!event.target.checked) {
      const filterdArr = drugChoice.filter((c) => c !== event.target.value);
      setDrugChoice([...filterdArr]);
    }
  };

  const handleLabTestChoice = (event) => {
    if (event.target.checked && !labTestChoice.length) {
      setLabTestChoice([event.target.value]);
    } else if (event.target.checked && labTestChoice.length > 0) {
      setLabTestChoice([...labTestChoice, event.target.value]);
    }
    // remove choice from list when you uncheck its checkbox
    if (!event.target.checked) {
      const filterdArr = labTestChoice.filter((c) => c !== event.target.value);
      setLabTestChoice([...filterdArr]);
    }
  };

  const handleXrayTestChoice = (event) => {
    if (event.target.checked && !xrayTestChoice.length) {
      setXrayTestChoice([event.target.value]);
    } else if (event.target.checked && xrayTestChoice.length > 0) {
      setXrayTestChoice([...xrayTestChoice, event.target.value]);
    }
    // remove choice from list when you uncheck its checkbox
    if (!event.target.checked) {
      const filterdArr = xrayTestChoice.filter((c) => c !== event.target.value);
      setXrayTestChoice([...filterdArr]);
    }
  };

  const handleChange = (e) => {
    setDrugInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmitDrugForm = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    const responses = [];
    if (user) {
      setAuthToken(user.token);
    }
    try {
      for (let i = 0; i < drugChoice.length; i++) {
        const drugId = drugChoice[i]['id'];
        const requestBody = { patientId, sessionId, drugId, quantity, days };
        responses.push(await addPrescription(requestBody));
        console.log(responses);
        // TODO use this responses to set the list of drugs displayed in the ui
      }
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
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
          {/* symptoms card */}
          <div className="w-1/2">
            <SymptomsCard />
          </div>

          {/* diagnosis card */}
          <div className="w-1/2">
            <DiagnosisCard />
          </div>
        </section>
        <section className="mt-3">
          {/* drugs and test card */}
          <div className="w-full">
            <Paper sx={{ flexGrow: 1 }} className="p-3">
              <div className="flex justify-between">
                <h3 className="text-lg mb-3">Drugs and Tests</h3>
                <div className="flex flex-row space-x-2">
                  <DropdownSearch
                    btnText="Add drugs"
                    menuItems={drugs}
                    handleCheckboxChange={handleDrugChoice}
                  />
                  <DropdownSearch
                    btnText="Add lab tests"
                    menuItems={drugs}
                    handleCheckboxChange={handleLabTestChoice}
                  />
                  <DropdownSearch
                    btnText="Add x-ray tests"
                    menuItems={drugs}
                    handleCheckboxChange={handleXrayTestChoice}
                  />
                </div>
              </div>
              <section className="flex flex-col space-y-3">
                <form onSubmit={onSubmitDrugForm}>
                  {drugChoice.length ? <h3>Drugs</h3> : null}
                  <ol>
                    {drugChoice &&
                      drugChoice.map((choice, index) => {
                        return (
                          <>
                            <li key={index} className="flex flex-row justify-evenly mt-2 mb-2">
                              <input
                                type="number"
                                placeholder="No of drugs"
                                name="quantity"
                                onChange={handleChange}
                              />
                              <input
                                type="number"
                                placeholder="No of drugs"
                                name="quantity"
                                onChange={handleChange}
                              />
                              <input
                                type="number"
                                placeholder="No of days"
                                name="days"
                                onChange={handleChange}
                              />
                              <input placeholder="more..." />
                              <span>total tablet</span>
                            </li>
                            <Divider orientation="horizontal" variant="fullWidth" />
                          </>
                        );
                      })}
                  </ol>
                  <IntuitiveButton text="Add prescription" isLoading={isLoading} />
                </form>
                <div>
                  {labTestChoice.length ? <h3>Lab Tests</h3> : null}
                  <ol>
                    {labTestChoice &&
                      labTestChoice.map((choice, index) => {
                        return (
                          <>
                            <li key={index} className="flex flex-row justify-evenly mt-2 mb-2">
                              <span>{choice}</span>
                              {/* <input type="number" placeholder="No of drugs" />
                              <input type="number" placeholder="No of days" />
                              <input placeholder="more..." />
                              <span>total tablet</span> */}
                            </li>
                            <Divider orientation="horizontal" variant="fullWidth" />
                          </>
                        );
                      })}
                  </ol>
                </div>
                <div>
                  {xrayTestChoice.length ? <h3>X-Ray Tests</h3> : null}
                  <ol>
                    {xrayTestChoice &&
                      xrayTestChoice.map((choice, index) => {
                        return (
                          <>
                            <li key={index} className="flex flex-row justify-evenly mt-2 mb-2">
                              <span>{choice}</span>
                              {/* <input type="number" placeholder="No of drugs" />
                              <input type="number" placeholder="No of days" />
                              <input placeholder="more..." />
                              <span>total tablet</span> */}
                            </li>
                            <Divider orientation="horizontal" variant="fullWidth" />
                          </>
                        );
                      })}
                  </ol>
                </div>
              </section>
              <div clasName="flex flex-row space-x-2">
                <Button variant="text" endIcon={<Add />}>
                  Add Note
                </Button>
                <DropdownButton
                  choice={choice}
                  onChange={handleDoctorChoice}
                  menuItems={drugsArr}
                />
              </div>
            </Paper>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DrugsTestDiagnosis;

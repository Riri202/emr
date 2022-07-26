/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import DropdownSearch from '../../common-components/DropdownSearch';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import setAuthToken from '../../utils/setAuthToken';
import { addNewDiagnosis } from '../../utils/api';

const user = JSON.parse(localStorage.getItem('user'));

function DiagnosisCard({ sessionId, patientId }) {
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  // const diagnosisArr = diagnosis.map((dia) => dia.diagnosis);
  const [choice, setChoice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    title: '',
    description: ''
  });
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const { title, description } = inputData;

  const handleDiagnosisChoice = (event) => {
    if (event.target.checked && !choice.length) {
      setChoice([event.target.value]);
    } else if (event.target.checked && choice.length > 0) {
      setChoice([...choice, event.target.value]);
    }
    // remove choice from list when you uncheck its checkbox
    if (!event.target.checked) {
      const filterdArr = choice.filter((c) => c !== event.target.value);
      setChoice([...filterdArr]);
    }
  };
  const onSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const requestBody = { description, sessionId, patientId, title };
      await addNewDiagnosis(requestBody);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ flexGrow: 1 }} className="p-3">
      <div className="flex justify-between">
        <h3 className="text-lg mb-3">Diagnosis</h3>
        <DropdownSearch
          btnText="Add diagnosis"
          menuItems={drugs}
          handleCheckboxChange={handleDiagnosisChoice}
        />
      </div>
      {choice && choice.length ? (
        <ol>
          {choice.map((c, key) => {
            return (
              <>
                <form onSubmit={onSubmitForm}>
                  <li key={key} className="flex flex-row justify-evenly mt-2 mb-2">
                    <input type="text" name="title" value={c} disabled={true} />
                    <input
                      type="text"
                      name="description"
                      onChange={handleChange}
                      placeholder="description"
                    />
                    <IntuitiveButton text="Add diagnosis" isLoading={isLoading} />
                  </li>
                  <Divider orientation="horizontal" variant="fullWidth" />
                </form>
              </>
            );
          })}
        </ol>
      ) : (
        <p className="text-lg mb-3 text-red-500">Select from diagnosis options above</p>
      )}

      <Button variant="text" endIcon={<Add />}>
        Add Note
      </Button>
    </Paper>
  );
}

export default DiagnosisCard;

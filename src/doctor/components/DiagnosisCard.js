/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import DropdownSearch from '../../common-components/DropdownSearch';
import setAuthToken from '../../utils/setAuthToken';
import { addNewDiagnosis } from '../../utils/api';
import TransformButton from '../../common-components/TransformButton';

const user = JSON.parse(localStorage.getItem('user'));

function DiagnosisForm({ diagnosis, handleChange, inputData, sessionId, patientId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { title, description } = inputData;

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
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsSuccessful(false);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <li className="flex flex-row justify-evenly mt-2 mb-2">
        <input type="text" name="title" readOnly value={diagnosis} disabled={false} />
        <input
          type="text"
          disabled={isSuccessful}
          name="description"
          onChange={handleChange}
          placeholder="description"
        />
        <TransformButton btnText="Add symptoms" isSuccessful={isSuccessful} isLoading={isLoading} />
      </li>
      <Divider orientation="horizontal" variant="fullWidth" />
    </form>
  );
}

function DiagnosisCard({ sessionId, patientId }) {
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  const [choice, setChoice] = useState([]);
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
      <div>
        {choice && choice.length ? (
          <div>
            {choice &&
              choice.map((c, key) => {
                return (
                  <DiagnosisForm
                    key={key}
                    diagnosis={c}
                    handleChange={handleChange}
                    inputData={inputData}
                    sessionId={sessionId}
                    patientId={patientId}
                  />
                );
              })}
          </div>
        ) : (
          <p className="text-lg mb-3 text-red-500">Select from diagnosis options above</p>
        )}
      </div>
    </Paper>
  );
}

export default DiagnosisCard;

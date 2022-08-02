/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import DropdownSearch from '../../common-components/DropdownSearch';
import setAuthToken from '../../utils/setAuthToken';
import { addNewTest } from '../../utils/api';
import TransformButton from '../../common-components/TransformButton';

// const drugs = JSON.parse(localStorage.getItem('drugsList'));
const user = JSON.parse(localStorage.getItem('user'));

function LabTestForm({ test, handleChange, testInputData, sessionId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { title, description } = testInputData;

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
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsSuccessful(false);
    }
  };

  return (
    <form onSubmit={onSubmitTestForm}>
      <li className="flex flex-row justify-evenly mt-2 mb-2">
        <input type="text" name="title" readOnly value={test} disabled={false} />
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

function LabTest({ sessionId, testsList }) {
  const [testChoice, setTestChoice] = useState([]);
  const [testInputData, setTestInputData] = useState({
    title: '',
    description: ''
  });

  const handleTestFormChange = (e) => {
    setTestInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleTestChoice = (event) => {
    if (event.target.checkedh) {
      testChoice.push(event.target.value);
      setTestChoice(testChoice);
      setTestInputData((prevState) => ({
        ...prevState,
        title: event.target.value
      }));
    }
    // remove choice from list when you uncheck its checkbox
    if (!event.target.checked) {
      const filterdArr = testChoice.filter((c) => c !== event.target.value);
      setTestChoice([...filterdArr]);
    }
  };

  return (
    <div className="mt-3 ring-2 ring-stone-300 p-4">
      <div className="flex justify-between">
        <h3 className="text-lg mb-3">Symptoms</h3>
        <DropdownSearch
          btnText="Add symptoms"
          menuItems={testsList}
          handleCheckboxChange={handleTestChoice}
        />
      </div>
      <div>
        {testChoice && testChoice.length ? (
          <div>
            {testChoice &&
              testChoice.map((c, key) => {
                return (
                  <LabTestForm
                    key={key}
                    test={c}
                    handleChange={handleTestFormChange}
                    inputData={testInputData}
                    sessionId={sessionId}
                  />
                );
              })}
          </div>
        ) : (
          <p className="text-lg mb-3 text-red-500">Select from tests options above</p>
        )}
      </div>
    </div>
  );
}

export default LabTest;
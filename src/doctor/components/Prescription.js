/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import DropdownSearch from '../../common-components/DropdownSearch';
import setAuthToken from '../../utils/setAuthToken';
import { addPrescription } from '../../utils/api';
import TransformButton from '../../common-components/TransformButton';

const user = JSON.parse(localStorage.getItem('user'));

function PrescriptionForm({ drug, handleChange, drugInputData, sessionId, patientId, drugsList }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { days, quantity, note } = drugInputData;

  const getSelectedDrugId = (drug, allDrugs) => {
    const selectedDrug = allDrugs.find((item) => item.name === drug);
    return selectedDrug.id;
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
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsSuccessful(false);
    }
  };

  return (
    <form onSubmit={onSubmitDrugForm}>
      <li className="flex flex-row justify-evenly mt-2 mb-2">
        <input type="text" name="drug" readOnly value={drug} disabled={false} />
        <input
          type="text"
          disabled={isSuccessful}
          name="quantity"
          onChange={handleChange}
          placeholder="quantity"
        />
        <input
          type="text"
          disabled={isSuccessful}
          name="days"
          onChange={handleChange}
          placeholder="No of days"
        />
        <input
          type="text"
          disabled={isSuccessful}
          name="note"
          onChange={handleChange}
          placeholder="note"
        />
        <TransformButton
          btnText="Add prescription"
          isSuccessful={isSuccessful}
          isLoading={isLoading}
        />
      </li>
      <Divider orientation="horizontal" variant="fullWidth" />
    </form>
  );
}

function Prescription({ sessionId, patientId, drugsList }) {
  const [drugChoice, setDrugChoice] = useState([]);
  const [drugInputData, setDrugInputData] = useState({
    drug: '',
    quantity: '',
    days: '',
    note: ''
  });
  const handleDrugFormChange = (e) => {
    setDrugInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // function to handle checkbox change in dropdown button component to get and store value in api or localStorage
  const handleDrugChoice = async (event) => {
    if (event.target.checked) {
      drugChoice.push(event.target.value);
      setDrugChoice(drugChoice);
    }
    console.log(drugChoice);
    // remove choice from list when you uncheck its checkbox
    if (!event.target.checked) {
      const filterdArr = drugChoice.filter((c) => c !== event.target.value);
      setDrugChoice([...filterdArr]);
    }
  };

  //   const removeFormFields = (i) => {
  //     let newFormValues = [...drugChoice];
  //     newFormValues.splice(i, 1);
  //     setDrugChoice(newFormValues);
  //   };

  return (
    <div className="mt-3 ring-2 ring-stone-300 p-4">
      <div className="flex justify-between">
        <h3 className="text-lg mb-3">Drugs</h3>
        <DropdownSearch
          btnText="Add symptoms"
          menuItems={drugsList}
          handleCheckboxChange={handleDrugChoice}
        />
      </div>
      <div>
        {drugChoice && drugChoice.length ? (
          <div>
            {drugChoice &&
              drugChoice.map((c, key) => {
                return (
                  <PrescriptionForm
                    key={key}
                    drug={c}
                    handleChange={handleDrugFormChange}
                    drugInputData={drugInputData}
                    sessionId={sessionId}
                    patientId={patientId}
                    drugsList={drugsList}
                  />
                );
              })}
          </div>
        ) : (
          <p className="text-lg mb-3 text-red-500">Select from drug options above</p>
        )}
      </div>
    </div>
  );
}

export default Prescription;

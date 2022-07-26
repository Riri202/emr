/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import DropdownSearch from '../../common-components/DropdownSearch';
// import IntuitiveButton from '../../common-components/IntuitiveButton';
import setAuthToken from '../../utils/setAuthToken';
import { addNewSymptom } from '../../utils/api';
import TransformButton from '../../common-components/TransformButton';

const user = JSON.parse(localStorage.getItem('user'));

function SymptomsCard({ sessionId, patientId }) {
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  const [choice, setChoice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
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

  const handleSymptomChoice = (event) => {
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
      await addNewSymptom(requestBody);
      setIsLoading(false);
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsSuccessful(false);
    }
  };

  return (
    <Paper sx={{ flexGrow: 1 }} className="p-3">
      <div className="flex justify-between">
        <h3 className="text-lg mb-3">Symptoms</h3>
        <DropdownSearch
          btnText="Add symptoms"
          menuItems={drugs}
          handleCheckboxChange={handleSymptomChoice}
        />
      </div>
      {choice && choice.length ? (
        <ol>
          {choice &&
            choice.map((c, key) => {
              return (
                <>
                  <form onSubmit={onSubmitForm}>
                    <li key={key} className="flex flex-row justify-evenly mt-2 mb-2">
                      <input type="text" name="title" value={c} disabled={true} />
                      <input
                        type="text"
                        disabled={isSuccessful}
                        name="description"
                        onChange={handleChange}
                        placeholder="description"
                      />
                      {/* <IntuitiveButton text="Add diagnosis" isLoading={isLoading} /> */}
                      <TransformButton
                        btnText="Add symptoms"
                        isSuccessful={isSuccessful}
                        isLoading={isLoading}
                      />
                    </li>
                    <Divider orientation="horizontal" variant="fullWidth" />
                  </form>
                </>
              );
            })}
        </ol>
      ) : (
        <p className="text-lg mb-3 text-red-500">Select from symptoms options above</p>
      )}

      <Button variant="text" endIcon={<Add />}>
        Add Note
      </Button>
    </Paper>
  );
}

export default SymptomsCard;

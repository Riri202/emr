/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import DropdownSearch from '../../common-components/DropdownSearch';
import setAuthToken from '../../utils/setAuthToken';
import { getAllInventoryItems } from '../../utils/api';

// const drugs = JSON.parse(localStorage.getItem('drugsList'));
const user = JSON.parse(localStorage.getItem('user'));

function LabTest({ onSubmit, handleChange, isLoading }) {
  const [testChoice, setTestChoice] = useState([]);
  const [testsList, setTestsList] = useState([]);

  const handleTestChoice = (event) => {
    if (event.target.checked && !testChoice.length) {
      setTestChoice([event.target.value]);
    } else if (event.target.checked && testChoice.length > 0) {
      setTestChoice([...testChoice, event.target.value]);
    }
    // remove choice from list when you uncheck its checkbox
    if (!event.target.checked) {
      const filterdArr = testChoice.filter((c) => c !== event.target.value);
      setTestChoice([...filterdArr]);
    }
  };

  const removeFormFields = (i) => {
    let newFormValues = [...testChoice];
    newFormValues.splice(i, 1);
    setTestChoice(newFormValues);
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
        const tests = data.rows.filter((item) => item.type === 'TEST');
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
    <div className="mt-3 ring-2 ring-stone-300 p-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-green-600">Tests</h3>
        <DropdownSearch
          btnText="Add tests"
          menuItems={testsList}
          isTest={true}
          handleCheckboxChange={handleTestChoice}
        />
      </div>
      {testChoice && testChoice.length ? (
        <ol>
          {testChoice &&
            testChoice.map((choice, index) => {
              return (
                <>
                  <form onSubmit={onSubmit}>
                    <li key={index} className="flex flex-row space-x-2 mt-2 mb-2">
                      <input type="text" name="title" value={choice} disabled={true} />
                      <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        placeholder="description"
                      />
                      <Button
                        type="button"
                        className="p-2 mt-1 text-red-500 ml-3"
                        onClick={() => removeFormFields(index, testChoice)}>
                        X
                      </Button>
                      <IntuitiveButton text="Add test" isLoading={isLoading} />
                    </li>
                    <Divider orientation="horizontal" variant="fullWidth" />
                  </form>
                </>
              );
            })}
        </ol>
      ) : (
        <p className="text-lg mb-3 text-red-500">Select from test options above</p>
      )}
    </div>
  );
}

export default LabTest;

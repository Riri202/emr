/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Divider } from '@material-ui/core';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import DropdownSearch from '../../common-components/DropdownSearch';
import setAuthToken from '../../utils/setAuthToken';
import { getAllInventoryItems } from '../../utils/api';

// const drugs = JSON.parse(localStorage.getItem('drugsList'));
const user = JSON.parse(localStorage.getItem('user'));

function Prescription({ onSubmit, handleChange, isLoading }) {
  const [drugChoice, setDrugChoice] = useState([]);
  const [drugsList, setDrugsList] = useState([]);

  // function to handle checkbox change in dropdown button component to get and store value in api or localStorage
  const handleDrugChoice = async (event) => {
    if (event.target.checked && !drugChoice.length) {
      setDrugChoice([event.target.value]);
    } else if (event.target.checked && drugChoice.length > 0) {
      setDrugChoice([...drugChoice, event.target.value]);
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

  useEffect(() => {
    getInventory();
  }, []);
  return (
    <div className="mt-3 ring-2 ring-stone-300 p-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-green-600">Drugs</h3>
        <DropdownSearch
          btnText="Add drugs"
          menuItems={drugsList}
          handleCheckboxChange={handleDrugChoice}
          isTest={false}
        />
      </div>
      {drugChoice && drugChoice.length ? (
        <ol>
          {drugChoice &&
            drugChoice.map((choice, index) => {
              return (
                <>
                  <form onSubmit={() => onSubmit(event, drugChoice)}>
                    <li key={index} className="flex flex-row justify-evenly mt-2 mb-2">
                      <input type="text" name="drug" value={choice} disabled={true} />
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
                      <input name="note" onChange={handleChange} placeholder="add a note" />
                      <span>total tablet</span>
                      <IntuitiveButton text="Add prescription" isLoading={isLoading} />
                    </li>
                    {/* <Button
                      type="button"
                      className="p-2 mt-1 text-red-500 ml-3"
                      onClick={() => removeFormFields(index, testChoice)}>
                      X
                    </Button> */}
                    <Divider orientation="horizontal" variant="fullWidth" />
                  </form>
                </>
              );
            })}
        </ol>
      ) : (
        //   {drugChoice.length ? (
        //     <div className="flex justify-center mt-2 mb-2">
        //       <div className="w-1/2">
        //       </div>
        //     </div>
        //   ) : null}
        <p className="text-lg mb-3 text-red-500">
          Select from drug options above to send a prescription
        </p>
      )}
    </div>
  );
}

export default Prescription;

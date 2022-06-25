import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import DropdownSearch from '../../common-components/DropdownSearch';
import { handleCheckboxChange } from '../../utils/index';

function SymptomsCard() {
  const symptoms = JSON.parse(localStorage.getItem('symptomsRows'));
  const symptomsArr = symptoms.map((sym) => sym.symptom);
  const [choice, setChoice] = useState([]);

  return (
    <Paper sx={{ flexGrow: 1 }} className="p-3">
      <div className="flex justify-between">
        <h3 className="text-lg mb-3">Symptoms</h3>
        <DropdownSearch
          btnText="Add symptoms"
          menuItems={symptomsArr}
          handleCheckboxChange={() => handleCheckboxChange(event, setChoice, choice)}
        />
      </div>
      <ol>
        {choice.map((c, index) => {
          return (
            <>
              <li key={index} className="mt-2 mb-2">
                {c}
              </li>
              <Divider orientation="horizontal" variant="fullWidth" />
            </>
          );
        })}
      </ol>
      <Button variant="text" endIcon={<Add />}>
        Add Note
      </Button>
    </Paper>
  );
}

export default SymptomsCard;

import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import DropdownSearch from '../../common-components/DropdownSearch';

function DiagnosisCard() {
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  // const diagnosisArr = diagnosis.map((dia) => dia.diagnosis);
  const [choice, setChoice] = useState([]);

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
      <ol>
        {choice.map((c, key) => {
          return (
            <>
              <li key={key} className="mt-2 mb-2">
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

export default DiagnosisCard;

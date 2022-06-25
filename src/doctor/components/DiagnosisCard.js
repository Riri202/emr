import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import DropdownSearch from '../../common-components/DropdownSearch';
import { handleCheckboxChange } from '../../utils/index';

function DiagnosisCard() {
  const diagnosis = JSON.parse(localStorage.getItem('diagnosisRows'));
  const diagnosisArr = diagnosis.map((dia) => dia.diagnosis);
  const [choice, setChoice] = useState([]);

  return (
    <Paper sx={{ flexGrow: 1 }} className="p-3">
      <div className="flex justify-between">
        <h3 className="text-lg mb-3">Diagnosis</h3>
        <div className="flex flex-col space-y-2">
          <DropdownSearch
            btnText="Add diagnosis"
            menuItems={diagnosisArr}
            handleCheckboxChange={() => handleCheckboxChange(event, setChoice, choice)}
          />
        </div>
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

export default DiagnosisCard;

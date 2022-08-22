import React from 'react';
import { Paper } from '@material-ui/core';

// TODO get patients biodata from backend instead, use the uuid or id from this page url for the api url
const patientsInfo = JSON.parse(localStorage.getItem('patientsInfo/Biodata'));

function PatientInfo() {
  return (
    <div>
      <Paper className="p-5 w-full">
        <h3>Patients Information and Biodata</h3>
        <div>
          <ol>
            {patientsInfo &&
              patientsInfo.map((info, index) => {
                return (
                  <li key={index}>
                    {info.title}: {info.biodata}
                  </li>
                );
              })}
          </ol>
        </div>
      </Paper>
    </div>
  );
}

export default PatientInfo;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import Avatar from '@mui/material/Avatar';
import { Person, Add } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@material-ui/core';
import DropdownButton from '../../common-components/DropdownButton';
import DropdownSearch from '../../common-components/DropdownSearch';
import SymptomsCard from '../components/SymptomsCard';
import DiagnosisCard from '../components/DiagnosisCard';

function DrugsTestDiagnosis() {
  // const patientsInfo = JSON.parse(localStorage.getItem('patientsInfo/Biodata'));
  // console.log(patientsInfo);

  // get dropdown menu items obj from local storage, map through them to get the items
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  const drugsArr = drugs.map((drug) => drug.name);

  const [choice, setChoice] = useState([]);

  // function to handle checkbox change in dropdown button component to get and store value in api or localStorage
  const handleCheckboxChange = (event) => {
    if (event.target.checked && !choice.length) {
      setChoice([event.target.value]);
    } else if (event.target.checked && choice.length > 0) {
      setChoice([...choice, event.target.value]);
    }
    if (!event.target.checked) {
      const filterdArr = choice.filter((c) => c !== event.target.value);
      setChoice([...filterdArr]);
    }
    console.log(choice);
    // localStorage.setItem(`selected${chosen}`, JSON.stringify(choice));
  };

  return (
    <div className="h-screen">
      <Nav />
      <div className="p-10">
        <section>
          <h1>Symptoms, Diagnosis, Drugs and Tests</h1>
          <div className="flex space-x-3">
            <Avatar className="bg-orange-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <h2 className="text-lg mb-3">id: name</h2>
          </div>
          <div className="mb-3">
            <Link to={'/history'}>View patients history</Link>
          </div>
        </section>
        <section className="flex space-x-3">
          {/* symptoms card */}
          <div className="w-1/2">
            <SymptomsCard />
          </div>

          {/* diagnosis card */}
          <div className="w-1/2">
            <DiagnosisCard />
          </div>
        </section>
        <section className="mt-3">
          {/* drugs and test card */}
          <div className="w-full">
            <Paper sx={{ flexGrow: 1 }} className="p-3">
              <div className="flex justify-between">
                <h3 className="text-lg mb-3">Drugs and Tests</h3>
                <div className="flex flex-row space-x-2">
                  <DropdownSearch
                    btnText="Add drugs"
                    menuItems={drugsArr}
                    handleCheckboxChange={() => handleCheckboxChange(event, setChoice, choice)}
                  />
                  <DropdownSearch
                    btnText="Add tests"
                    menuItems={drugsArr}
                    handleCheckboxChange={() => handleCheckboxChange(event, setChoice, choice)}
                  />
                </div>
              </div>
              <ol>
                {choice.map((c, index) => {
                  return (
                    <>
                      <li key={index} className="flex flex-row justify-evenly mt-2 mb-2">
                        <span>{c}</span>
                        <input type="number" placeholder="No of drugs" />
                        <input type="number" placeholder="No of days" />
                        <input placeholder="more..." />
                        <span>total tablet</span>
                      </li>
                      <Divider orientation="horizontal" variant="fullWidth" />
                    </>
                  );
                })}
              </ol>
              <div clasName="flex flex-row space-x-2">
                <Button variant="text" endIcon={<Add />}>
                  Add Note
                </Button>
                <button className="border-none">
                  <DropdownButton btnText="send to" menuItems={drugsArr} />
                </button>
              </div>
            </Paper>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DrugsTestDiagnosis;

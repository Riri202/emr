import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import Avatar from '@mui/material/Avatar';
import { Person, Add } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import DropdownButton from '../../common-components/DropdownButton';

function DrugsTestDiagnosis() {
  const patientsInfo = JSON.parse(localStorage.getItem('patientsInfo/Biodata'));
  console.log(patientsInfo);
  const diagnosis = JSON.parse(localStorage.getItem('diagnosisRows'));
  const arr = diagnosis.map((d) => d.diagnosis);
  console.log(arr);

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
            <Paper sx={{ flexGrow: 1 }} className="p-3">
              <div className="flex justify-between">
                <h3 className="text-lg mb-3">Symptoms</h3>
                <div className="flex flex-col space-y-2">
                  <DropdownButton btnText="Add symptoms" menuItems={arr} />
                  <Button variant="text" endIcon={<Add />}>
                    Add Note
                  </Button>
                </div>
              </div>
              <ol>
                <li>dummmy text</li>
                <li>dummmy text</li>
                <li>dummmy text</li>
              </ol>
              <button className="border-none">
                <DropdownButton btnText="send to" menuItems={arr} />
              </button>
            </Paper>
          </div>

          {/* diagnosis card */}
          <div className="w-1/2">
            <Paper sx={{ flexGrow: 1 }} className="p-3">
              <div className="flex justify-between">
                <h3 className="text-lg mb-3">Diagnosis</h3>
                <div className="flex flex-col space-y-2">
                  <DropdownButton btnText="Add diagnosis" menuItems={arr} />
                  <Button variant="text" endIcon={<Add />}>
                    Add Note
                  </Button>
                </div>
              </div>
              <ol>
                <li>dummmy text</li>
                <li>dummmy text</li>
                <li>dummmy text</li>
              </ol>
              <button className="border-none">
                <DropdownButton btnText="send to" menuItems={arr} />
              </button>
            </Paper>
          </div>
        </section>
        <section className="mt-3">
          {/* drugs and test card */}
          <div className="w-full">
            <Paper sx={{ flexGrow: 1 }} className="p-3">
              <div className="flex justify-between">
                <h3 className="text-lg mb-3">Drugs and Tests</h3>
                <div className="flex flex-col space-y-2">
                  <DropdownButton btnText="Add drugs" menuItems={arr} />
                  <DropdownButton btnText="Add tests" menuItems={arr} />
                  <Button variant="text" endIcon={<Add />}>
                    Add Note
                  </Button>
                </div>
              </div>
              <ol>
                <li>dummmy text</li>
                <li>dummmy text</li>
                <li>dummmy text</li>
              </ol>
              <button className="border-none">
                <DropdownButton btnText="send to" menuItems={arr} />
              </button>
            </Paper>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DrugsTestDiagnosis;

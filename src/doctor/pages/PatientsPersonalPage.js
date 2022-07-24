import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../common-components/Nav';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Person, Add } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';

function PatientsPersonalPage() {
  let { patientId, name, sessionId } = useParams();
  const navigate = useNavigate();
  // TODO get patients biodata from backend instead, use the uuid or id from this page url for the api url
  const patientsInfo = JSON.parse(localStorage.getItem('patientsInfo/Biodata'));

  const handleClick = () => {
    // navigate(`/diagnosis-drugs-test/${id}/${name}`);
    navigate(`/prescription/${patientId}/${name}/${sessionId}`);
  };

  return (
    <div className="h-screen">
      <Nav />
      <div className="p-10">
        <section>
          <h1>PatientsPersonalPage</h1>
          <div className="flex space-x-3">
            <Avatar className="bg-orange-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <h2 className="text-lg mb-3">
              {patientId}: {name}
            </h2>
          </div>
        </section>
        <section className="flex space-x-6">
          <Paper className="p-5 flex-1">
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
          <div>
            <Button
              onClick={handleClick}
              startIcon={<Add />}
              className="p-3 mt-1 bg-green-500 text-[#000] ml-3">
              Add diagnosis and recommendations
            </Button>
            <Paper className="mt-8 p-6">
              <h3 className="text-lg mb-3">Patient History</h3>
              <ol>
                <li>Visited the hospital on: 02 Feb 2022</li>
                <li>Visited the hospital on: 05 Mar 2022</li>
                <li>Visited the hospital on: 14 Jun 2022</li>
              </ol>
            </Paper>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PatientsPersonalPage;

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

  const handlePrescritionClick = () => {
    // navigate(`/diagnosis-drugs-test/${id}/${name}`);
    navigate(`/prescription/${patientId}/${name}/${sessionId}`);
  };
  const handlePatientHistoryClick = () => {
    // navigate(`/diagnosis-drugs-test/${id}/${name}`);
    navigate(`/history-overview/${patientId}`);
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
              onClick={handlePrescritionClick}
              startIcon={<Add />}
              className="p-3 mt-1 bg-green-500 text-[#000] ml-3">
              Add diagnosis and recommendations
            </Button>
            <Button
              onClick={handlePatientHistoryClick}
              className="p-3 mt-1 bg-green-500 text-[#000] ml-3">
              Patients History
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PatientsPersonalPage;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import AdminNav from './admin/components/AdminNav';
import Login from './auth/Login';
import ReceptionistHome from './receptionist/pages/ReceptionistHome';
import DoctorHome from './doctor/pages/DoctorHome';
import PatientsPersonalPage from './doctor/pages/PatientsPersonalPage';
import DrugsTestDiagnosis from './doctor/pages/DrugsTestDiagnosis';
import PatientHistory from './doctor/pages/PatientHistory';
import HistoryOverview from './doctor/pages/HistoryOverview';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#48bb78'
      },
      secondary: {
        main: '#ffa500'
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-[#f6f7fa]">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<AdminNav />} />
            <Route path="/receptionist" element={<ReceptionistHome />} />
            <Route path="/doctor" element={<DoctorHome />} />
            <Route path="/patient/:id/:name" element={<PatientsPersonalPage />} />
            <Route path="/diagnosis-drugs-test" element={<DrugsTestDiagnosis />} />
            <Route path="/history-overview" element={<HistoryOverview />} />
            <Route path="/history" element={<PatientHistory />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

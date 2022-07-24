import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminNav from './admin/components/AdminNav';
import Login from './auth/Login';
import ReceptionistHome from './receptionist/pages/ReceptionistHome';
import DoctorHome from './doctor/pages/DoctorHome';
import PatientsPersonalPage from './doctor/pages/PatientsPersonalPage';
import DrugsTestDiagnosis from './doctor/pages/DrugsTestDiagnosis';
import PatientHistory from './doctor/pages/PatientHistory';
import HistoryOverview from './doctor/pages/HistoryOverview';
import CashierHome from './cashier/pages/CashierHome';
import PatientInvoice from './cashier/pages/PatientInvoice';
import PharmacistHome from './pharmacist/pages/PharmacistHome';
import PharmacistInvoice from './pharmacist/pages/PharmacistInvoice';
import LabHome from './lab/pages/LabHome';
import XrayHome from './x-ray/pages/XrayHome';
import LabResults from './lab/pages/LabResults';
import XrayResults from './x-ray/pages/XrayResults';

function App() {
  return (
    <div className="bg-[#f6f7fa]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<AdminNav />} />

          {/* receptionist route */}
          <Route path="/receptionist" element={<ReceptionistHome />} />

          {/* doctor routes */}
          <Route path="/doctor" element={<DoctorHome />} />
          <Route path="/patient/:patientId/:name/:sessionId" element={<PatientsPersonalPage />} />
          <Route
            path="/prescription/:patientId/:name/:sessionId"
            // path="/prescription"
            element={<DrugsTestDiagnosis />}
          />
          <Route path="/history-overview" element={<HistoryOverview />} />
          <Route path="/history" element={<PatientHistory />} />

          {/* cashier route */}
          <Route path="/cashier" element={<CashierHome />} />
          <Route path="/patient-invoice" element={<PatientInvoice />} />

          {/* pharmacist routes */}
          <Route path="/pharmacist" element={<PharmacistHome />} />
          <Route path="/approved-invoice" element={<PharmacistInvoice />} />

          {/* lab routes */}
          <Route path="/lab" element={<LabHome />} />
          <Route path="/lab-results" element={<LabResults />} />

          {/* x-ray routes */}
          <Route path="/xray" element={<XrayHome />} />
          <Route path="/xray-results" element={<XrayResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import AdminNav from './admin/components/AdminNav';
import Login from './auth/Login';
import ReceptionistHome from './receptionist/pages/ReceptionistHome';
import DoctorHome from './doctor/pages/DoctorHome';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1fff71'
      },
      secondary: {
        main: '#ffa500'
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<AdminNav />} />
            <Route path="/receptionist" element={<ReceptionistHome />} />
            <Route path="/doctor" element={<DoctorHome />} />
          </Routes>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;

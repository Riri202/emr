import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Nav from './admin/components/Nav';
import Login from './Login';

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
            <Route path="/*" element={<Nav />} />
          </Routes>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;

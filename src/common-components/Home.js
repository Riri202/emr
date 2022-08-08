import { Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleNavigation = (index) => {
    if (index === 0) {
      navigate('/admin//*');
    }
    if (index === 1) {
      navigate('/receptionist');
    }
    if (index === 2) {
      navigate(`/doctor`);
    }
    if (index === 3) {
      navigate(`/cashier`);
    }
    if (index === 4) {
      navigate(`/pharmacist`);
    }
    if (index === 5) {
      navigate(`/lab`);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper component={Button} onClick={() => handleNavigation(0)}>
            Admin
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper component={Button} onClick={() => handleNavigation(1)}>
            receptionist
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper component={Button} onClick={() => handleNavigation(2)}>
            Doctor
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper component={Button} onClick={() => handleNavigation(3)}>
            cashier
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper component={Button} onClick={() => handleNavigation(4)}>
            pharmacist
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper component={Button} onClick={() => handleNavigation(5)}>
            lab
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

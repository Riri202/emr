import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AccountMenu from './AccountMenu';
// import BackButton from './BackButton';

function Nav() {
  return (
    <div>
      <AppBar position="sticky" style={{ background: 'rgb(34 197 94)' }}>
        <Toolbar>
          {/* <BackButton /> */}
          <Typography sx={{ flexGrow: 1 }} color="#fff" variant="h6" noWrap component="div">
            EMR
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;

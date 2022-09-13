import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AccountMenu from './AccountMenu';

function Nav() {
  return (
    <div>
      <AppBar position="sticky" style={{ background: 'rgb(34 197 94)' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            EMR
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;

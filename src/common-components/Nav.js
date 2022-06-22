import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Person } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';

function Nav() {
  return (
    <div>
      <AppBar position="sticky" style={{ background: '#48bb78' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            EMR
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar className="bg-green-500 mt-1" variant="circular">
            <Person />
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;

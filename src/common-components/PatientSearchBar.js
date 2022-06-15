/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

function PatientSearchBar({ setSearchQuery, setIsSearching }) {
  return (
    <div>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          id="search-bar"
          className="text"
          onChange={(e) => {
            setIsSearching(true);
            setSearchQuery(e.target.value);
          }}
          label="Find a patient"
          variant="outlined"
          placeholder="Search..."
        />
        {/* <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: 'blue' }} />
        </IconButton> */}
      </Box>
    </div>
  );
}

export default PatientSearchBar;

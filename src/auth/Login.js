import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/receptionist');
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="mb-3">Login</h2>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Username"
          sx={{ mb: 2 }}
        />
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Password"
          sx={{ mb: 2 }}
        />
        <Button type="submit" onClick={handleClick} className="p-3 mt-1 bg-green-500 text-[#000]">
          Login
        </Button>
      </Box>
    </div>
  );
}

export default Login;

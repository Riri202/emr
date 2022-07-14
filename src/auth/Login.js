import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { login, reset } from '../redux/features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { username, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if ((isSuccess || user) && user.user.role === 'ADMIN') {
      alert('succeessful login');
      navigate('/admin');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = { username, password };

    console.log(loginData);

    dispatch(login(loginData));
  };
  return (
    <div className="flex flex-col mx-auto items-center h-screen">
      <h1 className="mb-3">Login</h1>
      <Box
        onSubmit={handleLogin}
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          required
          id="filled-required"
          label="Required"
          name="username"
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <TextField
          required
          id="filled-required"
          label="Required"
          name="password"
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <Box sx={{ position: 'relative' }}>
          <Button disabled={isLoading} type="submit" className="p-3 mt-1 bg-green-500 text-[#000]">
            Login
          </Button>
          {isLoading && (
            <CircularProgress
              color="success"
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 1,
                marginTop: '-12px',
                marginLeft: '-12px'
              }}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Login;

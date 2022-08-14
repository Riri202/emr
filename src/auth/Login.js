import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { login, reset } from '../redux/features/auth/authSlice';
import { ADMIN_USER_ROLE } from '../utils/constants';
import useForm from '../utils/formValidations/useForm';

function Login() {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: ''
  // });
  const dispatch = useDispatch();

  const { user, isSuccess, isLoading, isError, message } = useSelector((state) => state.auth);

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    dispatch(reset());
  }, [isError, message, user, isSuccess, dispatch]);

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value
  //   }));
  // };
  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = { username, password };
    console.log(loginData);
    dispatch(login(loginData));

    if (isError) {
      alert(message);
    } else if (isSuccess) {
      window.location.reload();
    }
    dispatch(reset());
  };
  const { handleChange, values, errors, handleSubmit } = useForm(handleLogin);

  const { username, password } = values;

  return user && user.role === ADMIN_USER_ROLE ? (
    <Navigate to={`/admin//*`} />
  ) : user ? (
    <Navigate to={`/${loggedInUser.user.role.toLowerCase()}`} />
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-3/5">
        <h1 className="mb-3">Login</h1>
        <Box
          fullWidth
          onSubmit={handleSubmit}
          component="form"
          sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            fullWidth
            id="filled-username"
            label="Username"
            name="username"
            onChange={handleChange}
            error={errors.username}
            helperText={errors.username}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="filled-password"
            label="Password"
            name="password"
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password}
            sx={{ mb: 2 }}
          />
          <Box sx={{ position: 'relative' }} fullWidth>
            <Button
              disabled={isLoading}
              variant="contained"
              type="submit"
              className="p-3 w-full mt-1 bg-green-500 text-[#000]">
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
    </div>
  );
}

export default Login;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getSingleStaff, updateStaffStatus } from '../utils/api';
import setAuthToken from '../utils/setAuthToken';
import './../styles/SwitchButton.css';

function SwitchButton({ id, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [staffStatus, setStaffStatus] = useState(null);

  const getStaffStatus = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const uuid = id;
      const { data } = await getSingleStaff(uuid);
      setIsLoading(false);

      if (data) {
        setStaffStatus(data.status);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error('an error occured');
    }
  };

  const handleChange = async (event) => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const uuid = id;
      const status = event.target.checked ? 'TRUE' : 'FALSE';
      const { data } = await updateStaffStatus(uuid, status);
      toast.success(data.message);
      getStaffStatus();
    } catch (error) {
      console.log(error);
      toast.error('an error occured while switching');
    }
  };

  useEffect(() => {
    getStaffStatus();
  }, []);
  return (
    <div className="flex justify-center">
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <label className="toggle">
          <input
            onChange={handleChange}
            className="toggle-checkbox"
            checked={staffStatus}
            type="checkbox"
          />
          <div className="toggle-switch"></div>
        </label>
      )}
    </div>
  );
}

export default SwitchButton;

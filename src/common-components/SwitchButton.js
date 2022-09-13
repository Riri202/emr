/* eslint-disable react/prop-types */
import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getSingleStaff, updateStaffStatus } from '../utils/api';
import { useAdminLoginPermission } from '../utils/hooks';
import setAuthToken from '../utils/setAuthToken';
import './../styles/SwitchButton.css';
import { allowed, notAllowed } from '../redux/features/others/admin/adminPermissionSlice';

function SwitchButton({ id, user }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const isPermitted = useAdminLoginPermission();
  // eslint-disable-next-line no-unused-vars
  const [isAllowed, setIsAllowed] = useState(isPermitted);
  console.log('first', { isPermitted, isAllowed });

  const getStatus = (value) => {
    if (value === true) {
      return 'TRUE';
    } else {
      return 'FALSE';
    }
  };
  const getStaffStatus = async () => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const uuid = id;
      const { data } = await getSingleStaff(uuid);
      if (data) {
        localStorage.setItem('isAdminLoginPermitted', JSON.stringify(data.status));
        console.log(data.status);
      }
    } catch (error) {
      toast.error('an error occured');
    }
  };

  const handleChange = async (event) => {
    setIsLoading(true);
    setIsAllowed(event.target.checked);
    console.log(event.target.checked, 'checkedTarget');
    if (isAllowed) {
      dispatch(allowed());
    } else {
      dispatch(notAllowed());
    }
    console.log('second', { isPermitted, isAllowed });

    if (user) {
      setAuthToken(user.token);
    }
    try {
      const uuid = id;
      const status = getStatus(isAllowed);
      const { data } = await updateStaffStatus(uuid, status);
      setIsLoading(false);
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error('an error occured while switching');
    }
  };

  useEffect(() => {
    getStaffStatus();
  }, [isAllowed]);
  return (
    <div className="flex justify-center">
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <label className="toggle">
          <input
            onChange={handleChange}
            className="toggle-checkbox"
            checked={isAllowed}
            type="checkbox"
          />
          <div className="toggle-switch"></div>
        </label>
      )}
    </div>
  );
}

export default SwitchButton;

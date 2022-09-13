import { useSelector } from 'react-redux';

export const useCurrentUser = () => {
  return useSelector((state) => state.auth.user);
};

export const useAdminLoginPermission = () => {
  return useSelector((state) => state.adminLoginPermission.isPermitted);
};

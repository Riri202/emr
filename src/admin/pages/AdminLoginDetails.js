import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { Edit, Delete } from '@mui/icons-material';
// import IconButton from '@mui/material/IconButton';
import setAuthToken from '../../utils/setAuthToken';
import { getAllStaff } from '../../utils/api';
import { CircularProgress } from '@material-ui/core';
import { useCurrentUser } from '../../utils/hooks';
import SwitchButton from '../../common-components/SwitchButton';
// import InputDetailsForm from '../components/InputDetailsForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['Name', 'Username', 'Role', 'Access'];

function AdminLoginDetails() {
  const user = useCurrentUser();

  const classes = useStyles();
  const [adminList, setAdminList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAdmins = (allStaff) => {
    const allAdmins = allStaff.rows.filter((staff) => staff.role === 'ADMIN');
    setAdminList([...allAdmins]);
  };

  const getAllAdmins = async () => {
    setIsLoading(true);
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllStaff(page, size);
      setIsLoading(false);
      if (data) {
        getAdmins(data);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('an error occured');
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);
  return (
    <>
      <h2 className="text-lg mb-3">EMR Admins</h2>
      <div>{isLoading ? <CircularProgress size={30} /> : null}</div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, key) => {
                return (
                  <TableCell key={key} align="center" className="bg-green-500">
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && !adminList.length ? (
              <tr>
                <td className="text-lg pl-3 mb-3 text-red-500">
                  Admin list is empty. Add new admin in worker login details page.
                </td>
              </tr>
            ) : (
              adminList.map((row, key) => (
                <TableRow key={key}>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">
                    <SwitchButton id={row.uuid} user={user} />
                  </TableCell>
                  {/* <TableCell align="center">
                    <IconButton className="outline-none">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default AdminLoginDetails;

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { Edit, Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import setAuthToken from '../../utils/setAuthToken';
import { getAllStaff } from '../../utils/api';
// import InputDetailsForm from '../components/InputDetailsForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
const user = JSON.parse(localStorage.getItem('user'));

const headers = ['Name', 'Username', 'Role', 'Access', 'Edit', 'Delete'];

function AdminLoginDetails() {
  const classes = useStyles();
  const [adminList, setAdminList] = useState([]);

  const getAdmins = (allStaff) => {
    const allAdmins = allStaff.rows.filter((staff) => staff.role === 'ADMIN');
    setAdminList([...allAdmins]);
    console.log(adminList);
  };

  const getAllAdmins = async () => {
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllStaff(page, size);
      if (data) {
        getAdmins(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);
  // const formInputDetails = [
  //   {
  //     name: 'fullName',
  //     id: 'fullname',
  //     label: 'Name'
  //   },
  //   {
  //     name: 'username',
  //     id: 'username',
  //     label: 'Username'
  //   },
  //   {
  //     name: 'password',
  //     id: 'password',
  //     label: 'Password'
  //   }
  // ];
  return (
    <>
      <h2 className="text-lg mb-3">EMR Admins</h2>
      {/* <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        // isLoading={isAddingStaff}
        formDetails={formInputDetails}
        btnText="Add new admin"
      /> */}
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
            {!adminList.length ? (
              <p className="text-lg mb-3 text-red-500">
                Admin list is empty. Add new admiin in worker login details page.
              </p>
            ) : (
              adminList.map((row, key) => (
                <TableRow key={key}>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">
                    <Switch defaultChecked />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton className="outline-none">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
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

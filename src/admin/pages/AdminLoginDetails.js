// /* eslint-disable no-unused-vars */
// /* eslint-disable react/display-name */
// import React, { forwardRef, useState } from 'react';
// // eslint-disable-next-line no-unused-vars
// import MaterialTable, { Column } from '@material-table/core';
// import {
//   AddBox,
//   ArrowUpward,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Clear,
//   DeleteOutline,
//   Edit,
//   FilterList,
//   FirstPage,
//   LastPage,
//   Remove,
//   SaveAlt,
//   Search,
//   ViewColumn
// } from '@mui/icons-material';

// const lookup = { true: 'Available', false: 'Unavailable' };

// const columns = [
//   { title: 'First Name', field: 'firstName' },
//   { title: 'Last Name', field: 'lastName' },
//   { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//   { title: 'Availablity', field: 'availability', lookup }
// ];
// const EDITABLE_DATA = [
//   { id: 'hos-1', firstName: 'Tod', lastName: 'Miles' },
//   { id: 'hos-2', firstName: 'Jess', lastName: 'Smith' }
// ];

// // Helper function
// function getNewDataBulkEdit(changes, copyData) {
//   // key matches the column data id
//   const keys = Object.keys(changes);
//   for (let i = 0; i < keys.length; i++) {
//     if (changes[keys[i]] && changes[keys[i]].newData) {
//       // Find the data item with the same key in copyData[]
//       let targetData = copyData.find((el) => el.id === keys[i]);
//       if (targetData) {
//         let newTargetDataIndex = copyData.indexOf(targetData);
//         copyData[newTargetDataIndex] = changes[keys[i]].newData;
//       }
//     }
//   }
//   return copyData;
// }
// const TABLE_ICONS = {
//   // tableIcons
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
// };
// const options = {
//   rowStyle: (rowData) => {
//     return {
//       backgroundColor: '#76ba1b'
//     };
//   }
// };

// function AdminLoginDetails() {
//   const [data, setData] = useState(EDITABLE_DATA);

//   return (
//     <div>
//       <h2 className="text-lg mb-3">Admin Login Details</h2>
//       <MaterialTable
//         icons={TABLE_ICONS}
//         data={data}
//         columns={columns}
//         options={options}
//         editable={{
//           onBulkUpdate: (changes) => {
//             // eslint-disable-next-line no-unused-vars
//             return new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 let copyData = [...data];
//                 setData(getNewDataBulkEdit(changes, copyData));
//                 resolve();
//               }, 1000);
//             });
//           },
//           onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
//           onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),
//           onRowAdd: (newData) => {
//             // eslint-disable-next-line no-unused-vars
//             return new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 newData.id = 'hos-' + Math.random() * 10000000;
//                 setData([...data, newData]);
//                 resolve();
//               }, 1000);
//             });
//           },
//           onRowUpdate: (newData, oldData) => {
//             // eslint-disable-next-line no-unused-vars
//             return new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 const dataUpdate = [...data];
//                 // In dataUpdate, find target
//                 const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
//                 const index = dataUpdate.indexOf(target);
//                 dataUpdate[index] = newData;
//                 setData([...dataUpdate]);
//                 resolve();
//               }, 1000);
//             });
//           },
//           onRowDelete: (oldData) => {
//             // eslint-disable-next-line no-unused-vars
//             return new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 const dataDelete = [...data];
//                 const target = dataDelete.find((el) => el.id === oldData.tableData.id);
//                 const index = dataDelete.indexOf(target);
//                 dataDelete.splice(index, 1);
//                 setData([...dataDelete]);
//                 resolve();
//               }, 1000);
//             });
//           }
//         }}
//       />
//     </div>
//   );
// }

// export default AdminLoginDetails;

import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@material-ui/core/Switch';
import { Edit, Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['name', 'username', 'password', 'access', 'edit', 'delete'];

function AdminLoginDetails() {
  const classes = useStyles();
  const [rows, setRows] = useState([
    { id: 1, fullName: 'Snow', username: 'Jon', password: 35 },
    { id: 2, fullName: 'Lannister', username: 'Cersei', password: 42 },
    { id: 3, fullName: 'Lannister', username: 'Jaime', password: 45 },
    { id: 4, fullName: 'Stark', username: 'Arya', password: 16 },
    { id: 5, fullName: 'Targaryen', username: 'Daenerys', password: null },
    { id: 6, fullName: 'Melisandre', username: 'null', password: 150 },
    { id: 7, fullName: 'Clifford', username: 'Ferrara', password: 44 },
    { id: 8, fullName: 'Frances', username: 'Rossini', password: 36 },
    { id: 9, fullName: 'Roxie', username: 'Harvey', password: 65 }
  ]);
  const [inputData, setInputData] = useState({
    fullName: '',
    username: '',
    password: ''
  });
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleRowDelete = (id) => {
    const filteredRows = rows.filter((row) => row.id !== id);
    setRows(filteredRows);
  };
  const handleCsvChange = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // console.log(results.data);
        if (rows.length === 0) {
          rows.push(...results.data);
          console.log(rows);
        } else if (rows.length > 0) {
          rows.push(...results.data);
          console.log(rows);
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const staffFormData = new FormData();
    staffFormData.append('fullName', inputData.fullName);
    staffFormData.append('username', inputData.username);
    staffFormData.append('password', inputData.password);

    try {
      const response = await axios({
        method: 'post',
        url: 'https://emr-server.herokuapp.com/staff',
        data: staffFormData
      }).then((response) => {
        console.log(response);
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    if (rows.length > 0) {
      setRows([...rows, inputData]);
    }
    if (rows.length === 0) {
      setRows([inputData]);
    }
  };

  return (
    <>
      <h2 className="text-lg mb-3">Admin Login Details</h2>
      <Box component={Paper} sx={{ mb: 4, padding: 2, display: 'flex', spacing: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="name"
            name="fullName"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="username"
            name="username"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <TextField
            label="password"
            name="password"
            onChange={handleChange}
            variant="standard"
            sx={{ mr: 3 }}></TextField>
          <Button type="submit" variant="contained">
            Add new admin
          </Button>
        </form>
        <Divider orientation="vertical" variant="middle" flexItem />
        <form>
          <input type={'file'} accept={'.csv'} onChange={handleCsvChange} />
        </form>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, key) => {
                return (
                  <TableCell key={key} align="right" className="bg-green-500">
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right">
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="right">
                  <IconButton className="outline-none">
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleRowDelete(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default AdminLoginDetails;

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import setAuthToken from '../../utils/setAuthToken';
import { addNewInventory, getAllInventoryItems } from '../../utils/api';
import EditInventoryForm from '../components/EditInventoryForm';
import DeleteDialog from '../components/DeleteDialog';
import InputDetailsForm from '../components/InputDetailsForm';
import useForm from '../../utils/formValidations/useForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['No', 'Name', 'Quantity', 'Unit Price (#)', 'Edit', 'Delete'];
const user = JSON.parse(localStorage.getItem('user'));

function Inventory() {
  const classes = useStyles();
  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'Panadol',
      quantity: 3,
      price: 35,
      type: 'DRUG'
    },
    {
      id: 2,
      name: 'Ampiclox',
      quantity: 3,
      price: 13,
      type: 'DRUG'
    },
    {
      id: 3,
      name: 'Sphygomanometer',
      quantity: 6,
      price: 45,
      type: 'TEST'
    }
  ]);
  // const [inputData, setInputData] = useState({
  //   name: '',
  //   quantity: '',
  //   price: '',
  //   type: ''
  // });
  // const { name, quantity, price, type } = inputData;
  // const handleChange = (e) => {
  //   setInputData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value
  //   }));
  // };

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

  const addInventory = async (e) => {
    e.preventDefault();
    setIsAddingInventory(true);
    const inventoryFormData = { name, quantity, price, type };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await addNewInventory(inventoryFormData);
      setIsAddingInventory(false);
      if (rows.length > 0) {
        setRows([...rows, data]);
      }
      if (rows.length === 0) {
        setRows([data]);
      }
    } catch (error) {
      console.log(error);
      setIsAddingInventory(false);
    }
  };

  const getInventory = async () => {
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllInventoryItems(page, size);
      if (data) {
        // const drugs = data.rows.filter((item) => item.type === 'DRUG');
        setInventoryList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInventory();
  }, []);

  const { handleChange, values, errors, handleSubmit } = useForm(addInventory);

  const { name, quantity, price, type } = values;

  const formInputDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Name'
    },
    {
      name: 'quantity',
      id: 'quantity',
      label: 'Quantity'
    },
    {
      name: 'price',
      id: 'price',
      label: 'Unit Price'
    },
    {
      name: 'type',
      id: 'type',
      label: 'DRUG or TEST'
    }
  ];
  return (
    <div>
      <h2 className="text-lg mb-3">Inventory</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingInventory}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add to inventory"
      />
      <TableContainer component={Paper}>
        <h2 className="text-lg mb-3 pl-3">Drugs</h2>
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
            {!inventoryList.length ? (
              <p className="text-lg mb-3 pl-3 text-red-500">
                Drugs list is empty. Enter details above to add to list
              </p>
            ) : (
              inventoryList &&
              inventoryList.rows
                .filter((row) => row.type === 'DRUG')
                .map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">
                      <EditInventoryForm selectedItem={row} setRows={setRows} rows={rows} />
                    </TableCell>
                    <TableCell align="center">
                      <DeleteDialog id={row.id} setRows={setRows} rows={rows} role="staff" />
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} style={{ marginTop: 5 }}>
        <h2 className="text-lg mb-3 pl-3">Tests</h2>
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
            {!inventoryList.length ? (
              <p className="text-lg mb-3 pl-3 text-red-500">
                Tests list is empty. Enter details above to add to list
              </p>
            ) : (
              inventoryList &&
              inventoryList.rows
                .filter((row) => row.type === 'TEST')
                .map((row, index) => (
                  <TableRow key={row.title}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">
                      <EditInventoryForm selectedItem={row} setRows={setRows} rows={rows} />
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
    </div>
  );
}

export default Inventory;

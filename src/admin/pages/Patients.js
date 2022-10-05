/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { Edit, Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputDetailsForm from '../components/InputDetailsForm';
import { MenuItem } from '@mui/material';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import { useCurrentUser } from '../../utils/hooks';
import setAuthToken from '../../utils/setAuthToken';
import { addPatientBiodata, getPatientBiodata } from '../../utils/api';
import useForm from '../../utils/formValidations/useForm';

function PatientDetails() {
  const { id, name } = useParams();
  const user = useCurrentUser();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});

  const addBiodata = async () => {
    setIsAdding(true);
    const biodata = { age, sex, address, genotype, bloodGroup };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await addPatientBiodata(biodata);
      setIsAdding(false);
      getBiodata();
      toast.success('Item added successfully');
    } catch (error) {
      setIsAdding(false);
      toast.error(error.message);
    }
  };
  // isEditing = Object.keys(data).length !== 0 or data !== {}... data is where response from GET patient biodata endpoint so if it's null then no biodata for patient so it can't be an editing.

  const getBiodata = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getPatientBiodata(id);
      setIsLoading(false);
      console.log(data)
      setInfo(data)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      // toast.error('an error occured');
    }
  };

  useEffect(() => {
    getBiodata();
  }, [])
  
  function onSubmit() {
    return isEditing ? UpdateBiodata() : addBiodata();
  }
  const { handleChange, values, handleSubmit } = useForm(addBiodata);

  const { age, sex, address, genotype, bloodGroup } = values;

  const formInputDetails = [
    {
      name: 'age',
      id: 'age',
      label: 'Age',
      isSelectInput: false,
      options: []
    },
    {
      name: 'sex',
      id: 'sex',
      label: 'Sex',
      isSelectInput: true,
      options: [
        {
          title: 'M',
          value: 'M'
        },
        {
          title: 'F',
          value: 'F'
        }
      ]
    },
    {
      name: 'address',
      id: 'address',
      label: 'Address',
      isSelectInput: false,
      options: []
    },
    {
      name: 'genotype',
      id: 'genotype',
      label: 'Genotype',
      isSelectInput: true,
      options: [
        {
          title: 'AA',
          value: 'AA'
        },
        {
          title: 'AS',
          value: 'AS'
        },
        {
          title: 'AC',
          value: 'AC'
        },
        {
          title: 'SS',
          value: 'SS'
        },
        {
          title: 'SC',
          value: 'SC'
        }
      ]
    },
    {
      name: 'bloodGroup',
      id: 'bloodGroup',
      label: 'Blood Group',
      isSelectInput: true,
      options: [
        {
          title: 'A+',
          value: 'A+'
        },
        {
          title: 'A-',
          value: 'A-'
        },
        {
          title: 'B+',
          value: 'B+'
        },
        {
          title: 'B-',
          value: 'B-'
        },
        {
          title: 'O+',
          value: 'O+'
        },
        {
          title: 'O-',
          value: 'O-'
        },
        {
          title: 'AB+',
          value: 'AB+'
        },
        {
          title: 'AB-',
          value: 'AB-'
        }
      ]
    }
  ];
  return (
    <div className="p-6">
      <p className="text-xl font-bold mb-3">Patient Biodata Details</p>
      <p className="text-lg mb-1">Patient ID: {id}</p>
      <p className="text-lg mb-3">Patient Name: {name}</p>
      <Paper style={{ padding: 35 }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {formInputDetails.map((detail) => {
              const { name, id, label, isSelectInput, options } = detail;
              return (
                <div key={id} className="col-span-1">
                  {isSelectInput ? (
                    <TextField
                      fullWidth
                      select
                      options={options}
                      label={label}
                      name={name}
                      defaultValue=""
                      onChange={handleChange}
                      variant="outlined"
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      onChange={handleChange}
                      label={label}
                      name={name}
                      variant="outlined"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex mt-6 flex-1 flex-row justify-end">
            <div className="w-1/4">
              <IntuitiveButton text="Submit" />
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
}
export default PatientDetails;

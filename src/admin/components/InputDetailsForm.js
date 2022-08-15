/* eslint-disable react/prop-types */
import { Box, TextField, Divider, Paper } from '@material-ui/core';
import React from 'react';
import { FaFileCsv } from 'react-icons/fa';
import IntuitiveButton from '../../common-components/IntuitiveButton';

function InputDetailsForm({
  onSubmit,
  onChange,
  handleCsvChange,
  isLoading,
  formDetails,
  btnText,
  isDateRequired,
  errors
}) {
  return (
    <div>
      <Box
        component={Paper}
        style={{
          marginBottom: '16px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          spacing: 2
        }}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-row justify-center space-x-4">
            {formDetails.map((detail, key) => {
              return (
                <TextField
                  key={key}
                  name={detail.name}
                  label={detail.label}
                  variant="standard"
                  onChange={onChange}
                  id={detail.id}
                  error={errors[`${detail.name}`] ? true : false}
                  helperText={errors[`${detail.name}`]}
                  sx={{ mr: 3 }}
                />
              );
            })}
            {isDateRequired ? (
              <input name="dob" type="date" id="dob" onChange={onChange} className="p-3" />
            ) : null}
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <div className="w-1/2">
              <IntuitiveButton text={btnText} isLoading={isLoading} />
            </div>
          </div>
        </form>
        <Divider className="mt-2 mb-2" orientation="horizontal" variant="fullWidth" />
        <form className="flex flex-row mt-2 justify-center">
          <div className="p-3 bg-green-500 rounded-md cursor-pointer">
            <label htmlFor="csvFile" className="cursor-pointer">
              Import a csv files <FaFileCsv className="text-[30px] mb-[-5px]" />
              <input
                type={'file'}
                id="csvFile"
                accept={'.csv'}
                onChange={handleCsvChange}
                className="hidden cursor-pointer"
              />
            </label>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default InputDetailsForm;

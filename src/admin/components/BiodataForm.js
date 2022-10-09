/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import IntuitiveButton from '../../common-components/IntuitiveButton';

function BiodataForm({ handleSubmit, formInputDetails, handleChange }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {formInputDetails.map((detail) => {
            const { name, id, label, isSelectInput, options, defaultValue } = detail;
            return (
              <div key={id} className="col-span-1">
                {isSelectInput ? (
                  <>
                    <TextField
                      required
                      fullWidth
                      defaultValue={options[0].value}
                      onChange={handleChange}
                      select
                      options={options}
                      label={label}
                      name={name}
                      id={name}
                      type="text"
                      variant="outlined">
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                ) : (
                  <>
                    <TextField
                      required
                      fullWidth
                      defaultValue={defaultValue}
                      onChange={handleChange}
                      label={label}
                      name={name}
                      id={name}
                      type="text"
                      variant="outlined"
                    />
                  </>
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
    </div>
  );
}

export default BiodataForm;

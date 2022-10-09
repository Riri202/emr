/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import IntuitiveButton from '../../common-components/IntuitiveButton';

function EditBiodataForm({ formInputDetails, info, handleNotEditing, isEditing, handleIsEditing }) {
  const handleSubmit = () => {
    console.log('here');
  };

  const handleChange = () => {
    console.log('here');
  };
  return (
    <>
      <Button className="mb-4" onClick={handleIsEditing} variant="outlined">
        Edit
      </Button>
      <div>
        <Dialog open={isEditing} onClose={handleNotEditing} fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Edit patient biodata</DialogTitle>
            <DialogContent>
              <div className="flex flex-col p-5 space-y-4">
                {formInputDetails.map((detail) => {
                  const { name, id, label, isSelectInput, options } = detail;
                  return (
                    <div key={id} className="">
                      {isSelectInput ? (
                        <>
                          <TextField
                            required
                            fullWidth
                            defaultValue={info[name]}
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
                            defaultValue={info[name]}
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
                <div className="w-full">
                  <IntuitiveButton text="Edit" />
                </div>
              </div>
              <DialogActions>
                <div className="flex mt-6 flex-1 flex-row space-x-3 justify-end">
                  <div className="w-1/4">
                    <Button
                      onClick={handleNotEditing}
                      variant="contained"
                      style={{
                        width: '100%',
                        padding: 12,
                        backgroundColor: '#888888',
                        color: '#000',
                        justifySelf: 'self-end'
                      }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogActions>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default EditBiodataForm;

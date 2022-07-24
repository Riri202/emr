/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import IntuitiveButton from '../../common-components/IntuitiveButton';

function EditForm({
  open,
  handleClickOpen,
  handleClose,
  onSubmit,
  handleChange,
  formDetails,
  isLoading,
  titleText,
  btnText
}) {
  return (
    <>
      <IconButton className="outline-none" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={onSubmit} className="w-full">
          <DialogTitle>Edit {titleText}</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit details below</DialogContentText>
            <div className="flex flex-col space-y-2">
              {formDetails.map((detail, key) => {
                return (
                  <TextField
                    key={key}
                    name={detail.name}
                    id={detail.id}
                    label={detail.label}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    defaultValue={detail.defaultValue}
                  />
                );
              })}
              <div className="w-full">
                <IntuitiveButton text={`Edit ${btnText}`} isLoading={isLoading} />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className="pt-2 pb-2 pl-4 pr-4 mt-1 bg-green-500 text-[#000] self-end">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EditForm;

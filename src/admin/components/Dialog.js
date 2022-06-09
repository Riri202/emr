/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';

export default function FormDialog({ id, rows, setRows }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRowDelete = (id, rows) => {
    const filteredRows = rows.filter((row) => row.id !== id);
    setRows(filteredRows);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Enter patient biodata
      </Button> */}
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Box sx={{ display: 'flex' }}>
            <Button
              sx={{ mr: 3 }}
              onClick={handleClose}
              color="primary"
              variant="outlined"
              className="p-3 mt-1 bg-green-500 text-[#000]">
              No
            </Button>
            <Button
              onClick={() => handleRowDelete(id, rows)}
              color="primary"
              variant="contained"
              className="p-3 mt-1 bg-green-500 text-[#000]">
              Yes
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}

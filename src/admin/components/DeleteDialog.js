/* eslint-disable react/prop-types */
import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import authHeader from '../../redux/features/auth/authHeader';

export default function DeleteDialog({ id, rows, setRows, role }) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteStaff = (id, rows) => {
    const filteredRows = rows.filter((row) => row.uuid !== id);
    setRows(filteredRows);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const uuid = id;
    console.log(uuid);
    const staffFormData = { uuid };

    try {
      const response = await axios({
        method: 'delete',
        url: `https://emr-server.herokuapp.com/${role}/${uuid}`,
        params: staffFormData,
        headers: authHeader()
      }).then((response) => {
        console.log(response);
        deleteStaff(uuid, rows);
        setIsLoading(false);
      });
      // TODO maybe return response or find out something else you can do with it
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form className="w-full" onSubmit={handleDelete}>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button
                sx={{ mr: 3 }}
                onClick={handleClose}
                variant="outlined"
                className="w-1/2 p-3 mt-1 bg-green-500 text-[#000]">
                No
              </Button>
              <div className="w-1/2">
                <IntuitiveButton text="Yes" isLoading={isLoading} />
              </div>
              {/* <Button
                onClick={() => handleRowDelete(id, rows)}
                color="primary"
                variant="outlined"
                className="w-1/2 p-3 mt-1 bg-green-500 text-[#000]">
                Yes
              </Button> */}
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
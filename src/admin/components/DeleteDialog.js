/* eslint-disable react/prop-types */
import * as React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
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
  const deletedItem = (id, rows) => {
    if (role === 'patient' || role === 'staff') {
      const filteredRows = rows.filter((row) => row.uuid !== id);
      setRows(filteredRows);
    } else if (role === 'inventory') {
      const filteredRows = rows.filter((row) => row.id !== id);
      setRows(filteredRows);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios({
        method: 'delete',
        url: `https://emr-server.herokuapp.com/${role}/${id}`,
        headers: authHeader()
      }).then((response) => {
        deletedItem(id, rows);
        setIsLoading(false);
        setOpen(false);
        toast.success(response.data.message);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
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
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import { KeyboardArrowDown } from '@mui/icons-material';

export default function DropdownButton({ btnText, menuItems, handleCheckboxChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="primary"
        endIcon={<KeyboardArrowDown />}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        {btnText}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        {menuItems.map((item, index) => {
          // change to menuItems.name to get names of doctors
          return (
            <MenuItem key={index}>
              <Checkbox value={item} onChange={() => handleCheckboxChange} />
              <ListItemText primary={item} />
              {/* {item} */}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

/* eslint-disable react/prop-types */
import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
// import ListItemText from '@mui/material/ListItemText';

// import { KeyboardArrowDown } from '@mui/icons-material';

export default function DropdownButton({ menuItems, onChange, choice }) {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div>
      {/* <Button
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
          return (
            <MenuItem key={index}>
              <Checkbox value={item} id={item} checked={checked} onChange={handleCheckboxChange} />
              <ListItemText primary={item} />
              {/* {item} */}
      {/* </MenuItem> */}
      {/* );
        })} */}
      {/* </Menu> */}
      <TextField
        fullWidth
        id="outlined-select-doctor"
        select
        label="select"
        value={choice}
        onChange={onChange}>
        {menuItems.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

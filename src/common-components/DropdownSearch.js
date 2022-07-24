/* eslint-disable react/prop-types */
// import * as React from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// // eslint-disable-next-line no-unused-vars
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// };

// export default function DropdownSearch({ btnText, menuItems, handleCheckboxChange }) {
//   //   const [personName, setPersonName] = React.useState([]);

//   //   const handleChange = (event) => {
//   //     const {
//   //       target: { value }
//   //     } = event;
//   //     setPersonName(
//   //       // On autofill we get a stringified value.
//   //       typeof value === 'string' ? value.split(',') : value
//   //     );
//   //   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-checkbox-label">{btnText}</InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={menuItems}
//           //   onChange={handleChange}
//           input={<OutlinedInput label="Tag" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}>
//           {menuItems.map((item) => (
//             <MenuItem key={item}>
//               <Checkbox
//                 // checked={menuItems.indexOf(item) > -1}
//                 value={item}
//                 onChange={() => handleCheckboxChange(event)}
//               />
//               <ListItemText primary={item} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }

import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function DropdownSearch({ btnText, menuItems, handleCheckboxChange }) {
  const arr = menuItems.map((item) => item.name);
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="checkboxes-tags"
      options={arr}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            value={option}
            onChange={handleCheckboxChange}
          />
          {option}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={btnText} placeholder="select..." />}
    />
  );
}

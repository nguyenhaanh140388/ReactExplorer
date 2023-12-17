import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';

const ITEM_HEIGHT = 32;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterableOptionList(props) {
  const [variantName, setVariantName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    props.handleCallBack(value);

    let duplicateRemoved = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
      }
    });

    setVariantName(duplicateRemoved);

  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} error={variantName.length <= 0}  >
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={variantName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((x) => (
                <Chip key={x.id} label={x.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {props.datasource.map((variant) => (
            <MenuItem key={variant.id} value={variant}>
              <Checkbox
                checked={
                  variantName.findIndex((item) => item.id === variant.id) >= 0
                } />
              <ListItemText primary={variant.name} />
            </MenuItem>
          ))}
        </Select>
        {variantName.length <= 0 && <FormHelperText>Tag is required</FormHelperText>}
      </FormControl>
    </div>
  );
}

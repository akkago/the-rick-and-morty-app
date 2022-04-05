import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import _ from 'lodash';
import { MenuItem, Select } from '@mui/material';

export default function ControlledSelect(props) {
  const [value, setValue] = React.useState('');
  const { id, onChange, controlsNames } = props;
  const handleChange = (event) => {
    const text = event.target.value;
    setValue(text);
    onChange(id, text);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{id}</FormLabel>
      <Select
        labelId="demo-simple-select-label"
        name="controlled-radio-buttons-group"
        value={value}
        label={value}
        size='small'
        onChange={handleChange}
      >
        {_.map(controlsNames, (name) => <MenuItem value={name} key={name}>{name}</MenuItem>)}
      </Select>
    </FormControl>
  );
}
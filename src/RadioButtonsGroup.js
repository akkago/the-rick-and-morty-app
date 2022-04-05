import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import _ from 'lodash';

export default function ControlledRadioButtonsGroup(props) {
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
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {_.map(controlsNames, (name) => <FormControlLabel value={name} key={name} control={<Radio />} label={name} />)}
      </RadioGroup>
    </FormControl>
  );
}
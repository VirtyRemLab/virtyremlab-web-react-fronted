import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';



const Input = styled(MuiInput)`
  width: 100%;
`;

export default function InputSlider({ title, min, max, step, initVal, units,cllback, Icon}) {
    const [value, setValue] = React.useState(initVal);
    // Para evitar lazar eventos constantemente
 
    
  const handleSliderChange = (event, newValue) => {
      
      if (newValue < min) {
          newValue = min;
      } else if (newValue> max) {
          newValue = max;
      }
      setValue(newValue);
      cllback(event, { value });
  };
    

    const handleInputChange = (event) => {
        var newValue = Number(event.target.value);
        if (newValue < min) {
            newValue = min;
        } else if (newValue > max) {
            newValue = max;
        }
        setValue(newValue);
        cllback(event, { value });

    };


  return (
    <Box sx={{ width: "100%"}}>
      <Typography id="input-slider" gutterBottom>
              {title}
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid size={1}>
                  { Icon}
        </Grid>
        <Grid size={8}>
          <Slider
                      value={typeof value === 'number' ? value : Number(value)}
                      width = "100%"
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={min}
            max={max}
            step={step}                      
          />
        </Grid>
        <Grid size={3}>
          <Input
            value={value}
                      // size="small"
                      //width = "10%"
            onChange={handleInputChange}
                      endAdornment={<InputAdornment position="end">{units}</InputAdornment>}
            //onBlur={handleBlur}
            inputProps={{
                step: step,
                min: min,
                max: max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
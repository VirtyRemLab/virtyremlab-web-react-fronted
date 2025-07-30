import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function RestartButton({ cllback }) {
  

  return (
    <IconButton 
      color="primary"
      onClick={cllback}
      sx={{
        background: "#6a6889ff",
        width: 40,
        height: 40,
        '&:hover': {
            background: "#777799ff",   // color cuando pasas el mouse
        }

       }}
    >
      <RefreshIcon fontSize="medium"/>
    </IconButton>
  );
}

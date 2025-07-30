import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export default function PlayPauseButton({ cllback }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
    // Aquí puedes poner la lógica de play/pause (ej. audio, video, animación)
    cllback(!isPlaying)
  };

  return (
    <IconButton 
      color="primary"
      onClick={handleClick}
      sx={{
        background: "#6a6889ff",
        width: 60,
        height: 60,
        '&:hover': {
            background: "#777799ff",   // color cuando pasas el mouse
        }

       }}
    >
      {isPlaying ? <PauseIcon fontSize="large"/> : <PlayArrowIcon fontSize="large" />}
    </IconButton>
  );
}

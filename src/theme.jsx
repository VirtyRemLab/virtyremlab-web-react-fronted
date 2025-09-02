
import { extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  "colorSchemes": {

    "dark": {
      "palette": { primary: {
      main: '#e1e7ef', // Texto principal
    },
    secondary: {
      main: '#c0bdbdff', // Texto secundario
    },
    background: {
      default: '#191a1f',   // Fondo primario
      paper: '#0c111c',     // Fondo secundario
    },
    text: {
      primary: '#e1e7ef',   // Texto principal
      secondary: '#c0bdbdff', // Texto secundario
      disabled: '#a0aec0',  // Texto sutil
    },
    info: {
      main: '#42bdff',      // Color de acento / botones activos
    },
    success: {
      main: '#746eed',      // Color de acento secundario (violeta)
    },}
    }
  }
})
export default theme;
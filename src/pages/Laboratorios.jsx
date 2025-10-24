
import { Container, Box, Toolbar, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useEffect,useState,useRef } from "react";
import { io } from "socket.io-client";

import VolumeUp from '@mui/icons-material/VolumeUp';
import Waves from '@mui/icons-material/Waves';
import LineChart from "../graphics/LineChart"
import InputSlider  from "../inputs/slider"
import Aeropendulo_svg from "../graphics/aeropendulo"

import Divider, { dividerClasses } from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function Laboratorios() {
  


  useEffect(() => {
    
    socketRef.current = io("http://localhost:8002")
    socketRef.current.on("connect", () => {
      console.log("✅ Conectado:", socket.id);
    });

    socketRef.current.on("aeropendulo_state", (data) => {
      console.log("📡 Mensaje:", data);
      setangle(data["yk"]) 
      
      sety((prev) => [...prev.slice(1), data["yk"]])
      setx((prev) => {
        const last = prev[prev.length - 1] || 0; // último valor
        const next = last + 1;
        return [...prev.slice(1), next];
      });
    });


    // Clean up cuando el componente se desmonta:
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  
  const socketRef = useRef( );
  const [y, sety] = useState(Array(100).fill(0));
  const [x, setx] = useState(Array(100).fill(0));
  const [angle_slider, setangle_slider] = useState(0);
  const [angle, setangle] = useState(0);

  const cllbackSliderFreq = (event, newValue) => {
    socketRef.current.emit("freq_change", newValue);
    //console.log(newValue)
  }
  const cllbackSliderAngle = (event, newValue) => {
    setangle_slider(newValue.value)
    console.log(newValue)
  }

  const cllback_on = (event, newValue) => {
     
     if (newValue)
       socketRef.current.emit("event", 1);
    else
      socketRef.current.emit("event",2);
     
   }
 


    return (  
    <Container maxWidth="lg">
        <Toolbar />
      
      <Box sx={{ my: 4 }}>
        {/* Título de la página  */}
        <Typography variant="h3" gutterBottom>
          Página Laboratorios 
        </Typography>
        {/* Contenido de la página dentro de un box  */}
        <Box sx={{ flexGrow: 1 }}>

        {/* Grid flexible para facilitar el layout reactivo*/}
        {/* <Grid container spacing={2}>
            <Grid size={6}>
              <LineChart x={x} y={y} height={400} width="100%" /> 
            </Grid>
            <Grid size={6}>
              <LineChart x={x} y={y} height={400} width="100%" /> 
            </Grid>
                  
          </Grid> */}
                    {/* Configuración de la entrada */}
          <Grid size={4}>
            <Card sx={{backgroundColor:"#2f2d2dff"}}>
              <CardContent>
                <Stack>
                  <Typography variant="h5" gutterBottom> Entrada  </Typography>
                  <FormGroup>
                      <FormControlLabel control={<Switch />} onChange={cllback_on} label="POWER ON" />
                  </FormGroup>

                    {/* <InputSlider title={"Frecuencia"} min={0} max={1} initVal={F.current} step={0.01} units={"Hz"} cllback={cllback_F} /> */}
                  {/* <InputSlider title={"Amplitud"} min={-60} max={60} initVal={A.current} step={3} units={"º"} cllback={cllback_A} /> */}
                  <Divider />
                  {/* <FormGroup>
                      <FormControlLabel control={<Switch />} onChange={cllback_on} label="Perturbación" />
                  </FormGroup> */}
                </Stack>
              </CardContent>
              </Card>
          </Grid>
                
          {/* Grid flexible para facilitar el layout reactivo*/}
          <Grid container spacing={2}>
            
            <Grid size={8}>
                {/* Elementos dentro de una columna con stack*/}
              <Stack spacing={2}>
                  <LineChart title={"Consigna"} x={x} y={[y]} labels={["r(t)"]} height={400} width="100%" range={ [-180,180]} /> 
                  <LineChart x={x} y={[y]} labels={["y(t)"]} height={400} width="100%" range={ [-180,180]} /> 
                  
              </Stack>    
              
            </Grid>
              <Grid size={4}>
                <Stack spacing={2}>
                  <Aeropendulo_svg angle={angle} />
                
                  <InputSlider title={"Frecuencia"} min={0} max={3} initVal={0.2} step={0.01} units={"Hz"} Icon={<Waves />} cllback={cllbackSliderFreq} />
                  <InputSlider title={"Ángulo"} min={-90} max={90} initVal={0} step={4} units={ "º"} cllback={cllbackSliderAngle}/>
              </Stack>    
            </Grid>
                  
          </Grid>


          </Box>
          


      </Box>
    </Container>
   );
  }

import { Box, Toolbar, Typography, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useEffect,useState,useRef } from "react";
import Aeropendulo_svg from "../graphics/aeropendulo"
import LineChart from "../graphics/LineChart"
import { aeropendulo } from "../js_sim/models"
import { modeloEE,PI,PID } from "../js_sim/models"
import { rk4 } from "../js_sim/solvers"
import InputSlider from "../inputs/slider"
import PlayPauseButton from "../inputs/PlayPauseButton"
import RestartButton from "../inputs/RestartButton"
import Divider, { dividerClasses } from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function Simulaciones() {
  
  
  
  const u_= useRef(0), theta_= useRef(0), w_= useRef(0), t_ =  useRef(0), r_ =  useRef(0),e_= useRef(0),y_ =useRef(0); 
  
  // Parámetros de la simulación
  let Fs = 150;               // Frecuencia de muestreo
  let F_display = 10;         // Frecuencia de muestreo de las gráficas
  
  // Parámetros de las figuras
  let range_t_figure_s = 30;  // Longitud de la ventana para las gráfica (s)
  
  // Parámetros del control
  const Kp = useRef(4); // Kp como referencia para que persista entre renderizados (valor global)
  const Ki = useRef(0); // Ganancia integral Ki 
  const Kd = useRef(0); // Ganancia diferencial Kd 
  // Parámetros de la entrada
  const F = useRef(0.01);               // Frecuencia de la señal de referencia
  const A = useRef(10);               // Amplitud de la señal
  const P = useRef(0);                // Perturbación constante
  // Modelos y condiciones iniciales
  var modeloAeropendulo = new modeloEE(aeropendulo);

  var pi_reg = useRef(new modeloEE(PID(Kp.current, Ki.current,Kd.current)));

  let x = useRef([[0], [0]]);
  let x_pi = useRef([[0],[0]]);
  
  // Buffers de las gráficas
  const [theta, set_theta] = useState(Array(range_t_figure_s * F_display).fill(0));
  const [r, set_r] = useState(Array(range_t_figure_s * F_display).fill(0));
  const [e, set_e] = useState(Array(range_t_figure_s * F_display).fill(0));
  const [w, set_w] = useState(Array(range_t_figure_s * F_display).fill(0));
  const [u, setu] = useState(Array(range_t_figure_s*F_display).fill(0));
  const [t, sett] = useState(Array(range_t_figure_s * F_display).fill(0));
  const [p, set_p] = useState(Array(range_t_figure_s * F_display).fill(0));
  const [restart,set_restart] = useState(false);
  // Variables para la máquina de estados que controla la simulación
  const estado = useRef("paused");

  
  // Callbacks de los elementos interactivos (cuadros de texto, sliders)

  const cllback_kp = (event, newValue) => {
    
    Kp.current = newValue;
    pi_reg.current.update_params(PID(newValue, Ki.current,Kd.current));
  }

  const cllback_ki = (event, newValue) => {    
    
    Ki.current = newValue;
    pi_reg.current.update_params(PID(Kp.current, newValue, Kd.current));
    if (Ki.current == 0)
      x_pi.current[0][0] = 0;

    
  }

  const cllback_kd = (event, newValue) => {
    
    // if (Kd.current == 0)
    //   x_pi.current = [[0]];
    
    Kd.current = newValue;
    pi_reg.current.update_params(PID(Kp.current, Ki.current,newValue));
  }

  const cllback_A = (event, newValue) => {
    
    A.current = newValue;

      
  }

  const cllback_F = (event, newValue) => {
    
    F.current = newValue;
      
  }

  const cllback_P = (event, newValue) => {
    if (newValue)
      P.current = 20;
    else
      P.current = 0;
      
  }

  const eventDispacher = (event, state) => { 
   
    switch (state.current) {
      case "idle":

        if (event == "start")
          state.current = "running";
        break;
      case "running":
        if (event == "stop")
          state.current = "idle";
        if (event = "pause")
          state.current = "paused"
        break;
      case "paused":
        if (event == "stop") {
          state.current = "idle";
        }
        if (event == "start")
          state.current = "running";
        break;
    }
    console.log(event, state.current);
  }


  const callback_play = (play) => {
    
     eventDispacher(play ? "start" : "pause", estado);
  }
  const callback_restart = () => {
    eventDispacher("stop", estado);
  }

  useEffect(() => {


    const interval = setInterval(() => {
      
      switch (estado.current) {
        
        case 'idle':
          u_.current = 0, theta_.current = 0, w_.current = 0, t_.current = 0, r_.current = 0, e_.current = 0, y_.current;
          x.current = [[0], [0]];
          x_pi.current = [[0],[0]];

          set_theta(Array(range_t_figure_s * F_display).fill(0));
          set_r(Array(range_t_figure_s * F_display).fill(0));
          set_e(Array(range_t_figure_s * F_display).fill(0));
          set_w(Array(range_t_figure_s * F_display).fill(0));
          setu(Array(range_t_figure_s * F_display).fill(0));
          sett(Array(range_t_figure_s * F_display).fill(0));
          set_p(Array(range_t_figure_s * F_display).fill(0));
          set_restart(false);
          break;
        case 'running':
          t_.current += 1 / Fs;
          // Cálculo de la referencia
          r_.current = A.current * (Math.sin(2 * Math.PI * t_.current * F.current)>0);

          // Cálculo de la acción de control

          e_.current = (r_.current - theta_.current);
          x_pi.current = rk4(e_.current, x_pi.current, pi_reg.current, 1 / Fs);
          
          u_.current = pi_reg.current.out(e_.current, x_pi.current)[0][0];
          
          // Simulación del modelo
          x.current = rk4([[u_.current], [P.current]], x.current, modeloAeropendulo, 1 / Fs);
          y_.current = modeloAeropendulo.out(u_.current, x.current)
          
          
          // Valores a visualizar 
          theta_.current = y_.current[0][0]
          
          w_.current = y_.current[1][0]
          if (Math.round(t_.current / (1 / Fs)) % Math.round((Fs / F_display)) == 0) {
            sett((prev) => [...prev.slice(1), t_.current]);
            set_w((prev) => [...prev.slice(1), w_.current]);
            set_r((prev) => [...prev.slice(1), r_.current]);
            set_e((prev) => [...prev.slice(1), e_.current]);
            setu((prev) => [...prev.slice(1), u_.current]);
            set_theta((prev) => [...prev.slice(1), theta_.current]);
            set_p((prev) => [...prev.slice(1), P.current]);
          set_restart(false);
            //console.log(Kp.current,t_, r_, r_ - theta_, u_, theta_)
          }
          break;
        case 'paused':
          set_restart(true);
          break;
          



      }
      
    }, 1000. / Fs);
    return () => clearInterval(interval);
  },[]);
 
  
  return (
      <Container maxWidth="lg">
         <Toolbar />   
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>
              Aeropéndulo: Control PID 
            </Typography>
        
            <Box sx={{ flexGrow: 1 }}>
                    
              <Grid container spacing={2}>   
                {/* Animación del aeropéndulo */}
                <Grid size={5}>
                  <Aeropendulo_svg angle={theta[theta.length - 1]} angle_ghost={r[r.length - 1]} opacity_pert={p[p.length - 1]>0?1:0} />
                </Grid>
                      
                {/* Configuración de la entrada */}
                <Grid size={4}>
                  <Card sx={{backgroundColor:"#2f2d2dff"}}>
                    <CardContent>
                      <Stack>
                        <Typography variant="h5" gutterBottom> Entrada  </Typography>
                        <InputSlider title={"Frecuencia"} min={0} max={1} initVal={F.current} step={0.01} units={"Hz"} cllback={cllback_F} />
                        <InputSlider title={"Amplitud"} min={-60} max={60} initVal={A.current} step={3} units={"º"} cllback={cllback_A} />
                        <Divider />
                        <FormGroup>
                            <FormControlLabel control={<Switch />} onChange={cllback_P} label="Perturbación" />
                        </FormGroup>
                      </Stack>
                    </CardContent>
                    </Card>
                </Grid>
                

                {/* Configuración de la regulador */}
                <Grid size={3}>
                  <Card sx={{backgroundColor:"#2f2d2dff"}}>
                    <CardContent>
                      <Stack>
                        <Typography variant="h5" gutterBottom> Regulador PID </Typography>
                        <InputSlider title={"Kp"} min={0} max={10} initVal={Kp.current} step={0.3} units={""} cllback={cllback_kp} />
                        <InputSlider title={"Ki"} min={0} max={1} initVal={Ki.current} step={0.05} units={""} cllback={cllback_ki} /> 
                        <InputSlider title={"Kd"} min={0} max={0.9} initVal={Ki.current} step={0.0005} units={""} cllback={cllback_kd} />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                  
                {/* Controles de la simulación */}
                <Grid size={12}>
                  <div style={{  gap: '18px' }}>
                    <PlayPauseButton cllback={callback_play} /> {(estado.current==="paused") ? <RestartButton cllback={callback_restart} />:<></> }
                  </div>
                </Grid>
            
                {/* Gráficas */}
                <Grid size={8}>
                  <Card sx={{backgroundColor:"#2f2d2dff"}}>
                    <CardContent>
                      <LineChart title={""} x={t} y={[r, theta]} labels={["r(t)", "theta(t)"]} height={400} width="100%" range={ [-180,180]} /> 
                    </CardContent>
                  </Card>
                </Grid>
            
                <Grid size={4}>
                  
                  <Card sx={{backgroundColor:"#2f2d2dff"}}>
                    <CardContent>
                      <Stack>
                        <LineChart title={""} x={t} y={[u]} labels={["u(t)"]} height={200} colors={['#10B981']} range={ [-180,180]} width="100%" /> 
                        <LineChart title={""} x={t} y={[e]} height={200} labels={["e(t)"]} colors={['#FACC15']} range={ [-180,180]}width="100%" /> 
                      </Stack>    
                    </CardContent>
                  </Card>  
                </Grid>
              </Grid>
        </Box>
      </Box>
        </Container>
      );
  }
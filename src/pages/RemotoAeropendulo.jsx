import { Container, Box, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import LineChart from "../graphics/LineChart";
import Aeropendulo_svg from "../graphics/aeropendulo";

import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PlayPauseButton from "../inputs/PlayPauseButton"
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import CameraMiniViewIframe from "../media/CameraMiniViewIframe";
import RestartButton from "../inputs/RestartButton"



const getSocketUrl = () => {
  // 1. Intentar leer de variable de entorno (Vite)
  const envUrl = import.meta.env.VITE_SOCKET_URL;
  if (envUrl) return envUrl;
  return "http://localhost:8002";
};

export default function RemotoAeropendulo() {
  const WHEP_ADDR = "http://156.35.152.161:8889/tapo"
  const socketRef = useRef();

  const [y, sety] = useState(Array(100).fill(0));
  const [r, setr] = useState(Array(100).fill(0));
  const [e, sete] = useState(Array(100).fill(0));
  const [u, setu] = useState(Array(100).fill(0));
  const [x, setx] = useState(Array(100).fill(0));
  const [angle, setangle] = useState(0);

  // Estados UI
  const [velManual, setVelManual] = useState(200);
  const [play, setPlay] = useState(false);
  const [remoteMode, setRemoteMode] = useState(null);
  const [selectedMode, setSelectedMode] = useState("");
  const [Mode, setMode] = useState("");
  const [powerOn, setPowerOn] = useState(false);
  const [connected, setConnected] = useState(false);

  // Último paquete recibido
  const [aeroState, setAeroState] = useState(null);

  useEffect(() => {
    socketRef.current = io(getSocketUrl());

    socketRef.current.on("connect", () => {
      console.log("✅ Conectado:", socketRef.current.id);
      setConnected(true);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log(" Desconectado:", reason);
      setConnected(false);
    });

    socketRef.current.on("aeropendulo_state", (data) => {
      setAeroState(data);

      // Datos de la salida del sistema 
      if (typeof data["yk"] !== "undefined") {
        setangle(data["yk"]);
        sety((prev) => [...prev.slice(1), data["yk"]]);
        setx((prev) => {
          const last = prev[prev.length - 1] || 0;
          const next = last + 1;
          return [...prev.slice(1), next];
        });
      }

      // Datos de la consigna 
      if (typeof data["rk"] !== "undefined") {
        setr((prev) => [...prev.slice(1), data["rk"]]);
      }

      // Datos de la acción de control 
      if (typeof data["uk"] !== "undefined") {
        setu((prev) => [...prev.slice(1), data["uk"]]);
      }

      // Datos del error
      if (typeof data["ek"] !== "undefined") {
        sete((prev) => [...prev.slice(1), data["ek"]]);
      }

      if (typeof data["mode"] !== "undefined") {
        const m = data["mode"];
        setRemoteMode(m);
        const on = m === 2 || m === 4 || m === 3;
        setPowerOn(on);

        if (m === 4) setMode("test");
        else if (m === 3) setMode("pid");
        else if (m === 2) setMode("ready");
        else setMode("");
      }

      if (typeof data["ctrl_mode"] !== "undefined") {
        const m = data["ctrl_mode"]

        if (m == 0) setSelectedMode("test");
        if (m == 1) setSelectedMode("pid");

      }

      if (typeof data["vel_man"] !== "undefined") {
        setVelManual(Number(data["vel_man"]));
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const cllback_on = (_e, newValue) => {
    setPowerOn(newValue);
    if (newValue) socketRef.current.emit("event", 1);
    else socketRef.current.emit("event", 2);
  };

  const handleVelChange = (_e, value) => setVelManual(value);
  const handleVelCommit = (_e, value) => {
    socketRef.current.emit("vel_man", value);
  };

  const handleMultiModeChange = (event) => {
    const value = event.target.value;
    if (value === "test") socketRef.current.emit("ctrl_mode", 0);
    if (value === "pid") socketRef.current.emit("ctrl_mode", 1);
  };

  const handleReset = () => {
    socketRef.current.emit("event", 5);
  };

  const callback_play = () => {
    if (play == false) {
      socketRef.current.emit("event", 3);
      setPlay(true)
    }
    else {
      socketRef.current.emit("event", 4);
      setPlay(false)
    }
  }


  const pretty = (val, digits = 3) =>
    typeof val === "number" ? Number(val).toFixed(digits) : val ?? "-";

  return (
    <Container maxWidth="lg">
      <Toolbar />

      <Box sx={{ my: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h3" gutterBottom>
            Aeropéndulo
          </Typography>
          <Tooltip title={connected ? "Conectado al servidor" : "Desconectado"}>
            <Chip
              size="small"
              label={connected ? "Conectado" : "Desconectado"}
              color={connected ? "success" : "error"}
              variant={connected ? "filled" : "outlined"}
              icon={
                <CircleIcon
                  sx={{
                    fontSize: 12,
                    color: connected ? "#22c55e" : "#ef4444",
                  }}
                />
              }
            />
          </Tooltip>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          {/* Control del equipo */}

          <Grid container spacing={2} alignItems="center">
            <Grid size={4}>

              {/* Grupo de elementos para control del estado del equipo*/}
              <Card sx={{ backgroundColor: "#2f2d2dff" }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h5" gutterBottom>
                      Control del equipo
                    </Typography>

                    {/* POWER ON */}
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch checked={powerOn} onChange={cllback_on} />}
                        label={`POWER ${powerOn ? "ON" : "OFF"}`}
                      />
                    </FormGroup>

                    {/* Selector de modo visible solo cuando el sistema está en READY */}
                    {powerOn == true && (
                      <FormControl fullWidth>
                        <InputLabel id="modo-select-label">Selecciona modo</InputLabel>
                        <Select
                          labelId="modo-select-label"
                          id="modo-select"
                          label="Selecciona modo"
                          value={selectedMode}
                          onChange={handleMultiModeChange}
                        >
                          <MenuItem value={"test"}>TEST</MenuItem>
                          <MenuItem value={"pid"}>PID</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    <Button variant="contained" color="warning" onClick={handleReset}>
                      Reset
                    </Button>





                  </Stack>
                </CardContent>
              </Card>




            </Grid>
            <Grid size={6}>
              <Stack spacing={2}>
                <CameraMiniViewIframe
                  WHEP_ADDR="http://156.35.152.161:8889/tapo"
                  descripcion={""}
                />
              </Stack>
            </Grid>

            <Grid size={2}>
              <Stack spacing={2}>
                <Aeropendulo_svg angle={angle} />
              </Stack>
            </Grid>


          </Grid>

          {/* Gráficas con las señales de control */}
          <Grid container spacing={2}>
            <Grid size={6}>
              <Stack spacing={2}>

                {/* Controles para el modo test (Cadena abierta) */}
                {(selectedMode == "test") && (powerOn == true) && <Card sx={{ backgroundColor: "#2f2d2dff" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h5" gutterBottom>
                        Control en cadena abierta
                      </Typography>
                      <PlayPauseButton cllback={callback_play} />
                      {/* Vel. Manual */}

                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          Ref. Velocidad: {velManual}
                        </Typography>
                        <Slider
                          value={velManual}
                          min={-600}
                          max={600}
                          step={5}
                          valueLabelDisplay="auto"
                          onChange={handleVelChange}
                          onChangeCommitted={handleVelCommit}
                          sx={{ mt: 1 }}
                        />
                      </Box>




                    </Stack>
                  </CardContent>
                </Card>}

                {/* Controles para el modo control PID */}
                {(selectedMode == "pid") && (powerOn == true) && <Card sx={{ backgroundColor: "#2f2d2dff" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h5" gutterBottom>
                        Control PID
                      </Typography>
                      <PlayPauseButton cllback={callback_play} />





                    </Stack>
                  </CardContent>
                </Card>}

                {/* Monitor de estado */}
                <Box sx={{ mt: 4, p: 2, bgcolor: "#111827", borderRadius: 2 }}>
                  <Box
                    component="pre"
                    sx={{
                      m: 0,
                      p: 2,
                      bgcolor: "#0b1220",
                      borderRadius: 2,
                      color: "#e5e7eb",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontSize: "0.9rem",
                      overflowX: "auto",
                      whiteSpace: "pre-wrap",
                    }}
                  >{`mode    : ${aeroState?.mode ?? "-"}
yk      : ${pretty(aeroState?.yk)}
rk      : ${pretty(aeroState?.rk)}
uk      : ${pretty(aeroState?.uk)}
ek      : ${pretty(aeroState?.ek)}
M1      : ${pretty(aeroState?.M1, 0)}
M2      : ${pretty(aeroState?.M2, 0)}
vel_man : ${pretty(aeroState?.vel_man, 0)}
ctrl_mode : ${pretty(aeroState?.ctrl_mode, 0)}
Kp      : ${pretty(aeroState?.Kp)}
Ki      : ${pretty(aeroState?.Ki)}
Kd      : ${pretty(aeroState?.Kd)}
`}</Box>
                </Box>

              </Stack>
            </Grid>

            <Grid size={6}>
              <Stack spacing={2}>
                <LineChart
                  title={""}
                  x={x}
                  y={[r, y]}
                  labels={["Consigna r(t)", "Salida y(t)"]}
                  height={300}
                  width="100%"
                  range={[-180, 180]}
                />

                <LineChart
                  title={""}
                  x={x}
                  y={[e, u]}
                  labels={["Error e(t)", "Acción de contorl u(t)"]}
                  height={300}
                  colors={['#fa9315ff', '#ee15faff']}
                  width="100%"
                  range={[-180, 180]}
                />
              </Stack >
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

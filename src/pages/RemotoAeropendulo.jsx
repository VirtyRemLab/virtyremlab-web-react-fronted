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

import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";

export default function RemotoAeropendulo() {
  const socketRef = useRef();

  const [y, sety] = useState(Array(100).fill(0));
  const [x, setx] = useState(Array(100).fill(0));
  const [angle, setangle] = useState(0);

  // Estados UI
  const [velManual, setVelManual] = useState(200);
  const [remoteMode, setRemoteMode] = useState(null);
  const [selectedMode, setSelectedMode] = useState("");
  const [powerOn, setPowerOn] = useState(false);
  const [connected, setConnected] = useState(false);

  // Último paquete recibido
  const [aeroState, setAeroState] = useState(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8002");

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

      if (typeof data["yk"] !== "undefined") {
        setangle(data["yk"]);
        sety((prev) => [...prev.slice(1), data["yk"]]);
        setx((prev) => {
          const last = prev[prev.length - 1] || 0;
          const next = last + 1;
          return [...prev.slice(1), next];
        });
      }

      if (typeof data["mode"] !== "undefined") {
        const m = data["mode"];
        setRemoteMode(m);
        const on = m === 2 || m === 4 || m === 3;
        setPowerOn(on);

        if (m === 4) setSelectedMode("test");
        else if (m === 3) setSelectedMode("pid");
        else setSelectedMode("");
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
    setSelectedMode(value);
    if (value === "test") socketRef.current.emit("event", 4);
    if (value === "pid") socketRef.current.emit("event", 3);
  };

  const handleReset = () => {
    socketRef.current.emit("event", 5);
  };

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
          {/* Configuración de los comandos */}
          <Grid size={4}>
            <Card sx={{ backgroundColor: "#2f2d2dff" }}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5" gutterBottom>
                    Comandos de prueba
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

                  <Divider />

                  {/* Vel. Manual */}
                  {selectedMode == "test" && (
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Vel. Manual: {velManual}
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
                  )}

                  <Divider />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Grid flexible */}
          <Grid container spacing={2}>
            <Grid size={8}>
              <Stack spacing={2}>
                <LineChart
                  title={"Consigna"}
                  x={x}
                  y={[y]}
                  labels={["r(t)"]}
                  height={400}
                  width="100%"
                  range={[-180, 180]}
                />
              </Stack>
            </Grid>

            <Grid size={4}>
              <Stack spacing={2}>
                <Aeropendulo_svg angle={angle} />
              </Stack>
            </Grid>
          </Grid>

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
Kp      : ${pretty(aeroState?.Kp)}
Ki      : ${pretty(aeroState?.Ki)}
Kd      : ${pretty(aeroState?.Kd)}`}</Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

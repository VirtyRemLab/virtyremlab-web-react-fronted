import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

/**
 * Simulador de péndulo: modelo real (no lineal) vs linealizado
 * - Sin dependencias extra
 * - Animación en canvas + gráfico θ(t) en otro canvas
 * - Integración RK4 con paso fijo
 */
function MJ({ tex }) {
  const ref = useRef(null);
  useEffect(() => {
    let cancelled = false;
    const typeset = () => {
      const mj = window.MathJax;
      if (mj && mj.typesetPromise && ref.current) {
        mj.typesetPromise([ref.current]);
      } else if (!cancelled) {
        setTimeout(typeset, 100);
      }
    };
    typeset();
    return () => {
      cancelled = true;
    };
  }, [tex]);
  return <div ref={ref}>{`\\(${tex}\\)`}</div>;
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const rad = (deg) => (deg * Math.PI) / 180;
const deg = (rad_) => (rad_ * 180) / Math.PI;

function rk4Step(deriv, x, dt) {
  const k1 = deriv(x);
  const x2 = x.map((xi, i) => xi + 0.5 * dt * k1[i]);
  const k2 = deriv(x2);
  const x3 = x.map((xi, i) => xi + 0.5 * dt * k2[i]);
  const k3 = deriv(x3);
  const x4 = x.map((xi, i) => xi + dt * k3[i]);
  const k4 = deriv(x4);
  return x.map(
    (xi, i) => xi + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])
  );
}

export default function PendulumSimulator() {
  // Parámetros
  const [m, setM] = useState(1);
  const [b, setB] = useState(0.8);
  const [L, setL] = useState(1);
  const [g, setG] = useState(9.81);

  // Condiciones iniciales
  const [theta0Deg, setTheta0Deg] = useState(20); // grados
  const [omega0, setOmega0] = useState(0); // rad/s
  // Par externo constante (N·m)
  const [T, setT] = useState(0);
  // Activaciones individuales
  const [useTheta0, setUseTheta0] = useState(true);
  const [useOmega0, setUseOmega0] = useState(true);
  const [useT, setUseT] = useState(true);

  // Control simulación
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Estados internos de simulación
  const stateRealRef = useRef([rad(theta0Deg), omega0]); // [theta, omega]
  const stateLinRef = useRef([rad(theta0Deg), omega0]); // [theta, omega]
  const tRef = useRef(0);

  // Historial para el plot
  const historyRef = useRef({ t: [], thReal: [], thLin: [] });
  const maxPoints = 2000;

  // Canvases
  const pendulumCanvasRef = useRef(null);
  const plotCanvasRef = useRef(null);

  // Reiniciar cuando cambian parámetros o CI
  const resetSim = () => {
    const th0 = useTheta0 ? rad(theta0Deg) : 0;
    const w0 = useOmega0 ? omega0 : 0;
    stateRealRef.current = [th0, w0];
    stateLinRef.current = [th0, w0];
    tRef.current = 0;
    historyRef.current = { t: [], thReal: [], thLin: [] };
    drawPendulum();
    drawPlot();
  };

  useEffect(() => {
    resetSim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m, b, L, g, theta0Deg, omega0, useTheta0, useOmega0]);

  // Derivadas (real vs lineal)
  const derivs = useMemo(() => {
    const invJ = 1 / (m * L * L);
    const gOverL = g / L;
    const TEff = useT ? T : 0;
    const thetaEq = Math.asin(clamp(TEff / (m * L * g), -1, 1));
    const dReal = ([theta, omega]) => [
      omega,
      -gOverL * Math.sin(theta) - b * invJ * omega + TEff * invJ,
    ];
    const dLin = ([theta, omega]) => [
      omega,
      -gOverL * Math.cos(thetaEq) * (theta - thetaEq) - b * invJ * omega,
    ];
    return { dReal, dLin };
  }, [m, b, L, g, T, useT]);

  // Animación
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const targetDtSim = 0.005; // 5 ms
    const maxFrameSimSteps = 40;

    const loop = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const realDt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      let simToRun = realDt * speed;
      let steps = 0;
      while (simToRun > 1e-6 && steps < maxFrameSimSteps) {
        const h = Math.min(targetDtSim, simToRun);

        stateRealRef.current = rk4Step(derivs.dReal, stateRealRef.current, h);
        stateLinRef.current = rk4Step(derivs.dLin, stateLinRef.current, h);
        tRef.current += h;

        const H = historyRef.current;
        H.t.push(tRef.current);
        H.thReal.push(stateRealRef.current[0]);
        H.thLin.push(stateLinRef.current[0]);
        // if (H.t.length > maxPoints) {
        //   H.t.shift(); H.thReal.shift(); H.thLin.shift();
        // }

        simToRun -= h;
        steps++;
      }

      drawPendulum();
      drawPlot();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [running, speed, derivs]);

  // Dibujo del péndulo
  function drawPendulum() {
    const canvas = pendulumCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = 60;
    const pxPerMeter = Math.min(
      (H - 80) / (L * 1.2),
      (W * 0.45) / (L * 1.2)
    );

    const thR = stateRealRef.current[0];
    const thL = stateLinRef.current[0];

    const xR = cx + pxPerMeter * L * Math.sin(thR);
    const yR = cy + pxPerMeter * L * Math.cos(thR);
    const xL = cx + pxPerMeter * L * Math.sin(thL);
    const yL = cy + pxPerMeter * L * Math.cos(thL);

    // Soporte
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 60, cy);
    ctx.lineTo(cx + 60, cy);
    ctx.stroke();
    ctx.strokeStyle = "#fefefeff"
    ctx.fillStyle = "#fefefeff"

    // Cuerda real
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(xR, yR);
    ctx.stroke();
    ctx.strokeStyle = "#fefefeff"

    // Cuerda lineal (discontinua)
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(xL, yL);
    ctx.stroke();
    ctx.strokeStyle = "#fefefeff"
    ctx.setLineDash([]);

    // Bob real
    ctx.beginPath();
    ctx.arc(xR, yR, 10, 0, 2 * Math.PI);
    ctx.fill();

    // Bob lineal
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(xL, yL, 10, 0, 2 * Math.PI);
    ctx.stroke();

    // Leyenda + info
    ctx.font = "12px sans-serif";
    ctx.fillText("Real (no lineal) — ●", 10, 20);
    ctx.fillText("Linealizada — ○", 10, 38);
    ctx.fillText(`θ_real = ${deg(thR).toFixed(1)}°`, W - 150, 20);
    ctx.fillText(`θ_lin  = ${deg(thL).toFixed(1)}°`, W - 150, 38);
  }

  // Dibujo del gráfico θ(t)
  function drawPlot() {
    const canvas = plotCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const pad = { l: 45, r: 10, t: 10, b: 28 };
    const x0 = pad.l,
      y0 = pad.t,
      x1 = W - pad.r,
      y1 = H - pad.b;
    const w = x1 - x0,
      h = y1 - y0;

    // Marco
    ctx.strokeStyle = "#fefefeff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(x0, y0, w, h);
    ctx.stroke();

    const Hst = historyRef.current;
    const n = Hst.t.length;
    if (n < 2) return;

    const tMin = 0;
    const tMax = Hst.t[n - 1];
    const xMap = (t) => x0 + ((t - tMin) / (tMax - tMin)) * w;

    const thAll = Hst.thReal.concat(Hst.thLin);
    const thMin = Math.min(...thAll);
    const thMax = Math.max(...thAll);
    const yMin = thMin - 0.05 * Math.abs(thMin || 1);
    const yMax = thMax + 0.05 * Math.abs(thMax || 1);
    const yMap = (th) => y1 - ((th - yMin) / (yMax - yMin)) * h;

    // Grid horizontal
    ctx.strokeStyle = "#fefefeff";
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const yy = y0 + (i / gridLines) * h;
      ctx.beginPath();
      ctx.moveTo(x0, yy);
      ctx.lineTo(x1, yy);
      ctx.stroke();
    }

    // Curva real (sólida)
    ctx.setLineDash([]);
    ctx.strokeStyle = "#fefefeff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xMap(Hst.t[0]), yMap(Hst.thReal[0]));
    for (let i = 1; i < n; i++) ctx.lineTo(xMap(Hst.t[i]), yMap(Hst.thReal[i]));
    ctx.stroke();

    // Curva lineal (discontinua)
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xMap(Hst.t[0]), yMap(Hst.thLin[0]));
    for (let i = 1; i < n; i++) ctx.lineTo(xMap(Hst.t[i]), yMap(Hst.thLin[i]));
    ctx.stroke();
    ctx.setLineDash([]);

    // Ejes
    ctx.fillStyle = "#e9f0efff";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("t [s]", (x0 + x1) / 2, H - 6);

    ctx.save();
    ctx.translate(14, (y0 + y1) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("θ [rad]", 0, 0);
    ctx.restore();

    // Ticks X
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const xticks = 5;
    for (let i = 0; i <= xticks; i++) {
      const tt = tMin + (i / xticks) * (tMax - tMin);
      const xx = xMap(tt);
      ctx.fillText(tt.toFixed(1), xx, y1 + 4);
    }

    // Ticks Y
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= gridLines; i++) {
      const thv = yMin + (i / gridLines) * (yMax - yMin);
      const yy = y1 - (i / gridLines) * h;
      ctx.fillText(thv.toFixed(2), x0 - 6, yy);
    }

    // Leyenda
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("Real (sólida) / Lineal (discontinua)", x0 + 6, y0 + 16);
  }

  const toggle = () => setRunning((r) => !r);
  const pause = () => setRunning(false);

  const handleTheta0Input = (v) => {
    const val = clamp(Number(v), -179, 179);
    setTheta0Deg(Number.isFinite(val) ? val : 0);
  };

  return (
    <Container maxWidth="lg">
      <Toolbar />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Simulador de Péndulo (Real vs Lineal)
        </Typography>

        {/* Bloque de explicación teórica */}
        <Box sx={{ color: "text.secondary", lineHeight: 1.4, mb: 3 }}>
          <Box sx={{ mb: 0.5 }}>
            <MJ
              tex={
                "\\text{Modelo no lineal: } \\theta(t) \\text{ es el ángulo, } \\omega(t) \\text{ la velocidad angular; parámetros } m, L, b, g, T(t)."
              }
            />
          </Box>
          <MJ tex={"\\dot{\\theta}(t) = \\omega(t)"} />
          <MJ
            tex={
              "\\dot{\\omega}(t) = - \\frac{g}{L} \\sin[ \\theta(t) ] - \\frac{b}{m L^{2}} \\omega(t) + \\frac{T(t)}{m L^{2}}"
            }
          />
          <Box sx={{ mt: 0.75, mb: 0.5 }}>
            <MJ
              tex={
                "\\text{Linealización en } \\theta_{eq}:\\; \\sin \\theta \\approx \\sin \\theta_{eq} + \\cos \\theta_{eq} (\\theta - \\theta_{eq})."
              }
            />
            <MJ
              tex={
                "\\text{Por tanto } \\left. \\tfrac{\\partial}{\\partial \\theta} \\sin \\theta \\right|_{\\theta_{eq}} = \\cos \\theta_{eq}.\\; \\text{Usamos el subíndice } \\mathbf{lin} \\text{ para variables linealizadas.}"
              }
            />
          </Box>
          <MJ tex={"\\dot{\\theta}_{lin}(t) = \\omega_{lin}(t)"} />
          <MJ
            tex={
              "\\dot{\\omega}_{lin}(t) = - \\frac{g}{L} \\cos\\, \\theta_{eq} \\; [ \\theta_{lin}(t) - \\theta_{eq} ] - \\frac{b}{m L^{2}} \\omega_{lin}(t)"
            }
          />
          <Box sx={{ mt: 0.75, mb: 0.5 }}>
            <MJ
              tex={
                "\\text{Para hallar } \\theta_{eq} \\text{ se igualan a cero las derivadas de las ecuaciones y se busca el valor de } \\theta \\text{ que lo satisface.}"
              }
            />
            <MJ
              tex={
                "\\text{Equilibrio: } \\dot{\\theta}=0,\\; \\dot{\\omega}=0 \\Rightarrow 0 = - \\tfrac{g}{L} \\sin \\theta_{eq} + \\tfrac{T}{m L^{2}} \\; \\Rightarrow \\; \\sin \\theta_{eq} = \\tfrac{T}{m L g}."
              }
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ fontSize: 12, color: "#666", mt: 0 }}
          >
            <MJ
              tex={
                "\\theta_{eq} = \\arcsin\\!\\left(\\tfrac{T}{m L g}\\right)"
              }
            />
          </Typography>
        </Box>

        {/* Layout principal: parámetros / animación / gráfica */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1} alignItems="flex-start">
            {/* Panel de parámetros */}
            <Grid item xs={12} md={12} lg={12} sm={12}>
              <Card sx={{ backgroundColor: "#2f2d2dff" }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h5" gutterBottom>
                      Parámetros
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="m [kg]"
                          type="number"
                          size="small"
                          fullWidth
                          value={m}
                          onChange={(e) => setM(Number(e.target.value))}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="b [N·m·s]"
                          type="number"
                          size="small"
                          fullWidth
                          value={b}
                          onChange={(e) => setB(Number(e.target.value))}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="L [m]"
                          type="number"
                          size="small"
                          fullWidth
                          value={L}
                          onChange={(e) => setL(Number(e.target.value))}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="g [m/s²]"
                          type="number"
                          size="small"
                          fullWidth
                          value={g}
                          onChange={(e) => setG(Number(e.target.value))}
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 1 }} />

                    {/* θ0 */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ minWidth: 70 }}>θ₀ [°]</Typography>
                      <TextField
                        type="number"
                        size="small"
                        value={theta0Deg}
                        onChange={(e) => handleTheta0Input(e.target.value)}
                        sx={{
                          flex: 1,
                          "& .MuiInputBase-root": {
                            opacity: useTheta0 ? 1 : 0.6,
                          },
                        }}
                        disabled={!useTheta0}
                      />
                      <Checkbox
                        checked={useTheta0}
                        onChange={() => {
                          setUseTheta0((v) => !v);
                          pause();
                          resetSim();
                        }}
                        inputProps={{ "aria-label": "Activar θ₀" }}
                      />
                    </Stack>

                    {/* ω0 */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ minWidth: 70 }}>
                        ω₀ [rad/s]
                      </Typography>
                      <TextField
                        type="number"
                        size="small"
                        value={omega0}
                        onChange={(e) => setOmega0(Number(e.target.value))}
                        sx={{
                          flex: 1,
                          "& .MuiInputBase-root": {
                            opacity: useOmega0 ? 1 : 0.6,
                          },
                        }}
                        disabled={!useOmega0}
                      />
                      <Checkbox
                        checked={useOmega0}
                        onChange={() => {
                          setUseOmega0((v) => !v);
                          pause();
                          resetSim();
                        }}
                        inputProps={{ "aria-label": "Activar ω₀" }}
                      />
                    </Stack>

                    {/* T */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ minWidth: 70 }}>T [N·m]</Typography>
                      <TextField
                        type="number"
                        size="small"
                        value={T}
                        onChange={(e) => setT(Number(e.target.value))}
                        sx={{
                          flex: 1,
                          "& .MuiInputBase-root": {
                            opacity: useT ? 1 : 0.6,
                          },
                        }}
                        disabled={!useT}
                      />
                      <Checkbox
                        checked={useT}
                        onChange={() => {
                          setUseT((v) => !v);
                        }}
                        inputProps={{ "aria-label": "Activar T" }}
                      />
                    </Stack>

                    {/* Controles simulación */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      <Button
                        variant="contained"
                        color={running ? "warning" : "primary"}
                        onClick={toggle}
                      >
                        {running ? "Pausar" : "Iniciar"}
                      </Button>
                      <Button variant="outlined" onClick={pause}>
                        Pausa
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          pause();
                          resetSim();
                        }}
                      >
                        Reset
                      </Button>

                      <Box sx={{ ml: "auto" }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <InputLabel id="speed-label">Velocidad</InputLabel>
                          <Select
                            labelId="speed-label"
                            id="speed-select"
                            value={speed}
                            label="Velocidad"
                            onChange={(e) => setSpeed(Number(e.target.value))}
                          >
                            <MenuItem value={0.5}>0.5×</MenuItem>
                            <MenuItem value={1}>1×</MenuItem>
                            <MenuItem value={2}>2×</MenuItem>
                            <MenuItem value={4}>4×</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Stack>

                    <Typography
                      variant="body2"
                      sx={{ color: "#ccc", mt: 1, fontSize: 13 }}
                    >
                      Tip: para ver diferencias, prueba θ₀ grandes (60°–100°).
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Animación */}
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: "#2f2d2dff" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Animación
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: 1,
                      border: "1px solid #eee",
                      overflow: "hidden",
                    }}
                  >
                    <canvas
                      ref={pendulumCanvasRef}
                      width={260}
                      height={300}
                      style={{ width: "100%", display: "block" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Gráfico θ(t) */}
            <Grid item xs={8}>
              <Card sx={{ backgroundColor: "#2f2d2dff" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    θ(t) — Real vs Lineal
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: 1,
                      border: "1px solid #eee",
                      overflow: "hidden",
                    }}
                  >
                    <canvas
                      ref={plotCanvasRef}
                      width={740}
                      height={300}
                      style={{ width: "100%", display: "block" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}


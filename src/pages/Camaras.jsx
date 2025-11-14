import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CameraMiniViewIframe from "../media/CameraMiniViewIframe";

const CAMERAS = [
  {
    id: "aeropendulo",
    whepAddr: "http://156.35.152.161:8889/tapo",
    descripcion: "Aeropéndulo",
  },
  {
    id: "aeropendulo",
    whepAddr: "http://156.35.152.161:8889/tapo",
    descripcion: "Aeropéndulo",
  },
  // {
  //   id: "laboratorio1",
  //   whepAddr: "http://156.35.152.161:8889/lab1",
  //   descripcion: "Laboratorio 1",
  // },
  // {
  //   id: "laboratorio2",
  //   whepAddr: "http://156.35.152.161:8889/lab2",
  //   descripcion: "Laboratorio 2",
  // },
  // añade más cámaras aquí
];

export default function Camaras() {
  return (
    <>
      <Box
        sx={{
          background: "radial-gradient(circle at top left, rgba(56,139,253,0.1), transparent 60%)",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center" >
            <Grid item xs={12} md={6} sm={6} lg={6}>
              {CAMERAS.map((cam) => (
                <CameraMiniViewIframe
                  WHEP_ADDR={cam.whepAddr}
                  descripcion={cam.descripcion}
                />

              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

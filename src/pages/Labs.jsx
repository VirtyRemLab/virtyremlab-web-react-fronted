import {
  Box,
  Toolbar,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button
} from "@mui/material";

import LabCard from "./LabCard";

export default function Home() {

  // Lista de laboratorios disponibles. 
  // TODO: esto lo deberíamos sacar de una BBDD
  var labs = [
    { "Name": "Aeropéndulo", "Description": "Sistema de control tipo balancín donde el ángulo de giro se controla con dos motores de drone", "Tags": [["#Remoto", "#Simulación"]], "path": "aeropendulo" },

    { "Name": "Péndulo", "Description": "Simulación de un péndulo como un sistema no lineal donde experimentar con la linealización de sistemas dinámicos", "Tags": [["#Simulación"]], "path": "pendulo" },
    { "Name": "Módulos de primer y segundo orden", "Description": "Simulación de sistemas de primer y segundo orden analógicos con realimentación", "Tags": [["#Simulación"]], "path": "modulitos" }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          background: "radial-gradient(circle at top left, rgba(56,139,253,0.1), transparent 60%)",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Texto principal */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h3"
                fontWeight={600}
                gutterBottom
                sx={{
                  lineHeight: 1.2,
                  textShadow: "0 8px 24px rgba(0,0,0,0.6)",
                }}
              >
                Catálogo de laboratorios
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: "60ch",
                  lineHeight: 1.5,
                }}
              >
                Accede a hardware real, simulaciones guiadas
                y experimentos de control y automatización —
                en cualquier momento y desde cualquier lugar.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Cards con los laboratorios disponibles  */}
        <Container maxWidth="lg" style={{ marginTop: "3rem", marginBottom: "4rem" }}>

          <Grid container spacing={3}>

            <Grid item xs={12} md={4} display="block">
              {
                labs.map(function (lab, idx) {


                  return < LabCard params={lab} />

                })

              }
            </Grid>
          </Grid>


        </Container>



      </Box>


    </>
  );
}

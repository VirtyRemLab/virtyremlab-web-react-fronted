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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MemoryIcon from "@mui/icons-material/Memory";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  // Callback del botón de acceso
  function handleAccessButton() {
    navigate("/labs");
  }


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
        }}
      >
        <Toolbar />
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
                Laboratorios virtual ISA UniOvi
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

              <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#60a5fa",
                    color: "#0a1929",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#93c5fd" },
                    borderRadius: 2,
                    px: 3,
                    py: 1.2

                  }}
                  onClick={handleAccessButton}

                >
                  Accede
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.4)",
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.08)"
                    }
                  }}
                >
                  Cómo funciona
                </Button>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 3,
                  color: "rgba(255,255,255,0.5)"
                }}
              >
                Universidad de Oviedo · Ing. de Sistemas y Automática
              </Typography>
            </Grid>


          </Grid>
        </Container>
      </Box>

      {/* BENEFICIOS / VALOR PARA EL ALUMNO */}
      <Container maxWidth="lg" style={{ marginTop: "3rem", marginBottom: "4rem" }}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 24px 40px rgba(0,0,0,0.08)"
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                  <AccessTimeIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Acceso 24/7
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
                  Nada de “laboratorio solo los jueves de 10 a 12”. Conéctate en cualquier momento y practica a tu propio ritmo.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 24px 40px rgba(0,0,0,0.08)"
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                  <ScienceIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Equipamiento real
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
                  Interactúa de forma remota con hardware real de control y automatización — no solo con modelos teóricos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 24px 40px rgba(0,0,0,0.08)"
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                  <MemoryIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Control y Automatización
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
                  Experimenta con PLCs, lazos de control de procesos utilizados en la industria.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 24px 40px rgba(0,0,0,0.08)"
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                  <SchoolIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Aprende haciendo
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
                  Prácticas guiadas que te ayudan a poner en práctica los conceptos teóricos aprendidos en el aula.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>

      {/* BLOQUE DE TEXTO EXPLICATIVO / ABOUT */}

      <Container maxWidth="lg">
        <Box
          sx={{
            background: "radial-gradient(circle at top left, rgba(56,139,253,0.1), transparent 60%)",
            color: "white",
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 10 },
            px: { xs: 2, md: 3 },
            borderBottom: "1px solid rgba(255,255,255,0.05)"
          }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            ¿Por qué es necesario esta plataforma?
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            La formación en ingeniería requiere un equilibrio entre la teoría, la simulación y la práctica real. Esta plataforma ha sido diseñada para potenciar ese equilibrio, ofreciendo a estudiantes y profesores un acceso continuo y flexible a laboratorios en línea, disponibles a través de la web.
            Desarrollado en la Universidad de Oviedo, este proyecto tiene como objetivo fortalecer el aprendizaje híbrido en los estudios de ingeniería de automatización y control mediante un entorno integrado que combina ejercicios guiados de simulación, experimentos remotos con equipos reales.
            Al extender el aprendizaje práctico más allá de los límites de las sesiones de laboratorio tradicionales, el portal fomenta una comprensión más profunda, una mayor motivación y una igualdad de acceso a una formación práctica de alta calidad para todos los estudiantes.
          </Typography>
        </Box>
      </Container>

    </>
  );
}

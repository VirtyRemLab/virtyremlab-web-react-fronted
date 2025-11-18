import {
    Box,
    Toolbar,
    Container,
    Typography,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";

export default function Modulitos() {


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
                                Sistema Módulos de primer y segundo orden
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "rgba(255,255,255,0.8)",
                                    maxWidth: "60ch",
                                    lineHeight: 1.5,
                                }}
                            >


                            </Typography>

                            {/* GIF */}
                            <Box
                                component="img"
                                src="/imgs/modulitos_GIF.gif"
                                alt="Animación del sistema aeropéndulo"
                                sx={{
                                    mt: 2,
                                    mb: 4,
                                    width: "100%",
                                    maxWidth: 600,
                                    borderRadius: 2,
                                    boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    objectFit: "cover"
                                }}
                            />



                            <Box
                                sx={{
                                    py: 4,
                                    px: { xs: 2, md: 0 }
                                }}
                            >
                                <Container maxWidth="lg">


                                    <Typography variant="body1" >
                                        El simulador presentado reproduce de forma virtual, a través de un panel de conexiones, sistemas de primer y segundo orden, señales de referencia y respuestas de reguladores P, PI, PD o PID, permitiendo ajustar sus parámetros mediante potenciómetros virtuales. El visor de ondas, que emula un osciloscopio, permite observar las respuestas temporales, comparar señales entre canales, medir tiempos y amplitudes, y exportar datos para su análisis. Con este entorno, los alumnos pueden experimentar con diferentes configuraciones, analizar el comportamiento dinámico de los sistemas y estudiar los efectos de la realimentación y de las acciones de control, todo ello de forma interactiva y segura.
                                    </Typography>

                                </Container>
                            </Box>

                            <Accordion
                                sx={{
                                    background: "rgba(255,255,255,0.06)",
                                    backdropFilter: "blur(6px)",
                                    borderRadius: 2,
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    mb: 2,
                                    transition: "0.25s ease",

                                    "&:hover": {
                                        background: "rgba(255,255,255,0.1)",
                                    },

                                    "& .MuiAccordionSummary-root": {
                                        minHeight: 64,
                                    },

                                    "&.Mui-expanded": {
                                        background: "rgba(255,255,255,0.12)",
                                        borderColor: "rgba(255,255,255,0.2)",
                                    }
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.8)" }} />}>
                                    <Typography
                                        component="span"
                                        variant="h6"
                                        sx={{
                                            color: "rgba(255,255,255,0.9)",
                                            fontWeight: 500,

                                            ".Mui-expanded &": {
                                                color: "rgba(255,255,255,0.8)",
                                            }
                                        }}
                                    >
                                        Contenido didáctico
                                    </Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box maxWidth="md">
                                        {/* <Box display="flex" alignItems="center" gap={1}>

                                            <a
                                                href="/pdf/DescripciónAeropendulo.pdf"
                                                download
                                                style={{ color: "#2F85EE", textDecoration: "none", fontWeight: 500 }}
                                            >
                                                Descripción detallada del sistema
                                            </a>
                                            <OpenInNewIcon sx={{ fontSize: 18, color: "#2F85EE", mb: 0.3 }} />
                                        </Box> */}
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <a
                                                href="/pdf/descripcionModulitos.pdf"
                                                download
                                                style={{ color: "#2F85EE", textDecoration: "none", fontWeight: 500 }}
                                            >
                                                Descripción completa del simulador
                                            </a>


                                            <OpenInNewIcon sx={{ fontSize: 18, color: "#2F85EE", mb: 0.3 }} />
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={1}>
                                            <a
                                                href="/pdf/practicaModulitos.pdf"
                                                download
                                                style={{ color: "#2F85EE", textDecoration: "none", fontWeight: 500 }}
                                            >
                                                Práctica control por realimentación
                                            </a>


                                            <OpenInNewIcon sx={{ fontSize: 18, color: "#2F85EE", mb: 0.3 }} />
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            {/* Simuladores */}

                            <Accordion
                                sx={{
                                    background: "rgba(255,255,255,0.06)",
                                    backdropFilter: "blur(6px)",
                                    borderRadius: 2,
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    mb: 2,
                                    transition: "0.25s ease",

                                    "&:hover": {
                                        background: "rgba(255,255,255,0.1)",
                                    },

                                    "& .MuiAccordionSummary-root": {
                                        minHeight: 64,
                                    },

                                    "&.Mui-expanded": {
                                        background: "rgba(255,255,255,0.12)",
                                        borderColor: "rgba(255,255,255,0.2)",
                                    }
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.8)" }} />}>
                                    <Typography
                                        component="span"
                                        variant="h6"
                                        sx={{
                                            color: "rgba(255,255,255,0.9)",
                                            fontWeight: 500,

                                            ".Mui-expanded &": {
                                                color: "rgba(255,255,255,0.8)",
                                            }
                                        }}
                                    >
                                        Simuladores
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box maxWidth="md">
                                        {/* Ejemplo basado en tu snippet */}
                                        {/* <UnderlineButton label="Aeropendulum PID" to="/virtyremlab/aeropenduloPID" /> */}
                                        {/* <OpenInNewIcon sx={{ my: -0.5 }} /> */}

                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Link
                                            to="/labs/modulitos/sim_modulitos"
                                            style={{
                                                color: "#2F85EE",
                                                textDecoration: "none",
                                                fontWeight: 500
                                            }}
                                        >
                                            Simulador modulos primer y segundo orden
                                        </Link>

                                        <OpenInNewIcon sx={{ fontSize: 18, color: "#2F85EE", mb: 0.3 }} />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>



                        </Grid>
                    </Grid>
                </Container>
            </Box>


        </>
    );
}

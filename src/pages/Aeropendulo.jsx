import {
    Box,
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
// import UnderlineButton from "./tu_componente";  // Ajusta si ya lo tienes
import { MathJax, MathJaxContext } from "better-react-mathjax";

const mathJaxConfig = {
    loader: { load: ["[tex]/ams"] },
    tex: {
        packages: { "[+]": ["ams"] }
    }
};

export default function Aeropendulo() {
    return (
        <>
            {/* HERO SECTION */}
            <Box
                sx={{
                    background:
                        "radial-gradient(circle at top left, rgba(56,139,253,0.1), transparent 60%)",
                    color: "white",
                    pt: { xs: 8, md: 12 },
                    pb: { xs: 8, md: 10 },
                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                }}
            >
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
                                    textShadow: "0 8px 24px rgba(0,0,0,0.6)"
                                }}
                            >
                                Sistema Aeropéndulo
                            </Typography>

                            {/* GIF */}
                            <Box
                                component="img"
                                src="/imgs/Aeropendulo_GIF.gif"
                                alt="Animación del sistema aeropéndulo"
                                sx={{
                                    mt: 2,
                                    mb: 4,
                                    width: "100%",
                                    maxWidth: 420,
                                    borderRadius: 2,
                                    boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    objectFit: "cover"
                                }}
                            />

                            <MathJaxContext config={mathJaxConfig}>
                                <Box
                                    sx={{
                                        py: 4,
                                        px: { xs: 2, md: 0 }
                                    }}
                                >
                                    <Container maxWidth="md">
                                        <Typography
                                            variant="h4"
                                            component="h2"
                                            gutterBottom
                                            sx={{ fontWeight: 600 }}
                                        >
                                            Resumen del sistema Aeropéndulo
                                        </Typography>

                                        <Typography variant="body1" paragraph>
                                            El aeropéndulo es un sistema mecánico rotacional formado por un brazo
                                            que puede girar en torno a un eje y cuyo movimiento se controla
                                            mediante dos motores eléctricos que generan fuerzas de empuje opuestas.
                                            La diferencia de empuje entre ambos motores produce un momento que hace
                                            rotar el brazo, permitiendo controlar su ángulo.
                                        </Typography>

                                        <Typography variant="body1" paragraph>
                                            Para estudiar y controlar el sistema, se realiza una aproximación
                                            lineal del modelo dinámico. La planta se representa mediante una
                                            función de transferencia del tipo:
                                        </Typography>

                                        {/* Fórmula con MathJax */}
                                        <Box sx={{ textAlign: "center", my: 3 }}>
                                            <MathJax>
                                                {`\\[
                G(s) = \\frac{K}{s(s + p)}
              \\]`}
                                            </MathJax>
                                        </Box>

                                        <Typography variant="body1" paragraph>
                                            Este modelo incluye un polo en el origen y un polo real asociado a la
                                            dinámica mecánica, mientras que la constante de tiempo del motor se
                                            considera despreciable por su efecto pequeño en el comportamiento
                                            global. Aun así, el sistema real presenta ligeras desviaciones debidas
                                            a sus no linealidades.
                                        </Typography>


                                    </Container>
                                </Box>
                            </MathJaxContext>


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
                                        {/* Ejemplo de contenido */}
                                        {/* <UnderlineButton label="Introducción al aeropéndulo" to="/docs/aeropendulo" /> */}
                                        {/* <OpenInNewIcon sx={{ my: -0.5 }} /> */}
                                        Aquí puedes insertar PDFs, teoría o recursos formativos.
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
                                        En esta lista puedes encontrar los simuladores disponibles para el aero pendulo.
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Link
                                            to="/labs/aeropendulo/sim_aeropendulo"
                                            style={{
                                                color: "#2F85EE",
                                                textDecoration: "none",
                                                fontWeight: 500
                                            }}
                                        >
                                            Aeropendulum PID
                                        </Link>

                                        <OpenInNewIcon sx={{ fontSize: 18, color: "#2F85EE", mb: 0.3 }} />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

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
                                        Remotos
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box maxWidth="md">
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Link
                                                to="/labs/aeropendulo/rem_aeropendulo"
                                                style={{
                                                    color: "#2F85EE",
                                                    textDecoration: "none",
                                                    fontWeight: 500
                                                }}
                                            >
                                                Acceso remoto aeropéndulo
                                            </Link>

                                            <OpenInNewIcon sx={{ fontSize: 18, color: "#2F85EE", mb: 0.3 }} />
                                        </Box>
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

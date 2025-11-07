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



export default function Docs() {

    // Lista de laboratorios disponibles. 
    // TODO: esto lo deberíamos sacar de una BBDD
    var labs = [
        { "Name": "Aeropéndulo", "Description": "Sistema de control tipo balancín donde el ángulo de giro se controla con dos motores de drone", "Tags": [["#Remoto", "#Simulación"]] },
        { "Name": "Módulos de primer y segundo orden", "Description": "Simulación de sistemas de primer y segundo orden analógicos con realimentación", "Tags": [["#Simulación"]] }
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
                                ¿Cómo funciona?
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "rgba(255,255,255,0.8)",
                                    maxWidth: "60ch",
                                    lineHeight: 1.5,
                                }}
                            >
                                La documentación acerca del desarrollo de la plataforma de laboratorios remotos y virtuales se encuentra en el siguiente <a
                                    href="https://github.com/VirtyRemLab/virtyremlab-docu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    enlace
                                </a>.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>


        </>
    );
}

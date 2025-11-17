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



export default function Pendulo() {


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
                                Sistema Péndulo
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
                        </Grid>
                    </Grid>
                </Container>
            </Box>


        </>
    );
}

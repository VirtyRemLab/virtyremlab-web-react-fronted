import {
    Box,
    Toolbar,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Button
} from "@mui/material";


import { useNavigate, Outlet } from 'react-router-dom';

export default function LabCard({ params }) {
    // Params -> {nombre, descripción, tags, imagen?}
    const navigate = useNavigate();
    return (
        <>

            <Card
                sx={{

                    width: "100%",
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.07)", // fondo translúcido que contrasta
                    backdropFilter: "blur(6px)",              // efecto glassmorphism sutil
                    border: "1px solid rgba(255, 255, 255, 0.12)", // línea de contorno suave
                    boxShadow: "0 4px 16px rgba(64, 94, 137, 0.25)", // sombra con toque azul
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(67, 114, 181, 0.45)", // resalta al pasar el ratón
                    },
                }}

            >
                <CardActionArea onClick={() => { navigate(params.path) }}>



                    <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>

                            <Typography variant="h6" fontWeight={600}>
                                {params["Name"]}
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
                            {params["Description"]}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mt: 2,
                            }}
                        >
                            {params["Tags"].map((tag) => (
                                <Box
                                    key={tag}
                                    sx={{
                                        backgroundColor: "rgba(56,139,253,0.2)",
                                        border: "1px solid rgba(56,139,253,0.4)",
                                        borderRadius: "16px",
                                        px: 1.5,
                                        py: 0.3,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "rgba(173, 216, 255, 0.9)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {tag}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Toolbar />
        </>);
}
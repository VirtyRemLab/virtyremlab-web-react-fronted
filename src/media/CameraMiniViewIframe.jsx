import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

export default function CameraMiniViewIframe({ WHEP_ADDR, descripcion }) {
    return (

        <Card
            elevation={4}
            sx={{
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "black",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {descripcion && (
                <CardHeader
                    title={descripcion}
                    sx={{
                        py: 1,
                        "& .MuiCardHeader-title": {
                            fontSize: 14,
                        },
                        bgcolor: "#111",
                        color: "#fff",
                    }}
                />
            )}

            <CardContent sx={{ p: 0 }}>
                {/* Contenedor con relación de aspecto 16:9 */}
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    <Box
                        component="iframe"
                        src={WHEP_ADDR}
                        title={descripcion || "Cam Tapo"}
                        sx={{
                            display: "flex",
                            border: "none",
                        }}
                        allow="camera; microphone; fullscreen; autoplay"
                    />
                </Box>
            </CardContent>
        </Card>

    );
}

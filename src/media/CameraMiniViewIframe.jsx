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
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
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

            <CardContent sx={{ p: 0, flex: 1 }}>
                {/* Contenedor con relación de aspecto 16:9 */}
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex"
                    }}
                >
                    <Box
                        component="iframe"
                        src={WHEP_ADDR}
                        title={descripcion || "Cam Tapo"}
                        sx={{
                            aspectRatio: "16/9",
                            width: "100%",
                            height: "100%",
                            flex: 1,
                            border: "none",
                        }}
                        allow="camera; microphone; fullscreen; autoplay"
                    />
                </Box>
            </CardContent>
        </Card>

    );
}

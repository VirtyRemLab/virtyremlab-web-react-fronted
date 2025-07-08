
import { Box, Toolbar, Typography,Container } from "@mui/material";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";


export default function Camaras() {


  const [image, setImage] = useState("");
  
  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("video_frame", (frame) => {
      setImage(`data:image/jpeg;base64,${frame}`);
    });

    return () => socket.disconnect();
  }, []);

    return (
        <Container maxWidth="md">
            <Toolbar/>
          <Box sx={{ my: 4 }}>
            <Typography variant="h3" gutterBottom>
              Cámaras
          </Typography>
          <img src={image} alt="stream" style={{ maxWidth: "100%" }} />
          <button onClick={() => {fetch("http://localhost:8000/ptz?direction=left")}}>Mover Izquierda</button>
          <button onClick={() => { fetch("http://localhost:8000/ptz?direction=right") }}>Mover Derecha</button>
          <button onClick={() => { fetch("http://localhost:8000/ptz?direction=up") }}>Mover arriba</button>
          <button onClick={() => { fetch("http://localhost:8000/ptz?direction=down") }}>Mover abajo</button>
          <button onClick={() => {fetch("http://localhost:8000/ptz?direction=stop")}}>Stop</button>
          </Box>
        </Container>
      );
}
  


// CameraMiniView.tsx
import React, { useEffect, useState } from "react";
import { WebRTCViewer } from "../media/WebRTCViewer";
import { createMediaMtxWhepViewer } from "../media/mediamtxWhepClient";

const WHEP_URL = "http://156.35.152.161:8889/tapo/whep";

export const CameraMiniView: React.FC = () => {
  const [stream, setStream] = useState < MediaStream | null > (null);
  const [pc, setPc] = useState < RTCPeerConnection | null > (null);
  const [error, setError] = useState < string | null > (null);

  useEffect(() => {
    // Opcional: autoconectar al montar
    (async () => {
      try {
        const { pc, stream } = await createMediaMtxWhepViewer(WHEP_URL);
        setPc(pc);
        setStream(stream);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Error conectando a la cámara");
      }
    })();

    return () => {
      // limpiar al desmontar
      if (pc) {
        pc.getSenders().forEach((s) => s.track && s.track.stop());
        pc.close();
      }
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error && (
        <div
          style={{
            position: "fixed",
            bottom: 150,
            right: 20,
            padding: "8px 12px",
            background: "#f56565",
            color: "#fff",
            borderRadius: 8,
            fontSize: 12,
          }}
        >
          {error}
        </div>
      )}

      {stream && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <WebRTCViewer stream={stream} muted={true} />
        </div>
      )}
    </>
  );
};

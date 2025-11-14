import React, { useEffect, useRef } from "react";

interface Props {
  stream: MediaStream | null;
  muted?: boolean;
}

export const WebRTCViewer: React.FC<Props> = ({ stream, muted = true }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !stream) return;

    console.log("Asignando stream al video");

    // Solo reasignar si cambia
    if (v.srcObject !== stream) {
      v.srcObject = stream;
    }
  }, [stream]);

  return (
    <div
      style={{
        width: 220,
        height: 124,
        borderRadius: 12,
        overflow: "hidden",
        background: "#000",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

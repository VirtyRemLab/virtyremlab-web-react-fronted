// mediamtxWhepClient.ts
export async function createMediaMtxWhepViewer(
  whepUrl: string
): Promise<{ pc: RTCPeerConnection; stream: MediaStream }> {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
    ],
  });

  const remoteStream = new MediaStream();

  pc.ontrack = (event) => {
    console.log("ontrack event", event);
    event.streams[0].getTracks().forEach((t) => {
      console.log("Track received:", t.kind, t.readyState);
      remoteStream.addTrack(t);
    });
  };

  // 👇 Esto asegura que la oferta incluye que quieres RECIBIR
  pc.addTransceiver("video", { direction: "recvonly" });
  pc.addTransceiver("audio", { direction: "recvonly" });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const res = await fetch(whepUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/sdp",
    },
    body: offer.sdp ?? "",
  });

  if (!res.ok) {
    throw new Error(`Error WHEP: ${res.status} ${res.statusText}`);
  }

  const answerSdp = await res.text();

  await pc.setRemoteDescription({
    type: "answer",
    sdp: answerSdp,
  });

  console.log("Remote description set. Waiting for tracks...");

  return { pc, stream: remoteStream };
}

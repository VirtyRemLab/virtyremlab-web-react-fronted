// En tu componente React (JSX/TSX)
export default function CameraMiniViewIframe() {
    return (
        <div
            style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                width: 260,
                height: 150,
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.2)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                background: "#000",
                zIndex: 9999,
            }}
        >
            <iframe
                src="http://156.35.152.161:8889/tapo"
                title="Cam Tapo"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                }}
                allow="camera; microphone; fullscreen; autoplay"
            />
        </div>
    );
}

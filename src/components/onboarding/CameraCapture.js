import { useRef, useState, useEffect } from "react";

export default function CameraCapture({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
        } catch (err) {
            alert("Camera access denied or not available");
        }
    };

    const stopCamera = () => {
        stream?.getTracks().forEach((track) => track.stop());
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = 250;
        canvas.height = 250;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, 250, 250);

        canvas.toBlob((blob) => {
            if (!blob) return;

            const file = new File([blob], "profile-image.jpg", {
                type: "image/jpeg",
            });

            const preview = URL.createObjectURL(blob);

            onCapture({ file, preview });
            stopCamera();
        }, "image/jpeg");
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-[250px] h-[250px] rounded-full object-cover border"
            />
            <button
                onClick={capturePhoto}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg"
            >
                Capture Photo
            </button>
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}

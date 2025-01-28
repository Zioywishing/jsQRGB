import jsQRGB from "./lib/jsQRGB";

async function getVideoStream(): Promise<MediaStream | undefined> {
    let stream: MediaStream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
        })
    } catch (e) {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
        })
    }
    return stream;
}

const VideoFrame2ImageData = (frame: VideoFrame) => {
    const canvas = document.createElement('canvas')
    canvas.width = frame.displayWidth;
    canvas.height = frame.displayHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(frame, 0, 0, frame.displayWidth, frame.displayHeight)
    return ctx.getImageData(0, 0, frame.displayWidth, frame.displayHeight)
}

const useScanner = async () => {
    const video = document.querySelector('#scanner-video') as HTMLVideoElement;
    const dataEl = document.querySelector('#scanner-data') as HTMLDivElement;
    try {
        const stream = await getVideoStream();
        if (!stream) {
            throw new Error('No stream')
        }
        // @ts-ignore
        video.srcObject = stream;
        video.play();
        const track = stream.getVideoTracks()[0]
        // @ts-ignore
        const trackProcessor = new MediaStreamTrackProcessor(track);

        const reader = trackProcessor.readable.getReader();
        while (true) {
            const result = await reader.read();
            if (result.done) break;
            const frameFromCamera = result.value as VideoFrame;
            const imgData = VideoFrame2ImageData(frameFromCamera);
            const data = jsQRGB.recognize(imgData);
            frameFromCamera.close();
            if (data) {
                const text = new TextDecoder().decode(data);
                console.log(text);
                text && (dataEl.innerText = `recognize data: ${text}`)
            }
        }
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    const input = document.querySelector('#qrgb-input') as HTMLInputElement;
    const canvas = document.querySelector('#qrgb-display') as HTMLCanvasElement;
    const canvasSize = 600
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // handle input element
    const textEncoder = new TextEncoder();
    const handleInput = () => {
        const data = input.value;
        const qrgbImageData = jsQRGB.generate(textEncoder.encode(data), {
            size: canvasSize,
        });
        ctx.putImageData(qrgbImageData, 0, 0);
    }
    handleInput();
    input.addEventListener('input', handleInput)

    useScanner()
}

main();
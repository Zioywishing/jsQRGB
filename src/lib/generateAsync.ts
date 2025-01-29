import generateWorker from "../worker/generate?worker";
import type generate from "./generate";

export default function generateAsync(...args: Parameters<typeof generate>) {
    const worker = new generateWorker();
    const promise = new Promise<ImageData>((resolve, reject) => {
        worker.addEventListener("message", (event) => {
            resolve(event.data);
        });
        worker.addEventListener("error", (event) => {
            reject(event.error);
        });
    });
    const transfer = typeof args[0] === "object" ? [args[0].buffer] : [];
    worker.postMessage(args, transfer);
    return promise.finally(() => {
        worker.terminate(); 
    })
}
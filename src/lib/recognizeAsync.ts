import recognizeWorker from "../worker/recognize?worker";
import type recognize from "./recognize";

export default async function recognizeAsync(...args: Parameters<typeof recognize>) {
    const worker = new recognizeWorker();
    const promise = new Promise<Uint8Array | undefined>((resolve, reject) => {
        worker.addEventListener("message", (event) => {
            resolve(event.data);
        });
        worker.addEventListener("error", (event) => {
            reject(event.error);
        });
    });
    worker.postMessage(args, [args[0].data.buffer]);
    return promise.finally(() => {
        worker.terminate(); 
    })
}
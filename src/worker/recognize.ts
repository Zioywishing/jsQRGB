import recognize from "../lib/recognize";


addEventListener("message", (event) => {
    const args = event.data as Parameters<typeof recognize>;
    const result = recognize(...args);
    postMessage(result);
});

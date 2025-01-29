import generate from "../lib/generate";


addEventListener("message", (event) => {
    const args = event.data as Parameters<typeof generate>;
    const result = generate(...args);
    postMessage(result);
});

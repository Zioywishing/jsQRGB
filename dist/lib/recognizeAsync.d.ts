import { default as recognize } from './recognize';
export default function recognizeAsync(...args: Parameters<typeof recognize>): Promise<Uint8Array | undefined>;

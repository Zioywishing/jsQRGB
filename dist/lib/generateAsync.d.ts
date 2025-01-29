import { default as generate } from './generate';
export default function generateAsync(...args: Parameters<typeof generate>): Promise<ImageData>;

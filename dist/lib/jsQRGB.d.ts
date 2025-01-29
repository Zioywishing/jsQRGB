import { default as generateAsync } from './generateAsync';
import { default as recognizeAsync } from './recognizeAsync';
declare const jsqrgb: {
    generate: (data: Uint8Array | string, options?: {
        size?: number;
    }) => ImageData;
    recognize: (imageData: ImageData) => Uint8Array | undefined;
    generateAsync: typeof generateAsync;
    recognizeAsync: typeof recognizeAsync;
};
export default jsqrgb;

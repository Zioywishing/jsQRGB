declare const jsqrgb: {
    generate: (data: Uint8Array | string, options?: {
        size?: number;
    }) => ImageData;
    recognize: (imageData: ImageData) => Uint8Array | undefined;
};
export default jsqrgb;

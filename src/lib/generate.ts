import QRCode from 'qrcode';

const paddingData = (data: Uint8Array) => {
    return new Uint8Array([...data, ...new Array(3 - data.length % 3).fill(0).map((_, i) => i)])
}

const generateQRCodeCanvasData = (data: Uint8Array, option: {
    width: number,
    height: number,
}) => {
    const canvas = new OffscreenCanvas(option.width, option.height)
    const ctx = canvas.getContext('2d')!
    QRCode.toCanvas(canvas, [{ data, mode: 'byte' }], option)
    const imageData = ctx.getImageData(0, 0, option.width, option.height)
    return imageData
}

const generate = (data: Uint8Array | string, options?: {
    size?: number,
}): ImageData => {
    const {
        size = 600,
    } = options || {};
    const u8idata = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    const paddedData = paddingData(u8idata);
    const rgbData = {
        r: new Uint8Array([0, ...paddedData.slice(0, paddedData.length / 3)]),
        g: new Uint8Array([1,...paddedData.slice(paddedData.length / 3, paddedData.length * 2 / 3)]),
        b: new Uint8Array([2,...paddedData.slice(paddedData.length * 2 / 3, paddedData.length)])
    }
    const imgData = {
        r: generateQRCodeCanvasData(rgbData.r, { width: size, height: size }),
        g: generateQRCodeCanvasData(rgbData.g, { width: size, height: size }),
        b: generateQRCodeCanvasData(rgbData.b, { width: size, height: size })
    }
    const rgbImgData = new ImageData(size, size)
    for (let i = 0; i < rgbImgData.data.length; i += 4) {
        rgbImgData.data[i] = imgData.r.data[i]
        rgbImgData.data[i + 1] = imgData.g.data[i + 1]
        rgbImgData.data[i + 2] = imgData.b.data[i + 2]
        rgbImgData.data[i + 3] = 255
    }
    return rgbImgData
}

export default generate

import jsQR from 'jsqr'

const unpaddingData = (data: Uint8Array): Uint8Array => {
    return data.slice(0, data.length - data[data.length - 1])
}

class Binarization {
    constructor(options?: {
        threshold?: number
        min?: number,
        max?: number
    }) {
        options === undefined || (options = {})
        this.threshold = options?.threshold ?? 150
        this.min = options?.min ?? 0
        this.max = options?.max ?? 255
    }
    private threshold: number
    private min: number
    private max: number
    private cache = new Map<number, number>()
    public binarization = (value: number) => {
        if (this.cache.has(value)) return this.cache.get(value)!
        const res = value >= this.threshold ? this.max : this.min
        this.cache.set(value, res)
        return res
    }
}

const recognize = (imageData: ImageData): Uint8Array | undefined => {
    const { width, height } = imageData
    const imageDataRGB = {
        r: new ImageData(width, height),
        g: new ImageData(width, height),
        b: new ImageData(width, height),
    }
    const binarization = new Binarization().binarization
    for (let i = 0; i < imageData.data.length; i += 4) {
        const rgba = {
            r: binarization(imageData.data[i]),
            g: binarization(imageData.data[i + 1]),
            b: binarization(imageData.data[i + 2]),
            a: 255
        }
        imageDataRGB.r.data[i] = rgba.r
        imageDataRGB.r.data[i + 1] = rgba.r
        imageDataRGB.r.data[i + 2] = rgba.r
        imageDataRGB.r.data[i + 3] = rgba.a
        imageDataRGB.g.data[i] = rgba.g
        imageDataRGB.g.data[i + 1] = rgba.g
        imageDataRGB.g.data[i + 2] = rgba.g
        imageDataRGB.g.data[i + 3] = rgba.a
        imageDataRGB.b.data[i] = rgba.b
        imageDataRGB.b.data[i + 1] = rgba.b
        imageDataRGB.b.data[i + 2] = rgba.b
        imageDataRGB.b.data[i + 3] = rgba.a
    }
    const codeR = jsQR(imageDataRGB.r.data, imageDataRGB.r.width, imageDataRGB.r.height)
    const codeG = jsQR(imageDataRGB.g.data, imageDataRGB.g.width, imageDataRGB.g.height)
    const codeB = jsQR(imageDataRGB.b.data, imageDataRGB.b.width, imageDataRGB.b.height)
    if (!codeR || !codeG || !codeB) return undefined
    const resBuffer = new Uint8Array([codeR.binaryData, codeG.binaryData, codeB.binaryData].sort((a, b) => a[0] - b[0]).map(arr=>arr.slice(1)).flat())
    const data = unpaddingData(resBuffer)
    return data
}

export default recognize
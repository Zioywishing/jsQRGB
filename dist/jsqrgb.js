var w = Object.defineProperty;
var o = (t, a, e) => a in t ? w(t, a, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[a] = e;
var b = (t, a, e) => o(t, typeof a != "symbol" ? a + "" : a, e);
import f from "qrcode";
import l from "jsqr";
const D = (t) => new Uint8Array([...t, ...new Array(3 - t.length % 3).fill(0).map((a, e) => e)]), m = (t, a) => {
  const e = document.createElement("canvas"), n = e.getContext("2d");
  return f.toCanvas(e, [{ data: t, mode: "byte" }], a), n.getImageData(0, 0, a.width, a.height);
}, u = (t, a) => {
  const {
    size: e = 600
  } = a || {}, n = typeof t == "string" ? new TextEncoder().encode(t) : t, h = D(n), i = {
    r: new Uint8Array([0, ...h.slice(0, h.length / 3)]),
    g: new Uint8Array([1, ...h.slice(h.length / 3, h.length * 2 / 3)]),
    b: new Uint8Array([2, ...h.slice(h.length * 2 / 3, h.length)])
  }, s = {
    r: m(i.r, { width: e, height: e }),
    g: m(i.g, { width: e, height: e }),
    b: m(i.b, { width: e, height: e })
  }, c = new ImageData(e, e);
  for (let g = 0; g < c.data.length; g += 4)
    c.data[g] = s.r.data[g], c.data[g + 1] = s.g.data[g + 1], c.data[g + 2] = s.b.data[g + 2], c.data[g + 3] = 255;
  return c;
}, y = (t) => t.slice(0, t.length - t[t.length - 1]);
class x {
  constructor(a) {
    b(this, "threshold");
    b(this, "min");
    b(this, "max");
    b(this, "cache", /* @__PURE__ */ new Map());
    b(this, "binarization", (a) => {
      if (this.cache.has(a)) return this.cache.get(a);
      const e = a >= this.threshold ? this.max : this.min;
      return this.cache.set(a, e), e;
    });
    a === void 0 || (a = {}), this.threshold = (a == null ? void 0 : a.threshold) ?? 150, this.min = (a == null ? void 0 : a.min) ?? 0, this.max = (a == null ? void 0 : a.max) ?? 255;
  }
}
const z = (t) => {
  const { width: a, height: e } = t, n = {
    r: new ImageData(a, e),
    g: new ImageData(a, e),
    b: new ImageData(a, e)
  }, h = new x().binarization;
  for (let r = 0; r < t.data.length; r += 4) {
    const d = {
      r: h(t.data[r]),
      g: h(t.data[r + 1]),
      b: h(t.data[r + 2]),
      a: 255
    };
    n.r.data[r] = d.r, n.r.data[r + 1] = d.r, n.r.data[r + 2] = d.r, n.r.data[r + 3] = d.a, n.g.data[r] = d.g, n.g.data[r + 1] = d.g, n.g.data[r + 2] = d.g, n.g.data[r + 3] = d.a, n.b.data[r] = d.b, n.b.data[r + 1] = d.b, n.b.data[r + 2] = d.b, n.b.data[r + 3] = d.a;
  }
  const i = l(n.r.data, n.r.width, n.r.height), s = l(n.g.data, n.g.width, n.g.height), c = l(n.b.data, n.b.width, n.b.height);
  if (!i || !s || !c) return;
  const g = new Uint8Array([i.binaryData, s.binaryData, c.binaryData].sort((r, d) => r[0] - d[0]).map((r) => r.slice(1)).flat());
  return y(g);
}, U = {
  generate: u,
  recognize: z
};
export {
  U as default
};

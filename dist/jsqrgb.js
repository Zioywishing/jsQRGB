var o = Object.defineProperty;
var w = (t, a, e) => a in t ? o(t, a, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[a] = e;
var b = (t, a, e) => w(t, typeof a != "symbol" ? a + "" : a, e);
import D from "qrcode";
import l from "jsqr";
const f = (t) => new Uint8Array([...t, ...new Array(3 - t.length % 3).fill(0).map((a, e) => e)]), m = (t, a) => {
  const e = document.createElement("canvas"), n = e.getContext("2d");
  return D.toCanvas(e, [{ data: t, mode: "byte" }], a), n.getImageData(0, 0, a.width, a.height);
}, u = (t, a) => {
  const {
    size: e = 600
  } = a || {}, n = typeof t == "string" ? new TextEncoder().encode(t) : t, d = f(n), i = {
    r: d.slice(0, d.length / 3),
    g: d.slice(d.length / 3, d.length / 3 * 2),
    b: d.slice(d.length / 3 * 2, d.length)
  }, s = {
    r: m(i.r, { width: e, height: e }),
    g: m(i.g, { width: e, height: e }),
    b: m(i.b, { width: e, height: e })
  }, c = new ImageData(e, e);
  for (let g = 0; g < c.data.length; g += 4)
    c.data[g] = s.r.data[g], c.data[g + 1] = s.g.data[g + 1], c.data[g + 2] = s.b.data[g + 2], c.data[g + 3] = 255;
  return c;
}, x = (t) => t.slice(0, t.length - t[t.length - 1]);
class y {
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
  }, d = new y().binarization;
  for (let r = 0; r < t.data.length; r += 4) {
    const h = {
      r: d(t.data[r]),
      g: d(t.data[r + 1]),
      b: d(t.data[r + 2]),
      a: 255
    };
    n.r.data[r] = h.r, n.r.data[r + 1] = h.r, n.r.data[r + 2] = h.r, n.r.data[r + 3] = h.a, n.g.data[r] = h.g, n.g.data[r + 1] = h.g, n.g.data[r + 2] = h.g, n.g.data[r + 3] = h.a, n.b.data[r] = h.b, n.b.data[r + 1] = h.b, n.b.data[r + 2] = h.b, n.b.data[r + 3] = h.a;
  }
  const i = l(n.r.data, n.r.width, n.r.height), s = l(n.g.data, n.g.width, n.g.height), c = l(n.b.data, n.b.width, n.b.height);
  if (!i || !s || !c) return;
  const g = new Uint8Array([...i.binaryData, ...s.binaryData, ...c.binaryData]);
  return x(g);
}, A = {
  generate: u,
  recognize: z
};
export {
  A as default
};

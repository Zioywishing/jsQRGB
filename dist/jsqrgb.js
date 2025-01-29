var o = Object.defineProperty;
var b = (a, e, t) => e in a ? o(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var m = (a, e, t) => b(a, typeof e != "symbol" ? e + "" : e, t);
import f from "qrcode";
import w from "jsqr";
const u = (a) => new Uint8Array([...a, ...new Array(3 - a.length % 3).fill(0).map((e, t) => t)]), l = (a, e) => {
  const t = new OffscreenCanvas(e.width, e.height), r = t.getContext("2d");
  return f.toCanvas(t, [{ data: a, mode: "byte" }], e), r.getImageData(0, 0, e.width, e.height);
}, y = (a, e) => {
  const {
    size: t = 600
  } = e || {}, r = typeof a == "string" ? new TextEncoder().encode(a) : a, s = u(r), d = {
    r: new Uint8Array([0, ...s.slice(0, s.length / 3)]),
    g: new Uint8Array([1, ...s.slice(s.length / 3, s.length * 2 / 3)]),
    b: new Uint8Array([2, ...s.slice(s.length * 2 / 3, s.length)])
  }, h = {
    r: l(d.r, { width: t, height: t }),
    g: l(d.g, { width: t, height: t }),
    b: l(d.b, { width: t, height: t })
  }, i = new ImageData(t, t);
  for (let g = 0; g < i.data.length; g += 4)
    i.data[g] = h.r.data[g], i.data[g + 1] = h.g.data[g + 1], i.data[g + 2] = h.b.data[g + 2], i.data[g + 3] = 255;
  return i;
}, D = (a) => a.slice(0, a.length - a[a.length - 1]);
class A {
  constructor(e) {
    m(this, "threshold");
    m(this, "min");
    m(this, "max");
    m(this, "cache", /* @__PURE__ */ new Map());
    m(this, "binarization", (e) => {
      if (this.cache.has(e)) return this.cache.get(e);
      const t = e >= this.threshold ? this.max : this.min;
      return this.cache.set(e, t), t;
    });
    e === void 0 || (e = {}), this.threshold = (e == null ? void 0 : e.threshold) ?? 150, this.min = (e == null ? void 0 : e.min) ?? 0, this.max = (e == null ? void 0 : e.max) ?? 255;
  }
}
const x = (a) => {
  const { width: e, height: t } = a, r = {
    r: new ImageData(e, t),
    g: new ImageData(e, t),
    b: new ImageData(e, t)
  }, s = new A().binarization;
  for (let n = 0; n < a.data.length; n += 4) {
    const c = {
      r: s(a.data[n]),
      g: s(a.data[n + 1]),
      b: s(a.data[n + 2]),
      a: 255
    };
    r.r.data[n] = c.r, r.r.data[n + 1] = c.r, r.r.data[n + 2] = c.r, r.r.data[n + 3] = c.a, r.g.data[n] = c.g, r.g.data[n + 1] = c.g, r.g.data[n + 2] = c.g, r.g.data[n + 3] = c.a, r.b.data[n] = c.b, r.b.data[n + 1] = c.b, r.b.data[n + 2] = c.b, r.b.data[n + 3] = c.a;
  }
  const d = w(r.r.data, r.r.width, r.r.height), h = w(r.g.data, r.g.width, r.g.height), i = w(r.b.data, r.b.width, r.b.height);
  if (!d || !h || !i) return;
  const g = new Uint8Array([d.binaryData, h.binaryData, i.binaryData].sort((n, c) => n[0] - c[0]).map((n) => n.slice(1)).flat());
  return D(g);
};
function z(a) {
  return new Worker(
    "/assets/generate-BPkU51SX.js",
    {
      name: a == null ? void 0 : a.name
    }
  );
}
function k(...a) {
  const e = new z(), t = new Promise((r, s) => {
    e.addEventListener("message", (d) => {
      r(d.data);
    }), e.addEventListener("error", (d) => {
      s(d.error);
    });
  });
  return e.postMessage(a), t.finally(() => {
    e.terminate();
  });
}
function C(a) {
  return new Worker(
    "/assets/recognize-ff6OA219.js",
    {
      name: a == null ? void 0 : a.name
    }
  );
}
async function I(...a) {
  const e = new C(), t = new Promise((r, s) => {
    e.addEventListener("message", (d) => {
      console.log("r", d.data), r(d.data);
    }), e.addEventListener("error", (d) => {
      s(d.error);
    });
  });
  return e.postMessage(a), t.finally(() => {
    e.terminate();
  });
}
const R = {
  generate: y,
  recognize: x,
  generateAsync: k,
  recognizeAsync: I
};
export {
  R as default
};

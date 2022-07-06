function die(r) {
    alert(r), undefinedFunction();
}
function debug_log(r) {
    frame1();
}
function hex(r) {
    return ("0" + r.toString(16)).substr(-2);
}
function hexlify(r) {
    for (var n = [], t = 0; t < r.length; t++) n.push(hex(r[t]));
    return n.join("");
}
function unhexlify(r) {
    if (r.length % 2 == 1) throw new TypeError("Invalid hex string");
    for (var n = new Uint8Array(r.length / 2), t = 0; t < r.length; t += 2) n[t / 2] = parseInt(r.substr(t, 2), 16);
    return n;
}
function hexdump(r) {
    void 0 !== r.BYTES_PER_ELEMENT && (r = Array.from(r));
    for (var n = [], t = 0; t < r.length; t += 16) {
        var e = r.slice(t, t + 16).map(hex);
        8 < e.length && e.splice(8, 0, " "), n.push(t.toString(16) + " : " + e.join(" "));
    }
    return n.join("\n");
}
function buf2hex(r) {
    return Array.prototype.map.call(new Uint8Array(r), (r) => ("00" + r.toString(16)).slice(-2)).join("");
}
var Struct = (function () {
        var e = new ArrayBuffer(8),
            t = new Uint8Array(e),
            r = new Uint32Array(e),
            n = new Float64Array(e);
        return {
            pack: function (r, n, t) {
                return (r[0] = n), new Uint8Array(e, 0, r.BYTES_PER_ELEMENT);
            },
            unpack: function (r, n) {
                if (n.length !== r.BYTES_PER_ELEMENT) throw Error("Invalid bytearray");
                return t.set(n), r[0];
            },
            int8: t,
            int32: r,
            float64: n,
        };
    })(),
    backingBuffer = new ArrayBuffer(8),
    f = new Float32Array(backingBuffer),
    i = new Uint32Array(backingBuffer);
function i2f(r) {
    return (i[0] = r), f[0];
}
function f2i(r) {
    return (f[0] = r), i[0];
}
function str2array(r, n, t) {
    void 0 === t && (t = 0);
    for (var e = new Array(n), i = 0; i < n; i++) e[i] = r.charCodeAt(i + t);
    return e;
}

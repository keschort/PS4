function Int64(n, t) {
    var o = new Uint8Array(8);
    if (2 < arguments.length || 0 == arguments.length) throw TypeError("Incorrect number of arguments to constructor");
    if (2 == arguments.length) {
        if ("number" != typeof n || "number" != typeof t) throw TypeError("Both arguments must be numbers");
        if (4294967295 < n || 4294967295 < t || n < 0 || t < 0) throw RangeError("Both arguments must fit inside a uint32");
        n = n.toString(16);
        for (let t = 0; t < 8 - n.length; t++) n = "0" + n;
        n = "0x" + t.toString(16) + n;
    }
    switch (typeof n) {
        case "number":
            n = "0x" + Math.floor(n).toString(16);
        case "string":
            "0x" === n.substr(0, 2) && (n = n.substr(2)), n.length % 2 == 1 && (n = "0" + n);
            for (var r = unhexlify(n, 8), e = [], i = 0; i < r.length; i++) e[i] = r[i];
            o.set(e.reverse());
            break;
        case "object":
            if (n instanceof Int64) o.set(n.bytes());
            else {
                if (8 != n.length) throw TypeError("Array must have excactly 8 elements.");
                o.set(n);
            }
    }
    function u(r, e) {
        return function () {
            if (arguments.length != e) throw Error("Not enough arguments for function " + r.name);
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n] instanceof Int64 ? arguments[n] : new Int64(arguments[n]);
            return r.apply(this, t);
        };
    }
    (this.asDouble = function () {
        if (255 == o[7] && (255 == o[6] || 254 == o[6])) throw new RangeError("Can not be represented by a double");
        return Struct.unpack(Struct.float64, o);
    }),
        (this.asInteger = function () {
            if (0 != o[7] || 32 < o[6]) throw (debug_log("SOMETHING BAD HAS HAPPENED!!!"), new RangeError("Can not be represented as a regular number"));
            return Struct.unpack(Struct.int64, o);
        }),
        (this.asJSValue = function () {
            if ((0 == o[7] && 0 == o[6]) || (255 == o[7] && 255 == o[6])) throw new RangeError("Can not be represented by a JSValue");
            return Struct.unpack(Struct.float64, this.sub(281474976710656).bytes());
        }),
        (this.bytes = function () {
            for (var t = [], n = 0; n < o.length; n++) t.push(o[n]);
            return t;
        }),
        (this.byteAt = function (t) {
            return o[t];
        }),
        (this.toString = function () {
            for (var t = [], n = 0; n < o.length; n++) t.push(o[n]);
            return "0x" + hexlify(t.reverse());
        }),
        (this.low32 = function () {
            return new Uint32Array(o.buffer)[0] >>> 0;
        }),
        (this.hi32 = function () {
            return new Uint32Array(o.buffer)[1] >>> 0;
        }),
        (this.equals = function (t) {
            t instanceof Int64 || (t = new Int64(t));
            for (var n = 0; n < 8; n++) if (o[n] != t.byteAt(n)) return !1;
            return !0;
        }),
        (this.greater = function (t) {
            return t instanceof Int64 || (t = new Int64(t)), this.hi32() > t.hi32() || (this.hi32() === t.hi32() && this.low32() > t.low32());
        }),
        (this.neg = u(function () {
            for (var t = [], n = 0; n < 8; n++) t[n] = ~this.byteAt(n);
            return new Int64(t).add(Int64.One);
        }, 0)),
        (this.add = u(function (t) {
            for (var n = [], r = 0, e = 0; e < 8; e++) {
                var o = this.byteAt(e) + t.byteAt(e) + r,
                    r = (255 < o) | 0;
                n[e] = o;
            }
            return new Int64(n);
        }, 1)),
        (this.assignAdd = u(function (t) {
            for (var n = 0, r = 0; r < 8; r++) {
                var e = this.byteAt(r) + t.byteAt(r) + n,
                    n = (255 < e) | 0;
                o[r] = e;
            }
            return this;
        }, 1)),
        (this.sub = u(function (t) {
            for (var n = [], r = 0, e = 0; e < 8; e++) {
                var o = this.byteAt(e) - t.byteAt(e) - r,
                    r = (o < 0) | 0;
                n[e] = o;
            }
            return new Int64(n);
        }, 1));
}
(Int64.fromDouble = function (t) {
    return new Int64(Struct.pack(Struct.float64, t));
}),
    (Int64.Zero = new Int64(0)),
    (Int64.One = new Int64(1)),
    (Int64.NegativeOne = new Int64(4294967295, 4294967295));

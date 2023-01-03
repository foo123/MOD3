/**
*   MOD3 3D Modifier Library for JavaScript
*   port of AS3DMod ActionScript3 library (http://code.google.com/p/as3dmod/)
*
*   @version 1.0.0 (2023-01-03 16:08:34)
*   https://github.com/foo123/MOD3
*
**//**
*   MOD3 3D Modifier Library for JavaScript
*   port of AS3DMod ActionScript3 library (http://code.google.com/p/as3dmod/)
*
*   @version 1.0.0 (2023-01-03 16:08:34)
*   https://github.com/foo123/MOD3
*
**/
!function(root, name, factory) {
"use strict";
if (('object' === typeof module) && module.exports) /* CommonJS */
    (module.$deps = module.$deps||{}) && (module.exports = module.$deps[name] = factory.call(root));
else if (('function' === typeof define) && define.amd && ('function' === typeof require) && ('function' === typeof require.specified) && require.specified(name) /*&& !require.defined(name)*/) /* AMD */
    define(name, ['module'], function(module) {factory.moduleUri = module.uri; return factory.call(root);});
else if (!(name in root)) /* Browser/WebWorker/.. */
    (root[name] = factory.call(root)||1) && ('function' === typeof(define)) && define.amd && define(function() {return root[name];});
}(  /* current root */          'undefined' !== typeof self ? self : this,
    /* module name */           "MOD3",
    /* module factory */        function ModuleFactory__MOD3(undef) {
"use strict";

var HAS = Object.prototype.hasOwnProperty,
    toString = Object.prototype.toString,
    def = Object.defineProperty,
    stdMath = Math, PI = stdMath.PI,
    TWO_PI = 2*PI, HALF_PI = PI/2, INV_PI = 1/PI,
    EMPTY_ARR = [], EMPTY_OBJ = {}, NOP = function() {},
    isNode = ("undefined" !== typeof global) && ("[object global]" === toString.call(global)),
    isBrowser = ("undefined" !== typeof window) && ("[object Window]" === toString.call(window))
;

// basic backwards-compatible "class" construction
function makeSuper(superklass)
{
    var called = {};
    return function $super(method, args) {
        var self = this, m = ':'+method, ret;
        if (1 === called[m]) return (superklass.prototype.$super || NOP).call(self, method, args);
        called[m] = 1;
        ret = ('constructor' === method ? superklass : (superklass.prototype[method] || NOP)).apply(self, args || []);
        called[m] = 0;
        return ret;
    };
}
function makeClass(superklass, klass, statik)
{
    if (arguments.length < 2)
    {
        klass = superklass;
        superklass = null;
    }
    var C = HAS.call(klass, 'constructor') ? klass.constructor : function() {}, p;
    if (superklass)
    {
        C.prototype = Object.create(superklass.prototype);
        C.prototype.$super = makeSuper(superklass);
    }
    else
    {
        C.prototype.$super = NOP;
    }
    C.prototype.constructor = C;
    for (p in klass)
    {
        if (HAS.call(klass, p) && ('constructor' !== p))
        {
            C.prototype[p] = klass[p];
        }
    }
    if (statik)
    {
        for (p in statik)
        {
            if (HAS.call(statik, p))
            {
                C[p] = statik[p];
            }
        }
    }
    return C;
}
var MOD3 = {
    VERSION: "1.0.0",
    Class: makeClass
};
/**
* MOD3  Constants and Auxilliary methods
**/
MOD3.Constants = {
    // cache math constants for reference and optimization
    PI: PI,
    invPI: INV_PI,
    halfPI: HALF_PI,
    doublePI: TWO_PI,
    toRad: PI/180,
    toDeg: 180/PI
};
MOD3.ModConstant = {
    NONE: 0,
    LEFT: -1,
    RIGHT: 1,

    X: 1,
    Y: 2,
    Z: 4,

    Xi: 0,
    Yi: 1,
    Zi: 2
};
MOD3.XYZi = [
    null,
    0,
    1,
    null,
    2
];
MOD3.iXYZ = [
    1,
    2,
    4
];
MOD3.xyz = [
    "x",
    "y",
    "z"
];
MOD3.XYZ = [
    "X",
    "Y",
    "Z"
];

// Typed Arrays Substitutes
MOD3.Array32F = typeof Float32Array !== "undefined" ? Float32Array : Array;
MOD3.Array64F = typeof Float64Array !== "undefined" ? Float64Array : Array;
MOD3.Array8I = typeof Int8Array !== "undefined" ? Int8Array : Array;
MOD3.Array16I = typeof Int16Array !== "undefined" ? Int16Array : Array;
MOD3.Array32I = typeof Int32Array !== "undefined" ? Int32Array : Array;
MOD3.Array8U = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
MOD3.Array16U = typeof Uint16Array !== "undefined" ? Uint16Array : Array;
MOD3.Array32U = typeof Uint32Array !== "undefined" ? Uint32Array : Array;
// vector typed-array
MOD3.VecArray = MOD3.Array32F;
/**
* MOD3  Math Utilities Class
**/
MOD3.XMath = {
    normalize: function(start, end, val) {
        var range = end - start;
        return 0 === range ? 1 : MOD3.XMath.trim(0, 1, (val - start)/end);
    },

    toRange: function(start, end, normalized) {
        var range = end - start;
        return 0 === range ? 0 : (start + range*normalized);
    },

    inRange: function(start, end, value, excluding) {
        return false !== excluding ? (value >= start && value <= end) : (value > start && value < end);
    },

    sign: function(val, ifZero) {
        return 0 === val ? (ifZero || 0) : (val > 0 ? 1 : -1);
    },

    trim: function(start, end, value) {
        return value < start ? start : (value > end ? end : value);
    },

    wrap: function(start, end, value) {
        var r = end - start;
        return value < start ? (value + r) : (value >= end ? value - r : value);
    },

    degToRad: function(deg) {
        return deg/180*PI;
    },

    radToDeg: function(rad)  {
        return rad/PI*180;
    },

    presicion: function(number, precision) {
        var r = stdMath.pow(10, precision);
        return stdMath.round(number*r)/r;
    },

    uceil: function(val) {
        return val < 0 ? stdMath.floor(val) : stdMath.ceil(val);
    }
};
// alias
MOD3.XMath.clamp = MOD3.XMath.trim;
/**
* MOD3  Range Auxilliary Class
**/
MOD3.Range = MOD3.Class({
    constructor: function Range(s, e)  {
        var self = this;
        if (!(self instanceof Range)) return new Range(s, e);
        self.start = null != s ? s : 0;
        self.end = null != e ? e : 1;
    },

    name: "Range",
    start: 0,
    end: 1,

    dispose: function() {
        var self = this;
        self.start = null;
        self.end = null;
        return self;
    },

    getSize: function()  {
        return this.end - this.start;
    },

    move: function(amount)  {
        this.start += amount;
        this.end += amount;
    },

    isIn: function(n) {
        return (n >= this.start && n <= this.end);
    },

    normalize: function(n) {
        return MOD3.XMath.normalize(this.start, this.end, n);
    },

    toRange: function(n) {
        return MOD3.XMath.toRange(this.start, this.end, n);
    },

    trim: function(n) {
        return MOD3.XMath.trim(this.start, this.end, n);
    },

    interpolate: function(n, r) {
        return MOD3.XMath.toRange(this.start, this.end, r.normalize(n));
    },

    toString: function() {
        return "[" + this.start + " - " + this.end + "]";
    }
});
/**
* MOD3  Phase Auxilliary Class
**/
MOD3.Phase = MOD3.Class({
    constructor: function Phase(v) {
        var self = this;
        if (!(self instanceof Phase)) return new Phase(v);
        self.value = v || 0;
    },

    name: "Phase",
    value: 0,

    dispose: function() {
        this.value = null;
        return this;
    },

    getPhasedValue: function()  {
        return stdMath.sin(this.value);
    },

    getAbsPhasedValue: function()  {
        return stdMath.abs(stdMath.sin(this.value));
    },

    getNormValue: function() {
        return (stdMath.sin(this.value) + 1)*0.5;
    }
});
/**
* MOD3  2D Point Class
**/
MOD3.Point = MOD3.Class({
    constructor: function Point(x, y) {
        var self = this;
        if (!(self instanceof Point)) return new Point(x, y);
        self.x = x || 0;
        self.y = y || 0;
    },

    name: "Point",
    x: 0,
    y: 0,

    dispose: function() {
        var self = this;
        self.x = null;
        self.y = null;
        return self;
    },

    clone: function() {
        return new MOD3.Point(this.x, this.y);
    }
});
/**
* MOD3  2D Transform Matrix Class
**/
MOD3.Matrix = MOD3.Class(null, {
    constructor: function Matrix(m11, m12,
                                 m21, m22)
   {
        var self = this;
        if (!(self instanceof Matrix)) return new Matrix(m11, m12,
                                                         m21, m22);
        self.m = new MOD3.VecArray([
            m11 == null ? 1 : m11,
            m12 == null ? 0 : m12,
            m21 == null ? 0 : m21,
            m22 == null ? 1 : m22
        ]);
    },

    name: "Matrix",
    m: null,

    dispose: function() {
        this.m = null;
        return this;
    },

    reset: function() {
        var m = this.m;
        m[0] = 1; m[1] = 0;
        m[2] = 0; m[3] = 1;
        return this;
    },

    rotate: function(angle)  {
        var m = this.m, c = stdMath.cos(angle), s = stdMath.sin(angle);
        m[0] = c; m[1] = -s;
        m[2] = s; m[3] = c;
        return this;
    },

    scale: function(sx, sy) {
        var m = this.m;
        m[0] = 1; m[1] = 0;
        m[2] = 0; m[3] = 1;
        if (sx != null)
        {
            m[0] = sx;
            m[3] = sx;
        }
        if (sy != null)
        {
            m[3] = sy;
        }
        return this;
    },

    multiply: function(b) {
        return MOD3.Matrix.mult(this, b);
    },

    transformPoint: function(p) {
        var xy = MOD3.Matrix.transform(this, [p.x, p.y]);
        return new MOD3.Point(xy[0], xy[1]);
    },

    transformPointSelf: function(p) {
        var xy = MOD3.Matrix.transform(this, [p.x, p.y]);
        p.x = xy[0]; p.y = xy[1];
        return p;
    },

    clone: function() {
        var m = this.m;
        return new MOD3.Matrix(m[0], m[1],
                          m[2], m[3]);
    }
}, {
    transform: function(m2, xy) {
        var m = m2.m, x = xy[0], y = xy[1];
        xy[0] = m[0]*x + m[1]*y;
        xy[1] = m[2]*x + m[3]*y;
        return xy;
    },

    mult: function(m1, m2) {
        var a = m1.m, b = m2.m, a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
        a[0] = a0*b[0] + a1*b[2];
        a[1] = a0*b[1] + a1*b[3];
        a[2] = a2*b[0] + a3*b[2];
        a[3] = a2*b[1] + a3*b[3];
        return m1;
    }
});
/**
* MOD3  Vector3 Class
**/
MOD3.Vector3 = MOD3.Class(null, {
    constructor: function Vector3(x, y, z) {
        var self = this;
        if (!(self instanceof Vector3)) return new Vector3(x, y, z);

        // use an internal typed-array for speed
        var v = new MOD3.VecArray(3);
        if (x && (3 === x.length))
        {
            // array passed
            v[0] = x[0] || 0;
            v[1] = x[1] || 0;
            v[2] = x[2] || 0;
        }
        else
        {
            // numbers passed
            v[0] = x || 0;
            v[1] = y || 0;
            v[2] = z || 0;
        }
        self.xyz = v;
    },

    name: "Vector3",
    xyz: null,

    dispose: function() {
        this.xyz = null;
        return this;
    },

    getXYZ: function() {
       // copy it
       return new MOD3.VecArray(this.xyz);
    },

    getXYZRef: function() {
       return this.xyz;
    },

    setXYZ: function(w) {
       var v = this.xyz;
       v[0] = w[0];
       v[1] = w[1];
       v[2] = w[2];
       return this;
    },

    setXYZRef: function(xyz) {
       this.xyz = xyz;
       return this;
    },

    clone: function() {
        return new MOD3.Vector3(this.xyz);
    },

    equalsSelf: function(b) {
        var v = this.xyz, w = b.xyz;
        return (v[0] === w[0]) && (v[1] === w[1]) && (v[2] === w[2]);
    },

    zeroSelf: function() {
        var v = this.xyz;
        v[0] = 0; v[1] = 0; v[2] = 0;
        return this;
    },

    negate: function() {
        var v = this.xyz;
        return new MOD3.Vector3(-v[0], -v[1], -v[2]);
    },

    negateSelf: function() {
        var v = this.xyz;
        v[0] = -v[0]; v[1] = -v[1]; v[2] = -v[2];
        return this;
    },

    add: function(b) {
        var v = this.xyz, w = b.xyz;
        return new MOD3.Vector3(v[0] + w[0], v[1] + w[1], v[2] + w[2]);
    },

    addSelf: function(b) {
        var v = this.xyz, w = b.xyz;
        v[0] += w[0]; v[1] += w[1]; v[2] += w[2];
        return this;
    },

    subtract: function(b) {
        var v = this.xyz, w = b.xyz;
        return new MOD3.Vector3(v[0] - w[0], v[1] - w[1], v[2] - w[2]);
    },

    subtractSelf: function(b) {
        var v = this.xyz, w = b.xyz;
        v[0] -= w[0]; v[1] -= w[1]; v[2] -= w[2];
        return this;
    },

    multiplyScalar: function(s) {
        var v = this.xyz;
        return new MOD3.Vector3(v[0]*s, v[1]*s, v[2]*s);
    },

    multiplyScalarSelf: function(s) {
        var v = this.xyz;
        v[0] *= s; v[1] *= s; v[2] *= s;
        return this;
    },

    multiply: function(b) {
        var v = this.xyz, w = b.xyz;
        return new MOD3.Vector3(v[0] * w[0], v[1] * w[1], v[2] * w[2]);
    },

    multiplySelf: function(b) {
        var v = this.xyz, w = b.xyz;
        v[0] *= w[0]; v[1] *= w[1]; v[2] *= w[2];
        return this;
    },

    divide: function(s) {
        var v = this.xyz;
        return new MOD3.Vector3(v[0] / s, v[1] / s, v[2] / s);
    },

    divideSelf: function(s) {
        var v = this.xyz;
        v[0] /= s; v[1] /= s; v[2] /= s;
        return this;
    },

    normalize: function() {
        var v = this.xyz,
            x = v[0], y = v[1], z = v[2],
            m = x * x + y * y + z * z, n;
        if (0 < m)
        {
            n = stdMath.sqrt(m);
            x /= n;
            y /= n;
            z /= n;
        }
        return new MOD3.Vector3(x, y, z);
    },

    normalizeSelf: function() {
        var v = this.xyz,
            x = v[0], y = v[1], z = v[2],
            m = x * x + y * y + z * z, n;
        if (0 < m)
        {
            n = stdMath.sqrt(m);
            x /= n;
            y /= n;
            z /= n;
        }
        v[0] = x; v[1] = y; v[2] = z;
        return this;
    },

    getMagnitude: function() {
        var v = this.xyz, x = v[0], y = v[1], z = v[2];
        return stdMath.sqrt(x*x + y*y + z*z);
    },

    setMagnitude: function(m) {
        this.normalizeSelf();
        var v = this.xyz;
        v[0] *= m; v[1] *= m; v[2] *= m;
        return this;
    },

    dot: function(b) {
        var v = this.xyz, w = b.xyz;
        return v[0]*w[0] + v[1]*w[1] + v[2]*w[2];
    },

    cross: function(b) {
        var v = this.xyz, w = b.xyz,
            x1 = v[0], y1 = v[1], z1 = v[2],
            x2 = w[0], y2 = w[1], z2 = w[2];
        return new MOD3.Vector3(y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
    },

    crossSelf: function(v) {
        var v = this.xyz, w = b.xyz,
            x1 = v[0], y1 = v[1], z1 = v[2],
            x2 = w[0], y2 = w[1], z2 = w[2];
        v[0] = y1 * z2 - z1 * y2;
        v[1] = z1 * x2 - x1 * z2;
        v[2] = x1 * y2 - y1 * x2;
        return this;
    },

    distance: function(b) {
        var v = this.xyz, w = b.xyz,
            dx = v[0] - w[0],
            dy = v[1] - w[1],
            dz = v[2] - w[2];
        return stdMath.sqrt(dx*dx + dy*dy + dz*dz);
    },

    toString: function() {
        var v = this.xyz;
        return "[" + v[0] + " , " + v[1] + " , " + v[2] + "]";
    }
}, {
    ZERO: function() {
        return new MOD3.Vector3(0, 0, 0);
    },

    X: function(direct_or_complement) {
        return false === direct_or_complement ? new MOD3.Vector3(0, 1, 1) : new MOD3.Vector3(1, 0, 0);
    },

    Y: function(direct_or_complement) {
        return false === direct_or_complement ? new MOD3.Vector3(1, 0, 1) : new MOD3.Vector3(0, 1, 0);
    },

    Z: function(direct_or_complement) {
        return false === direct_or_complement ? new MOD3.Vector3(1, 1, 0) : new MOD3.Vector3(0, 0, 1);
    },

    dot: function(v, w) {
        return v[0]*w[0] + v[1]*w[1] + v[2]*w[2];
    },

    equals: function(v, w) {
        return (v[0] === w[0]) && (v[1] === w[1]) && (v[2] === w[2]);
    },

    cross: function(v, w) {
        var vw = new MOD3.VecArray(3);
        vw[0] = v[1] * w[2] - v[2] * w[1];
        vw[1] = v[2] * w[0] - v[0] * w[2];
        vw[2] = v[0] * w[1] - v[1] * w[0];
        return vw;
    },

    mod: function(v) {
        var x = v[0], y = v[1], z = v[2];
        return stdMath.sqrt(x*x + y*y + z*z);
    },

    dist: function(v, w) {
        var dx = v[0] - w[0],
            dy = v[1] - w[1],
            dz = v[2] - w[2];
        return stdMath.sqrt(dx*dx + dy*dy + dz*dz);
    },

    add: function(v, w) {
        v[0] += w[0];
        v[1] += w[1];
        v[2] += w[2];
        return v;
    },

    sub: function(v, w) {
        v[0] -= w[0];
        v[1] -= w[1];
        v[2] -= w[2];
        return v;
    },

    mul: function(v, w) {
        v[0] *= w[0];
        v[1] *= w[1];
        v[2] *= w[2];
        return v;
    },

    muls: function(v, m) {
        v[0] *= m;
        v[1] *= m;
        v[2] *= m;
        return v;
    },

    norm: function(v) {
        var x = v[0], y = v[1], z = v[2],
            m = x*x + y*y + z*z, n;
        if (0 < m)
        {
            n = stdMath.sqrt(m);
            x /= n;
            y /= n;
            z /= n;
        }
        v[0] = x; v[1] = y; v[2] = z;
        return v;
    }
});
// alaises
MOD3.Vector3.modulo = MOD3.Vector3.mod;
MOD3.Vector3.distance = MOD3.Vector3.dist;
MOD3.Vector3.prototype.dotSelf = MOD3.Vector3.prototype.dot;
MOD3.Vector3.prototype.distanceSelf = MOD3.Vector3.prototype.distance;
/**
* MOD3  3D Transform Matrix Class
**/
MOD3.Matrix4 = MOD3.Class(null, {
    constructor: function Matrix4(n11, n12, n13, n14,
                                   n21, n22, n23, n24,
                                   n31, n32, n33, n34,
                                   n41, n42, n43, n44)
    {
        var self = this;
        if (!(self instanceof Matrix4)) return new Matrix4(n11, n12, n13, n14,
                                                           n21, n22, n23, n24,
                                                           n31, n32, n33, n34,
                                                           n41, n42, n43, n44);
        self.m = new MOD3.VecArray([
            n11 == null ? 1 : n11,
            n12 == null ? 0 : n12,
            n13 == null ? 0 : n13,
            n14 == null ? 0 : n14,

            n21 == null ? 0 : n21,
            n22 == null ? 1 : n22,
            n23 == null ? 0 : n23,
            n24 == null ? 0 : n24,

            n31 == null ? 0 : n31,
            n32 == null ? 0 : n32,
            n33 == null ? 1 : n33,
            n34 == null ? 0 : n34,

            n41 == null ? 0 : n41,
            n42 == null ? 0 : n42,
            n43 == null ? 0 : n43,
            n44 == null ? 1 : n44
        ]);
    },

    name: "Matrix4",
    m: null,

    dispose: function() {
        this.m = null;
        return this;
    },

    reset: function() {
        var m = this.m;
        m[0 ] = 1; m[1 ] = 0; m[2 ] = 0; m[3 ] = 0;
        m[4 ] = 0; m[5 ] = 1; m[6 ] = 0; m[7 ] = 0;
        m[8 ] = 0; m[9 ] = 0; m[10] = 1; m[11] = 0;
        m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1;
        return this;
    },

    translate: function(tx, ty, tz, reset) {
        var m = this.m;
        if (true === reset) this.reset();
        m[3 ] = tx;
        m[7 ] = ty;
        m[11] = tz;
        return this;
    },

    scale: function(sx, sy, sz, reset) {
        var m = this.m;
        if (true === reset) this.reset();
        m[0 ] = sx;
        m[5 ] = sy;
        m[10] = sz;
        return this;
    },

    rotate: function(rx, ry, rz, theta, reset)  {
        var m = this.m,
            nCos = stdMath.cos(theta), nSin = stdMath.sin(theta), scos = 1 - nCos,
            sxy = rx*ry*scos, syz = ry*rz*scos, sxz = rx*rz*scos,
            sz = nSin*rz, sy = nSin*ry, sx = nSin*rx
        ;
        if (true === reset) this.reset();
        m[0 ] = nCos + rx*rx*scos;
        m[1 ] = -sz + sxy;
        m[2 ] = sy + sxz;
        m[3 ] = 0;

        m[4 ] = sz + sxy;
        m[5 ] = nCos + ry*ry*scos;
        m[6 ] = -sx + syz;
        m[7 ] = 0;

        m[8 ] = -sy + sxz;
        m[9 ] = sx + syz;
        m[10] = nCos + rz*rz*scos;
        m[11] = 0;
        return this;
    },

    translateFromVector: function(v, reset) {
        return this.translate(v.xyz[0], v.xyz[1], v.xyz[2], reset);
    },

    scaleFromVector: function(v, reset) {
        return this.scale(v.xyz[0], v.xyz[1], v.xyz[2], reset);
    },

    rotateFromVector: function(v, theta, reset)  {
        return this.rotate(v.xyz[0], v.xyz[1], v.xyz[2], theta, reset);
    },

    multiply: function(b) {
        return MOD3.Matrix4.mult(this, b);
    },

    multiplyVector: function(v) {
        MOD3.Matrix4.multXYZ(this, v.xyz);
        return v;
    }
}, {
    multXYZ: function(m4, v) {
        var m = m4.m, x = v[0], y = v[1], z = v[2];
        v[0] = x*m[0 ] + y*m[1 ] + z*m[2 ] + m[3 ];
        v[1] = x*m[4 ] + y*m[5 ] + z*m[6 ] + m[7 ];
        v[2] = x*m[8 ] + y*m[9 ] + z*m[10] + m[11];
        return v;
    },

    mult: function(m1, m2) {
        var a = m1.m, b = m2.m,
            a11 = a[0 ], b11 = b[0 ],
            a21 = a[4 ], b21 = b[4 ],
            a31 = a[8 ], b31 = b[8 ],
            a12 = a[1 ], b12 = b[1 ],
            a22 = a[5 ], b22 = b[5 ],
            a32 = a[9 ], b32 = b[9 ],
            a13 = a[2 ], b13 = b[2 ],
            a23 = a[6 ], b23 = b[6 ],
            a33 = a[10], b33 = b[10],
            a14 = a[3 ], b14 = b[3 ],
            a24 = a[7 ], b24 = b[7 ],
            a34 = a[11], b34 = b[11];

        a[0 ] = a11*b11 + a12*b21 + a13*b31;
        a[1 ] = a11*b12 + a12*b22 + a13*b32;
        a[2 ] = a11*b13 + a12*b23 + a13*b33;
        a[3 ] = a11*b14 + a12*b24 + a13*b34 + a14;

        a[4 ] = a21*b11 + a22*b21 + a23*b31;
        a[5 ] = a21*b12 + a22*b22 + a23*b32;
        a[6 ] = a21*b13 + a22*b23 + a23*b33;
        a[7 ] = a21*b14 + a22*b24 + a23*b34 + a24;

        a[8 ] = a31*b11 + a32*b21 + a33*b31;
        a[9 ] = a31*b12 + a32*b22 + a33*b32;
        a[10] = a31*b13 + a32*b23 + a33*b33;
        a[11] = a31*b14 + a32*b24 + a33*b34 + a34;
        return m1;
    }
});
// aliases
MOD3.Matrix4.prototype.translationMatrix = MOD3.Matrix4.prototype.translate;
MOD3.Matrix4.prototype.scaleMatrix = MOD3.Matrix4.prototype.scale;
MOD3.Matrix4.prototype.rotationMatrix = MOD3.Matrix4.prototype.rotate;
MOD3.Matrix4.prototype.translationMatrixFromVector = MOD3.Matrix4.prototype.translateFromVector;
MOD3.Matrix4.prototype.scaleMatrixFromVector = MOD3.Matrix4.prototype.scaleFromVector;
MOD3.Matrix4.prototype.rotationMatrixFromVector = MOD3.Matrix4.prototype.rotateFromVector;
// fast list utilities
MOD3.List = {
     operate: function operate(x, F, F0, i0, i1, reverse) {
        var len = x.length;
        if (arguments.length < 5) i1 = len-1;
        if (0 > i1) i1 += len;
        if (arguments.length < 4) i0 = 0;
        if (i0 > i1) return F0;
        if (true === reverse)
        {
        var i, k, l=i1-i0+1, l1=l-1, r=l&15, q=r&1, lr=l1-r, Fv=q?F(F0,x[i1],i1):F0;
        for (i=l1-q; i>lr; i-=2) { k = i0+i; Fv = F(F(Fv,x[k],k),x[k-1],k-1); }
        for (i=lr; i>=0; i-=16)  { k = i0+i; Fv = F(F(F(F(F(F(F(F(F(F(F(F(F(F(F(F(Fv,x[k],k),x[k-1],k-1),x[k-2],k-2),x[k-3],k-3),x[k-4],k-4),x[k-5],k-5),x[k-6],k-6),x[k-7],k-7),x[k-8],k-8),x[k-9],k-9),x[k-10],k-10),x[k-11],k-11),x[k-12],k-12),x[k-13],k-13),x[k-14],k-14),x[k-15],k-15); }
        }
        else
        {
        var i, k, l=i1-i0+1, r=l&15, q=r&1, Fv=q?F(F0,x[i0],i0):F0;
        for (i=q; i<r; i+=2)  { k = i0+i; Fv = F(F(Fv,x[k],k),x[k+1],k+1); }
        for (i=r; i<l; i+=16) { k = i0+i; Fv = F(F(F(F(F(F(F(F(F(F(F(F(F(F(F(F(Fv,x[k],k),x[k+1],k+1),x[k+2],k+2),x[k+3],k+3),x[k+4],k+4),x[k+5],k+5),x[k+6],k+6),x[k+7],k+7),x[k+8],k+8),x[k+9],k+9),x[k+10],k+10),x[k+11],k+11),x[k+12],k+12),x[k+13],k+13),x[k+14],k+14),x[k+15],k+15); }
        }
        return Fv;
    }

    ,each: function each(x, F, i0, i1, reverse) {
        if (null == x || !x.length) return x;
        var len = x.length;
        if (arguments.length < 4) i1 = len-1;
        if (0 > i1) i1 += len;
        if (arguments.length < 3) i0 = 0;
        if (i0 > i1) return x;
        var i, k, l=i1-i0+1, l1, lr, r, q;
        if (true === reverse)
        {
            l1=l-1; r=l&15; q=r&1; lr=l1-r;
            if (q) F(x[i1]);
            for (i=l1-q; i>lr; i-=2)
            {
                k = i0+i;
                F(x[k  ]);
                F(x[k-1]);
            }
            for (i=lr; i>=0; i-=16)
            {
                k = i0+i;
                F(x[k  ] );
                F(x[k-1] );
                F(x[k-2] );
                F(x[k-3] );
                F(x[k-4] );
                F(x[k-5] );
                F(x[k-6] );
                F(x[k-7] );
                F(x[k-8] );
                F(x[k-9] );
                F(x[k-10]);
                F(x[k-11]);
                F(x[k-12]);
                F(x[k-13]);
                F(x[k-14]);
                F(x[k-15]);
            }
        }
        else
        {
            r=l&15; q=r&1;
            if (q) F(x[i0]);
            for (i=q; i<r; i+=2)
            {
                k = i0+i;
                F(x[k  ]);
                F(x[k+1]);
            }
            for (i=r; i<l; i+=16)
            {
                k = i0+i;
                F(x[k  ] );
                F(x[k+1] );
                F(x[k+2] );
                F(x[k+3] );
                F(x[k+4] );
                F(x[k+5] );
                F(x[k+6] );
                F(x[k+7] );
                F(x[k+8] );
                F(x[k+9] );
                F(x[k+10]);
                F(x[k+11]);
                F(x[k+12]);
                F(x[k+13]);
                F(x[k+14]);
                F(x[k+15]);
            }
        }
        return x;
    }
};
/**
* MOD3  MeshProxy Super Class
**/
function dispose(o)
{
    o.dispose();
}
function reset(o)
{
    o.reset();
}
function collapse(o)
{
    o.collapse();
}

MOD3.FaceProxy = MOD3.Class(null, {
    constructor: function FaceProxy() {
        this.vertices = [];
    },

    name: "FaceProxy",
    vertices: null,

    dispose: function() {
        var self = this;
        self.vertices = null;
        return self;
    },

    addVertex: function(v)  {
        this.vertices.push(v);
    },

    getVertices: function() {
        return this.vertices;
    }
});

MOD3.VertexProxy = MOD3.Class(null, {
    constructor: function VertexProxy(vertex, mesh) {
        var self = this;
        self.mesh = mesh || null;
        // use internal typed-arrays for speed
        self.original = new MOD3.VecArray([0,0,0]);
        self.ratio = new MOD3.VecArray([0,0,0]);
        // vertex can be zero
        if (null != vertex) self.setVertex(vertex);
    },

    name: "VertexProxy",
    mesh: null,
    vertex: null,
    original: null,
    ratio: null,

    dispose: function() {
        var self = this;
        self.mesh = null;
        self.vertex = null;
        self.original = null;
        self.ratio = null;
        return self;
    },

    setVertex: function(vt)  {
        // override
        var self = this;
        self.vertex = vt;
        return self;
    },

    getRatioVector: function() {
        var r = this.ratio, rv = new MOD3.VecArray(3);
        rv[0] = r[0]; rv[1] = r[1]; rv[2] = r[2];
        return rv;
    },

    getRatio: function(axis) {
        return this.ratio[MOD3.XYZi[axis]] || 0;
    },

    setRatios: function(rx, ry, rz) {
        var r = this.ratio;
        r[0] = rx || 0;
        r[1] = ry || 0;
        r[2] = rz || 0;
        return this;
    },

    getOriginalValue: function(axis) {
        return this.original[MOD3.XYZi[axis]] || 0;
    },

    setOriginalPosition: function(ox, oy, oz) {
        var o = this.original;
        o[0] = ox || 0;
        o[1] = oy || 0;
        o[2] = oz || 0;
        return this;
    },

    getXYZ: function() {
        // override
        return new MOD3.VecArray([0,0,0]);
    },

    getX: function() {
        // override
        return 0;
    },

    getY: function() {
        // override
        return 0;
    },

    getZ: function() {
        // override
        return 0;
    },

    getValue: function(axis)  {
        var self = this;
        // override
        return MOD3.ModConstant.X === axis
            ? self.getX()
            : (MOD3.ModConstant.Y === axis
            ? self.getY()
            : (MOD3.ModConstant.Z === axis
            ? self.getZ()
            : 0))
        ;
    },

    setXYZ: function(xyz) {
        // override
        return this;
    },

    setX: function(vo) {
        // override
        return this;
    },

    setY: function(vo) {
        // override
        return this;
    },

    setZ: function(vo) {
        // override
        return this;
    },

    setValue: function(axis, vo) {
        var self = this;
        // override
        if (MOD3.ModConstant.X === axis)       self.setX(vo);
        else if (MOD3.ModConstant.Y === axis)  self.setY(vo);
        else if (MOD3.ModConstant.Z === axis)  self.setZ(vo);
        return self;
    },

    reset: function() {
        // override
        var self = this;
        self.setXYZ(self.original);
        return self;
    },

    collapse: function() {
        // override
        var self = this, xyz = self.getXYZ(), o = self.original;
        o[0] = xyz[0]; o[1] = xyz[1]; o[2] = xyz[2];
        return self;
    }
});

MOD3.MeshProxy = MOD3.Class(null, {
    constructor: function MeshProxy(mesh) {
        var self = this;
        self.maxX = 0;
        self.maxY = 0;
        self.maxZ = 0;

        self.minX = 0;
        self.minY = 0;
        self.minZ = 0;

        self.maxAxis = 0;
        self.midAxis = 0;
        self.minAxis = 0;

        self.width = 0;
        self.height = 0;
        self.depth = 0;

        self.vertices = null;
        self.faces = null;
        self.mesh = null;

        if (null != mesh) self.setMesh(mesh);
    },

    name: "MeshProxy",

    maxX: 0,
    maxY: 0,
    maxZ: 0,
    minX: 0,
    minY: 0,
    minZ: 0,

    maxAxis: 0,
    midAxis: 0,
    minAxis: 0,

    width: 0,
    height: 0,
    depth: 0,

    vertices : null,
    faces : null,
    mesh : null,
    v: null,

    dispose: function() {
        var self = this;
        self.maxX = null;
        self.maxY = null;
        self.maxZ = null;
        self.minX = null;
        self.minY = null;
        self.minZ = null;

        self.maxAxis = null;
        self.midAxis = null;
        self.minAxis = null;

        self.width = null;
        self.height = null;
        self.depth = null;

        self.disposeFaces();
        self.disposeVertices();
        self.mesh = null;
        self.v = null;
        return self;
    },

    disposeVertices: function() {
        var self = this;
        if (self.vertices) MOD3.List.each(self.vertices, dispose);
        self.vertices = null;
        return self;
    },

    disposeFaces: function() {
        var self = this;
        if (self.faces) MOD3.List.each(self.faces, dispose);
        self.faces = null;
        return self;
    },

    init: function(mesh) {
        var self = this;
        self.mesh = mesh;
        //self.vertices = [];
        // not used
        //self.faces = [];
        return self;
    },

    setMesh: function(mesh) {
        var self = this;
        self.init(mesh);
        self.preApply();
        self.analyzeGeometry()
        self.postApply();
        return self;
    },

    getVertices: function() {
        return this.vertices;
    },

    getFaces: function() {
        return this.faces;
    },

    applyModifiers: function(modStack) {
        var self = this, sl, i;
        for (i=0,sl=modStack.length; i<sl; ++i)
        {
            modStack[i].enabled && modStack[i].apply(self);
        }
        return self;
    },

    analyzeGeometry: function() {
        var self = this,
            vertices = self.vertices,
            minX = 0, minY = 0,  minZ = 0,
            maxX = 0, maxY = 0, maxZ = 0,
            width = 0, height = 0, depth = 0,
            maxe, mine, w
        ;
        if (!vertices || !vertices.length) return self;

        w = vertices[0].getXYZ();
        minX = w[0];
        minY = w[1];
        minZ = w[2];

        maxX = w[0];
        maxY = w[1];
        maxZ = w[2];

        MOD3.List.each(vertices, function(v) {
            var xyz = v.getXYZ(), x = xyz[0], y = xyz[1], z = xyz[2];
            minX = stdMath.min(minX, x);
            minY = stdMath.min(minY, y);
            minZ = stdMath.min(minZ, z);

            maxX = stdMath.max(maxX, x);
            maxY = stdMath.max(maxY, y);
            maxZ = stdMath.max(maxZ, z);
            v.setOriginalPosition(x, y, z);
        });

        width = maxX - minX;
        height = maxY - minY;
        depth = maxZ - minZ;

        self.width = width;
        self.height = height;
        self.depth = depth;
        self.minX = minX;
        self.maxX = maxX;
        self.minY = minY;
        self.maxY = maxY;
        self.minZ = minZ;
        self.maxZ = maxZ;

        maxe = stdMath.max(width, height, depth);
        mine = stdMath.min(width, height, depth);

        if ((maxe === width) && (mine === height))
        {
            self.minAxis = MOD3.ModConstant.Y;
            self.midAxis = MOD3.ModConstant.Z;
            self.maxAxis = MOD3.ModConstant.X;
        }
        else if ((maxe === width) && (mine === depth))
        {
            self.minAxis = MOD3.ModConstant.Z;
            self.midAxis = MOD3.ModConstant.Y;
            self.maxAxis = MOD3.ModConstant.X;
        }
        else if ((maxe === height) && (mine === width))
        {
            self.minAxis = MOD3.ModConstant.X;
            self.midAxis = MOD3.ModConstant.Z;
            self.maxAxis = MOD3.ModConstant.Y;
        }
        else if ((maxe === height) && (mine === depth))
        {
            self.minAxis = MOD3.ModConstant.Z;
            self.midAxis = MOD3.ModConstant.X;
            self.maxAxis = MOD3.ModConstant.Y;
        }
        else if ((maxe === depth) && (mine === width))
        {
            self.minAxis = MOD3.ModConstant.X;
            self.midAxis = MOD3.ModConstant.Y;
            self.maxAxis = MOD3.ModConstant.Z;
        }
        else if ((maxe === depth) && (mine === height))
        {
            self.minAxis = MOD3.ModConstant.Y;
            self.midAxis = MOD3.ModConstant.X;
            self.maxAxis = MOD3.ModConstant.Z;
        }

        MOD3.List.each(vertices, function(v) {
            var xyz = v.getXYZ();
            v.setRatios(width > 0 ? (xyz[0] - minX) / width : 0, height > 0 ? (xyz[1] - minY) / height : 0, depth > 0 ? (xyz[2] - minZ) / depth : 0);
        });
        return self;
    },

    resetGeometry: function() {
        var self = this;
        MOD3.List.each(self.vertices, reset);
        return self;
    },

    collapseGeometry: function() {
        var self = this;
        MOD3.List.each(self.vertices, collapse);
        self.analyzeGeometry();
        return self;
    },

    getMin: function(axis) {
        var self = this;
        return MOD3.ModConstant.X === axis
            ? self.minX
            : (MOD3.ModConstant.Y === axis
            ? self.minY
            : (MOD3.ModConstant.Z === axis
            ? self.minZ
            : -1))
        ;
    },

    getMax: function(axis) {
        var self = this;
        return MOD3.ModConstant.X === axis
            ? self.maxX
            : (MOD3.ModConstant.Y === axis
            ? self.maxY
            : (MOD3.ModConstant.Z === axis
            ? self.maxZ
            : -1))
        ;
    },

    getSize: function(axis) {
        var self = this;
        return MOD3.ModConstant.X === axis
            ? self.width
            : (MOD3.ModConstant.Y === axis
            ? self.height
            : (MOD3.ModConstant.Z === axis
            ? self.depth
            : -1))
        ;
    },

    update: function()  {
        // do nothing
        return this;
    },

    preApply: function()  {
        // do nothing
        return this;
    },

    postApply: function()  {
        // do nothing
        return this;
    },

    updateMeshPosition: function(p) {
        // do nothing
        return this;
    }
});

MOD3.Library3d = {
    id      : "Library3d",
    Mesh    : MOD3.MeshProxy,
    Vertex  : MOD3.VertexProxy
};

MOD3.Factory = {
    getLibrary: function(json) {
        if (json && json.library && MOD3[json.library]) return MOD3[json.library];
        // dummy, default
        return MOD3.Library3d;
    }

    ,getMeshProxy: function(lib3D) {
        if (arguments.length) return lib3D.Mesh ? new lib3D.Mesh() : null;
        return null;
    }

    ,getModifier: function(json) {
        if (json && json.modifier && MOD3[json.modifier]) return new MOD3[json.modifier]();
        return null;
    }

    /*
    ,getMesh: function(json) {
        if (json && json.mesh && MOD3[json.mesh] ) return new MOD3.MeshProxy().unserialize(json);
        // dummy, default
        return new MOD3.MeshProxy();
    }

    ,getVertex: function(json) {
        if (json && json.vertex && MOD3[json.vertex]) return new MOD3.VertexProxy().unserialize(json);
        // dummy, default
        return new MOD3.VertexProxy();
    }*/
};
/**
* MOD3  Modifier & ModifierStack Classes
**/
var _modCount = 0;

MOD3.Modifier = MOD3.Class({
    constructor: function Modifier() {
        var self = this;
        self.id = ++_modCount;
        self.name = 'Modifier';
        self.axes = MOD3.ModConstant.NONE;
        self.constraint = MOD3.ModConstant.NONE;
        self.enabled = true;
    },

    id: null,
    name: 'Modifier',
    axes: null,
    constraint: null,
    enabled: true,

    dispose: function() {
        var self = this;
        self.name = null;
        self.axes = null;
        self.constraint = null;
        return self;
    },

    enable: function(enabled) {
        if (arguments.length)
        {
            this.enabled = !!enabled;
            return this;
        }
        return this.enabled;
    },

    constraintAxes: function(axes) {
        this.axes = axes || MOD3.ModConstant.NONE;
        return this;
    },

    setConstraint: function(c) {
        this.constraint = c || MOD3.ModConstant.NONE;
        return this;
    },

    // override
    apply: function(modifiable) {
        return this;
    },

    toString: function() {
        return '[Modifier '+this.name+']';
    }
});

MOD3.ModifierStack = MOD3.Class({
    constructor: function ModifierStack(lib3d, mesh) {
        var self = this;
        if (!(self instanceof ModifierStack)) return new ModifierStack(lib3d, mesh);
        self.stack = [];
        self.setModifiable(MOD3.Factory.getMeshProxy(lib3d), mesh);
    },

    name: "ModifierStack",
    modifiable: null,
    stack: null,

    dispose: function(withModifiers) {
        var self = this;
        if (withModifiers && self.stack) while (self.stack.length) self.stack.pop().dispose();
        if (self.modifiable) self.modifiable.dispose();
        self.stack = null;
        self.modifiable = null;
        return self;
    },

    getModifiable: function() {
        return this.modifiable;
    },

    setModifiable: function(modifiable, mesh) {
        var self = this;
        self.modifiable = modifiable;
        if (mesh) self.modifiable.setMesh(mesh);
        return self;
    },

    add: function(modifier) {
        var self = this;
        if (modifier) self.stack.push(modifier);
        return self;
    },

    apply: function() {
        var self = this, modifiable = self.modifiable, stack = self.stack;
        if (modifiable && stack && stack.length)
            modifiable
                .preApply()
                .resetGeometry()
                .applyModifiers(stack)
                .postApply()
                .update()
            ;
        return self;
    },

    collapse: function() {
        var self = this, modifiable = self.modifiable, stack = self.stack;
        if (modifiable && stack && stack.length)
        {
            modifiable
                .preApply()
                .resetGeometry()
                .applyModifiers(stack)
                .collapseGeometry()
                .postApply()
                .update()
            ;
            stack.length = 0;
        }
        return self;
    },

    clear: function() {
        var self = this;
        if (self.stack) self.stack.length = 0;
        return self;
    }
});
// aliases
MOD3.ModifierStack.prototype.getMeshInfo = MOD3.ModifierStack.prototype.getModifiable;
MOD3.ModifierStack.prototype.addModifier = MOD3.ModifierStack.prototype.add;
!function(MOD3) {
"use strict";
/**
* MOD3  Pivot Modifier
**/

/**[DOC_MD]
 * ### Pivot modifier
 *
 * Allows to move the pivot point of a 3D mesh.
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
MOD3.Pivot = MOD3.Class(MOD3.Modifier, {
    constructor: function Pivot(x, y, z) {
        var self = this;
        if (!(self instanceof Pivot)) return new Pivot(x, y, z);
        self.$super('constructor');
        self.name = 'Pivot';
        self.vector = new MOD3.Vector3(x||0, y||0, z||0);
    },

    vector: null,

    dispose: function() {
        var self = this;
        self.vector.dispose();
        self.vector = null;
        self.$super('dispose');
        return self;
    },

    setMeshCenter: function(modifiable) {
        var self = this;
        self.vector = new MOD3.Vector3(
        -(modifiable.minX + 0.5*modifiable.width),
        -(modifiable.minY + 0.5*modifiable.height),
        -(modifiable.minZ + 0.5*modifiable.depth)
        );
        return self;
    },

    apply: function(modifiable) {
        var self = this, pivot = self.vector, pv = pivot.xyz;

        MOD3.List.each(modifiable.vertices, function(v) {
            v.setXYZ(MOD3.Vector3.add(v.getXYZ(), pv));
        });
        modifiable.updateMeshPosition(pivot.negate());
        return self;
    }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Bend Modifier
**/

/**[DOC_MD]
 * ### Bend modifier 
 *
 * Bends an object along an axis. 
 *
 * @author Bartek Drozdz
 *  
[/DOC_MD]**/
var stdMath = Math, PI = stdMath.PI,
    TWO_PI = 2*PI, HALF_PI = PI/2;

MOD3.Bend = MOD3.Class(MOD3.Modifier, {
    constructor: function Bend(force, offset, angle) {
        var self = this;
        if (!(self instanceof Bend)) return new Bend(force, offset, angle);
        self.$super('constructor');
        self.name = 'Bend';
        self.constraint = MOD3.ModConstant.NONE;
        self.switchAxes = false;
        self.force = force || 0;
        self.offset = offset || 0;
        self.angle = angle || 0;
    },

    force: 0,
    offset: 0,
    angle: 0,
    switchAxes: false,
    
    dispose: function() {
        var self = this;
        self.force = null;
        self.offset = null;
        self.angle = null;
        self.switchAxes = null;
        self.$super('dispose');
        return self;
    },
    
    apply: function(modifiable) {   
        var self = this;
        
        if (0 === self.force) return self;
        
        var constraint = self.constraint, switchAxes = self.switchAxes,
            force = self.force, offset = stdMath.min(1, stdMath.max(0, self.offset)), a = self.angle,
            max = switchAxes ? modifiable.midAxis : modifiable.maxAxis,
            min = modifiable.minAxis,
            mid = switchAxes ? modifiable.maxAxis : modifiable.midAxis,
            width = modifiable.getSize(max),
            height = modifiable.getSize(mid),
            origin = modifiable.getMin(max),
            //diagAngle = stdMath.atan2(height, width),
            m1 = new MOD3.Matrix().rotate(a),
            m2 = new MOD3.Matrix().rotate(-a),
            distance = origin + width * offset,
            radius = width / PI / force,
            bendAngle = TWO_PI * (width / (radius * TWO_PI))
        ;
        
        MOD3.List.each(modifiable.vertices, function(v) {
            var xyz = v.getXYZ(),
                vmax = xyz[MOD3.XYZi[max]],
                vmid = xyz[MOD3.XYZi[mid]],
                vmin = xyz[MOD3.XYZi[min]],
                np = MOD3.Matrix.transform(m1, [vmax, vmid]),
                p, fa, op, ow, np2
            ;
            vmax = np[0]; vmid = np[1];

            p = (vmax - origin) / width;

            if (
                ((MOD3.ModConstant.LEFT === constraint) && (p <= offset)) || 
                ((MOD3.ModConstant.RIGHT === constraint) && (p >= offset))
            ) 
            {  
                /* do nothing */ 
            } 
            else 
            {
                fa = (HALF_PI - bendAngle * offset) + (bendAngle * p);
                op = stdMath.sin(fa) * (radius + vmin);
                ow = stdMath.cos(fa) * (radius + vmin);
                vmin = op - radius;
                vmax = distance - ow;
            }

            np2 = MOD3.Matrix.transform(m2, [vmax, vmid]);
            vmax = np2[0]; vmid = np2[1];
            xyz[MOD3.XYZi[max]] = vmax;
            xyz[MOD3.XYZi[mid]] = vmid;
            xyz[MOD3.XYZi[min]] = vmin;
            v.setXYZ(xyz);
        });
        return self;
    }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Bloat Modifier
**/

/**[DOC_MD]
 * ### Bloat modifier
 *
 * Bloats a mesh by forcing vertices out of specified sphere
 *
 * @author makc
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Bloat = MOD3.Class(MOD3.Modifier, {
    constructor: function Bloat(radius, a, center) {
        var self = this;
        if (!(self instanceof Bloat)) return new Bloat(radius, a, center);
        self.$super('constructor');
        self.name = 'Bloat';
        self.radius = radius || 0;
        self.a = null == a ? 0.01 : a;
        self.center = center || MOD3.Vector3.ZERO();
        //self.u = MOD3.Vector3.ZERO();
    },

    radius: 0,
    a: 0.01,
    center: null,
    //u: null,

    dispose: function() {
        var self = this;
        self.center.dispose();
        self.center = null;
        self.radius = null;
        self.a = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable)  {
        var self = this, center = self.center.xyz,
            radius = stdMath.max(0, self.radius), a = stdMath.max(0, self.a);

        MOD3.List.each(modifiable.vertices, function(v) {
            // get a vector towards vertex
            // change norm to norm + r * exp (-a * norm)
            var uu = MOD3.Vector3.sub(v.getXYZ(), center), magn = MOD3.Vector3.mod(uu);
            MOD3.Vector3.muls(MOD3.Vector3.norm(uu), magn + radius * stdMath.exp(- magn * a));
            // move vertex accordingly
            v.setXYZ(MOD3.Vector3.add(uu, center));
            // ?? needed??
            //self.u=uu;
        });
        return self;
    }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Twist Modifier
**/

/**[DOC_MD]
 * ### Twist modifier
 *
 * Twist mesh along an axis
 * Adapted from the Twist modifier for PV3D
 *
[/DOC_MD]**/
MOD3.Twist = MOD3.Class(MOD3.Modifier, {
    constructor: function Twist(angle, vector, center) {
        var self = this;
        if (!(self instanceof Twist)) return new Twist(angle, vector, center);
        self.$super('constructor');
        self.name = 'Twist';
        self.angle = angle || 0;
        self.vector = vector || MOD3.Vector3.Y();
        self.center = center || MOD3.Vector3.ZERO();
    },

    angle: 0,
    vector: null,
    center: null,

    dispose: function() {
        var self = this;
        self.vector.dispose();
        self.vector = null;
        self.angle = null;
        self.center.dispose();
        self.center = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            tvec = self.vector.normalizeSelf().xyz, angle = self.angle, center = self.center.xyz,
            modulo = MOD3.Vector3.mod([0.5*modifiable.maxX, 0.5*modifiable.maxY, 0.5*modifiable.maxZ]),
            d = -MOD3.Vector3.dot(tvec, center),
            m1 = new MOD3.Matrix4(), m2 = new MOD3.Matrix4()
        ;

        MOD3.List.each(modifiable.vertices, function(v) {
            var xyz = v.getXYZ(),
                a = (MOD3.Vector3.dot(xyz, tvec) + d) * angle / modulo,
                m = MOD3.Matrix4.mult(
                    m2.rotate(tvec[0], tvec[1], tvec[2], a, true),
                    m1.translate(xyz[0], xyz[1], xyz[2], true)
                )
            ;
            v.setXYZ([m.m[3], m.m[7], m.m[11]]);
        });
        return self;
    }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Skew Modifier
**/

/**[DOC_MD]
 * ### Skew modifier
 *
 * Skew mesh along an axis
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Skew = MOD3.Class(MOD3.Modifier, {
    constructor: function Skew(force, offset, power, falloff) {
        var self = this;
        if (!(self instanceof Skew)) return new Skew(force, offset, power, falloff);
        self.$super('constructor');
        self.name = 'Skew';
        self.constraint = MOD3.ModConstant.NONE;
        self.force = force != null ? force : 0;
        self.offset = offset != null ? offset : 0.5;
        self.power = power != null ? power : 1;
        self.falloff = falloff != null ? falloff : 1;
        self.inverseFalloff = false;
        self.oneSide = false;
        self.swapAxes = false;
        self.skewAxis = 0;
    },

    force: 0,
    skewAxis: 0,
    offset: 0.5,
    power: 1,
    falloff:  1,
    inverseFalloff: false,
    oneSide: false,
    swapAxes: false,

    dispose: function() {
        var self = this;
        self.force = null;
        self.skewAxis = null;
        self.offset = null;
        self.power = null;
        self.falloff = null;
        self.inverseFalloff = null;
        self.oneSide = null;
        self.swapAxes = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            constraint = self.constraint,
            skewAxis = self.skewAxis || modifiable.maxAxis,
            swapAxes = self.swapAxes,
            offset = stdMath.min(1, stdMath.max(0, self.offset)),
            oneSide = self.oneSide,
            inverseFalloff = !!self.inverseFalloff,
            falloff = stdMath.min(1, stdMath.max(0, self.falloff)),
            mirrorfalloff = 1-falloff,
            power = self.power,
            force = self.force,
            displaceAxis = MOD3.ModConstant.X === skewAxis
                ? (swapAxes ? MOD3.ModConstant.Z : MOD3.ModConstant.Y)
                : (MOD3.ModConstant.Y === skewAxis
                ? (swapAxes ? MOD3.ModConstant.Z : MOD3.ModConstant.X)
                : (MOD3.ModConstant.Z === skewAxis
                ? (swapAxes ? MOD3.ModConstant.Y : MOD3.ModConstant.X)
                : 0))
        ;

        MOD3.List.each(modifiable.vertices, function(v) {
            var r, dr, f, p, vRatio;
            vRatio = v.getRatio(skewAxis);
            if ((MOD3.ModConstant.LEFT === constraint) && (vRatio <= offset)) return;
            if ((MOD3.ModConstant.RIGHT === constraint) && (vRatio > offset)) return;

            r = vRatio - offset;
            if (oneSide && (0 > r)) r = -r;

            dr = v.getRatio(displaceAxis);
            if (inverseFalloff) dr = 1 - dr;

            f = falloff + dr * mirrorfalloff;
            p = (0 > r ? -1 : 1) * stdMath.pow(stdMath.abs(r), power);
            v.setValue(displaceAxis, v.getValue(displaceAxis) + force * p * f);
        });
        return self;
    },
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Taper Modifier
**/

/**[DOC_MD]
 * ### Taper modifier
 *
 * The taper modifier displaces the vertices on two axes proportionally to their position on the third axis.
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Taper = MOD3.Class(MOD3.Modifier, {
    constructor: function Taper(force, power, v1, v2)  {
        var self = this;
        if (!(self instanceof Taper)) return new Taper(force, power, v1, v2);
        self.$super('constructor');
        self.name = 'Taper';
        /*self.start = 0;
        self.end = 1;*/
        self.force = force != null ? force : 0;
        self.power = power != null ? power : 1;
        self.vector = v1 || MOD3.Vector3.Y(false);
        self.vector2 = v2 || MOD3.Vector3.Y();
    },

    force: 0,
    power: 1,
    /*start: 0,
    end: 1,*/
    vector: null,
    vector2: null,

    /*setFalloff : function(start, end)  {
        this.start = (start!==undef) ? start : 0;
        this.end = (end!==undef) ? end : 1;

        return this;
    },*/

    dispose: function() {
        var self = this;
        self.vector.dispose();
        self.vector2.dispose();
        self.vector = null;
        self.vector2 = null;
        self.force = null;
        self.power = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            vec = self.vector.xyz, vec2 = self.vector2.xyz,
            force = self.force, power = self.power, m = new MOD3.Matrix4();

        MOD3.List.each(modifiable.vertices, 1 !== power
            ? function(v) {
                var ar = MOD3.Vector3.mod(MOD3.Vector3.mul(v.getRatioVector(), vec2)), sc = force * stdMath.pow(ar, power);
                v.setXYZ(MOD3.Matrix4.multXYZ(m.scale(1 + sc * vec[0], 1 + sc * vec[1], 1 + sc * vec[2]), v.getXYZ()));
            }
            : function(v) {
                var ar = MOD3.Vector3.mod(MOD3.Vector3.mul(v.getRatioVector(), vec2)), sc = force * ar;
                v.setXYZ(MOD3.Matrix4.multXYZ(m.scale(1 + sc * vec[0], 1 + sc * vec[1], 1 + sc * vec[2]), v.getXYZ()));
            }
        );
        return self;
    }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Wheel Modifier
**/

/**[DOC_MD]
 * ### Wheel modifier
 *
 * Use it with vehicle models for wheels.
 *
 * The usual problem with a 3d wheel in a vahicle is that it is
 * supposed to turn (steer) and roll in the same time.
 * So, this code:
 *
 * ```javascript
 * wheel.rotationY = 10; // Steer 10deg to the left
 * wheel.rotationZ += 5; // Roll with a speed of 5
 * ```
 * This will make the wheel roll incorectly.
 *
 * A usual way to solve this problem is to put the wheel in another DisplayObject3D/Mesh,
 * turn the parent and roll the child, like that:
 * ```javascript
 * steer.rotationY = 10; // Steer 10deg to the left
 * steer.wheel.rotationZ += 5; // Roll with a speed of 5
 * ```
 * That will make the wheel behave correctly. But it can be uncomfortanble to apply, especially
 * to imported complex Collada models.
 *
 * The Wheel modifier elegantly solves this problem by doind the proper math in order to steer and roll
 * a single mesh at the same time. The only thing you need to do is to specify a steer vector and
 * roll vector - usually it will be 2 of the cardinal axes. The default value is:
 *
 * * steer - along the Y axis / new Vector3(0, 1, 0)
 * * roll - along the Z axis / new Vector3(0, 0, 1)
 *
 *
 * It should work with most car models imported from 3D editors as this is the natural position of a wheel.
 *
 * *Please note, that Papervision primitive cylinder, which may also be used as wheel, will require different axes
 * (Y for roll and Z or X for steer).*
 *
 * @author Bartek Drozdz
 *
 [/DOC_MD]**/
MOD3.Wheel = MOD3.Class(MOD3.Modifier, {
   constructor: function Wheel(speed, turn, roll, steerVector, rollVector) {
        var self = this;
        if (!(self instanceof Wheel)) return new Wheel(speed, turn, roll, steerVector, rollVector);
        self.$super('constructor');
        self.name = 'Wheel';
        self.speed = speed || 0;
        self.turn = turn || 0;
        self.roll = roll || 0;
        self.steerVector = steerVector || MOD3.Vector3.Y();
        self.rollVector = rollVector || MOD3.Vector3.Z();
    },

    speed:  0,
    turn: 0,
    roll: 0,
    steerVector: null,
    rollVector: null,

    dispose: function() {
        var self = this;
        self.speed = null;
        self.turn = null;
        self.roll = null;
        self.steerVector.dispose();
        self.rollVector.dispose();
        self.steerVector = null;
        self.rollVector = null;
        self.$super('dispose');

        return self;
    },

    apply: function(modifiable) {
        var self = this,
            steerVector = self.steerVector.normalizeSelf(),
            rollVector = self.rollVector.normalizeSelf(),
            turn = self.turn, roll = self.roll,
            //radius = 0.5*modifiable.width,
            //step = radius * self.speed / PI,
            //perimeter = radius * TWO_PI,
            ms = null, mt = null
        ;

        self.roll += self.speed;

        if (turn)
        {
            mt = new MOD3.Matrix4().rotateFromVector(steerVector, turn);
            ms = new MOD3.Matrix4().rotateFromVector(mt.multiplyVector(rollVector.clone()), roll);
        }
        else
        {
            ms = new MOD3.Matrix4().rotateFromVector(rollVector, roll);
        }

        MOD3.List.each(modifiable.vertices, mt
            ? function(v) {
                v.setXYZ(MOD3.Matrix4.multXYZ(ms, MOD3.Matrix4.multXYZ(mt, v.getXYZ())));
            }
            : function(v) {
                v.setXYZ(MOD3.Matrix4.multXYZ(ms, v.getXYZ()));
            }
        );
        return self;
    }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Break Modifier
**/

/**[DOC_MD]
 * ### Break modifier
 *
 * Allow to break a mesh
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Break = MOD3.Class(MOD3.Modifier, {
    constructor: function Break(offset, angle, vector) {
        var self = this;
        if (!(self instanceof Break)) return new Break(offset, angle, vector);
        self.$super('constructor');
        self.name = 'Break';
        self.offset = offset || 0;
        self.angle = angle || 0;
        self.vector = vector || MOD3.Vector3.Y();
        self.range = new MOD3.Range(0, 1);
    },

    offset: 0,
    angle: 0,
    vector: null,
    range: null,

    dispose: function() {
        var self = this;
        self.vector.dispose();
        self.range.dispose();
        self.vector = null;
        self.range = null;
        self.offset = null;
        self.angle = null;
        self.$super('dispose');
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            offset = stdMath.min(1, stdMath.max(0, self.offset)), range = self.range, angle = self.angle,
            bv = self.vector.normalizeSelf().xyz, pv, rm;

        pv = modifiable.minZ + modifiable.depth*offset;
        rm = new MOD3.Matrix4().rotate(bv[0], bv[1], bv[2], angle);

        MOD3.List.each(modifiable.vertices, function(v) {
            var c = v.getXYZ();
            c[2] -= pv;
            if ((0 <= c[2]) && range.isIn(v.ratio[1])) MOD3.Matrix4.multXYZ(rm, c);
            c[2] += pv;
            v.setXYZ(c);
        });
        return self;
   }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Noise Modifier
**/

/**[DOC_MD]
 * ### Noise modifier
 *
 * Randomly displaces each vertex in all 3 axes
 *
 *
[/DOC_MD]**/
var stdMath = Math;

MOD3.Noise = MOD3.Class(MOD3.Modifier, {
    constructor: function Noise(force) {
        var self = this;
        if (!(self instanceof Noise)) return new Noise(force);
        self.$super('constructor');
        self.name = 'Noise';
        self.force = force || 0;
        self.start = 0;
        self.end = 1;
        self.axes = MOD3.ModConstant.X | MOD3.ModConstant.Y | MOD3.ModConstant.Z;
    },

    force: 0,
    start: 0,
    end: 1,

    dispose: function() {
        var self = this;
        self.force = null;
        self.start = null;
        self.end = null;
        self.$super('dispose');
        return self;
    },

    setFalloff: function(start, end) {
        var self = this;
        self.start = start != null ? start : 0;
        self.end = end != null ? end : 1;
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            axes = self.axes, start = self.start, end = self.end,
            force = self.force, halfforce = 0.5*force,
            maxAxis = modifiable.maxAxis;

        if ((0 == axes) || (0 == force)) return self;

        MOD3.List.each(modifiable.vertices, function(v) {
            var r = stdMath.random() * force - halfforce,
                p = v.getRatio(maxAxis), rp, xyz;
            if (start < end)
            {
                if (p < start) p = 0;
                else if (p > end) p = 1;
            }
            else if (start > end)
            {
                p = 1 - p;
                if (p > start) p = 0;
                else if (p < end) p = 1;
            }
            else
            {
                p = 1;
            }

            rp = r * p;
            xyz = v.getXYZ();
            v.setXYZ([
                xyz[0] + (axes & MOD3.ModConstant.X ? rp : 0),
                xyz[1] + (axes & MOD3.ModConstant.Y ? rp : 0),
                xyz[2] + (axes & MOD3.ModConstant.Z ? rp : 0)
            ]);
        });
        return self;
    }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  DisplaceMap (BitmapDisplacement) Modifier
**/

/**[DOC_MD]
 * ### DisplaceMap (BitmapDisplacement) Modifier
 *
 * Displaces vertices based on RGB values of bitmapData pixels.
 *
 * BitmapDisplacement is inspired by both the AS3 built-in DisplacementMapFilter. It allows
 * to use color values for each channels of a bitmap to modify the position of vertices in a mesh.
 *
 * The displacement takes place along the cardinal axes, and each axis is mapped to a
 * channel in the bitmap: X for Red, Y for Green and Z for Blue.
 *
 * @author Bartek Drozdz
 *
[/DOC_MD]**/
MOD3.DisplaceMap = MOD3.Class(MOD3.Modifier, {
    constructor: function DisplaceMap(bmp, force, offset) {
        var self = this;
        if (!(self instanceof DisplaceMap)) return new DisplaceMap(bmp, force, offset);
        self.$super('constructor');
        self.name = 'DisplaceMap';
        if (+bmp === bmp) // number
        {
            self.force = bmp || 1;
            self.offset = null == force ? 127 : force;// 0x7F;
        }
        else
        {
            self.setBitmap(bmp);
            self.force = force || 1;
            self.offset = null == offset ? 127 : offset;// 0x7F;
        }
        self.axes = MOD3.ModConstant.X | MOD3.ModConstant.Y | MOD3.ModConstant.Z;
    },

    width: null,
    height: null,
    bmpData: null,
    force: 1,
    offset: 127,

    dispose: function() {
        var self = this;
        self.bmpData = null;
        self.width = null;
        self.height = null;
        self.force = null;
        self.offset = null;
        self.$super('dispose');
        return self;
    },

    setBitmap: function(bmpData) {
        var self = this;
        self.bmpData = bmpData ? bmpData.data : null;
        self.width = bmpData ? bmpData.width : 0;
        self.height = bmpData ? bmpData.height : 0;
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            axes = self.axes,
            w = self.width, h = self.height, bmp = self.bmpData,
            force = self.force, offset = self.offset;

        if (!axes || !bmp) return self;

        MOD3.List.each(modifiable.vertices, function(v) {
            var uv, uu, vv, xyz = v.getXYZ();

            uu = ~~((w - 1) * v.ratio[0]/* X */);
            vv = ~~((h - 1) * v.ratio[2]/* Z */);
            uv = (vv * w + uu) << 2;

            v.setXYZ([
                xyz[0] + (axes & MOD3.ModConstant.X ? ((bmp[uv] & 0xff) - offset) * force : 0),
                xyz[1] + (axes & MOD3.ModConstant.Y ? ((bmp[uv+1] & 0xff) - offset) * force : 0),
                xyz[2] + (axes & MOD3.ModConstant.Z ? ((bmp[uv+2] & 0xff) - offset) * force : 0)
            ]);
        });
        return self;
    }
});
}(MOD3);!function(MOD3) {
"use strict";
/**
* MOD3  Perlin/Simplex Noise Modifier
**/

/**[DOC_MD]
 * ### Perlin modifier
 *
 *  Displaces vertices based on a perlin/simplex noise source.
 *
 *  Accepts a perlin/simplex noise data (with width and height information) and displaces vertices
 *  based on the value of each point of the noise map.
 *
 *  @author Bartek Drozdz
 *
 *  @uses: https://github.com/josephg/noisejs for JavaScript
 *
[/DOC_MD]**/
function cyclic_shift(a, w, h, dX, dY)
{
    var size = w*h, b = new MOD3.VecArray(size), i, j, i2, j2, index;
    if (dX < 0) dX += w;
    if (dY < 0) dY += h;
    dX = ~~dX; dY = ~~dY;
    for (i=0,j=0,index=0; index<size; ++index,++i)
    {
        if (i >= w) {i = 0; ++j;}
        i2 = (i + dX) % w; j2 = (j + dY) % h;
        b[index] = a[i2 + j2 * w];
    }
    return b;
}
/*function generate2d(perlinNoise2d, w, h)
{
    var size = w*h, a = new MOD3.VecArray(size), i, j, index;
    for (i=0,j=0,index=0; index<size; ++index,++i)
    {
        if (i >= w) {i = 0; ++j;}
        a[index] = perlinNoise2d(i/w, j/h);
    }
    return a;
}*/
MOD3.Perlin = MOD3.Class(MOD3.Modifier, {
    constructor: function Perlin(force, noise, autoRun) {
        var self = this;
        if (!(self instanceof Perlin)) return new Perlin(force, noise, autoRun);
        self.$super('constructor');
        self.name = 'Perlin';
        self.force = null != force ? force : 1;
        self.perlin = noise;
        self.autoRun = null != autoRun ? !!autoRun : true;
        self.axes = MOD3.ModConstant.X | MOD3.ModConstant.Y | MOD3.ModConstant.Z;
    },

    speedX: 1,
    speedY: 1,
    perlin: null,
    force: 1,
    offset: 0,
    autoRun: true,

    dispose: function() {
        var self = this;
        self.perlin = null;
        self.speedX = null;
        self.speedY = null;
        self.force = null;
        self.offset = null;
        self.autoRun = null;
        self.$super('dispose');

        return self;
    },

    setSpeed: function(dX, dY) {
        var self = this;
        self.speedX = dX;
        self.speedY = dY;
        return self;
    },

    apply: function(modifiable) {
        var self = this,
            axes = self.axes, force = self.force,
            offset = self.offset, pn = self.perlin,
            w, h;

        if (!axes || !pn) return self;
        w = pn.width; h = pn.height;
        if (self.autoRun)
        {
            pn = self.perlin = cyclic_shift(pn, w, h, self.speedX, self.speedY);
            pn.width = w; pn.height = h;
        }

        MOD3.List.each(modifiable.vertices, function(v) {
            var xyz = v.getXYZ(),
                uu = ~~((w - 1) * v.ratio[0]/* u */),
                vv = ~~((h - 1) * v.ratio[2]/* v */),
                uv = uu + vv * w;

            v.setXYZ([
                xyz[0] + (axes & MOD3.ModConstant.X ? (pn[uv] - offset) * force : 0),
                xyz[1] + (axes & MOD3.ModConstant.Y ? (pn[uv/*+1*/] - offset) * force : 0),
                xyz[2] + (axes & MOD3.ModConstant.Z ? (pn[uv/*+2*/] - offset) * force : 0)
            ]);
        });
        return self;
    }
});
}(MOD3);// export it
return MOD3;
});

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

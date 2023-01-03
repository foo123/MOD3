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

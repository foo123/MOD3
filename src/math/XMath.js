/**
*
* MOD3  Math Utilities Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

// cache constants
var 
    toRad = MOD3.Constants.toRad, toDeg = MOD3.Constants.toDeg,
    Min = Math.min, Max = Math.max,
    Pow = Math.pow, Round = Math.round,
    Floor = Math.floor, Ceil = Math.ceil, Trim
;

var XMath = MOD3.XMath = MOD3.StaticClass({

    normalize: function( start, end, val ) {
        var range = end - start;
        return 0 === range ? 1 : Trim(0, 1, (val - start) / end);
    },

    toRange: function( start, end, normalized ) {
        var range = end - start;
        return 0 === range ? 0 : start + range * normalized;
    },

    inRange: function( start, end, value, excluding ) {
        return false !== excluding ? (value >= start && value <= end) : (value > start && value < end);
    },

    sign: function( val, ifZero ) {
        return 0 == val ? ifZero||0 : (val > 0 ? 1 : -1);
    },

    trim: function( start, end, value ) {
        return value < start ? start : (value > end ? end : value);
    },

    wrap: function( start, end, value ) {
        var r = end-start;
        return value < start ? value + r : (value >= end ? value - r : value);
    },

    degToRad: function( deg ) {
        return deg * toRad;
    },

    radToDeg: function( rad )  {
        return rad * toDeg;
    },

    presicion: function( number, precision ) {
        var r = Pow( 10, precision );
        return Round( number * r ) / r;
    },

    uceil: function( val ) {
        return (val < 0) ? Floor(val) : Ceil(val);
    }
});
// alias
Trim = XMath.clamp = XMath.trim;

}(MOD3);
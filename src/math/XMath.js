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
            var range = end - start, normal;

            if ( 0 === range ) 
            {
                normal = 1;
            } 
            else 
            {
                normal = Trim(0, 1, (val - start) / end);
            }

            return normal;
        },

        toRange: function( start, end, normalized ) {
            var range = end - start, val;

            if ( 0 === range ) 
            {
                val = 0;
            } 
            else 
            {
                val = start + (end - start) * normalized;
            }

            return val;
        },

        inRange: function( start, end, value, excluding ) {
            if (excluding===undef) excluding = false;
            return (excluding) ? (value >= start && value <= end) : (value > start && value < end);
        },

        sign: function( val, ifZero ) {
            if (ifZero===undef) ifZero = 0;
            return (0 == val) ? ifZero : (val > 0) ? 1 : -1;
        },

        trim: function( start, end, value ) {
            return Min( end, Max( start, value ) );
        },

        wrap: function( start, end, value ) {
            var r = end-start;
            if (value < start) return value + r;
            else if (value >= end) return value - r;
            else return value;
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
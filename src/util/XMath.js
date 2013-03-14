// XMath utiltity math functions for MOD3 -----------------------------------------------------------------------------
(function(MOD3){
    MOD3.XMath={};
    MOD3.XMath.normalize=function(start, end, val)
    {
        var range = end - start;
        var normal;
     
        if (range == 0) {
            normal = 1;
        } else {
            normal = MOD3.XMath.trim(0, 1, (val - start) / end);
        }

        return normal;
    };
    MOD3.XMath.toRange=function(start, end, normalized)
    {
        var range = end - start;
        var val;
     
        if (range == 0) {
            val = 0;
        } else {
            val = start + (end - start) * normalized;
        }

        return val;
    };
    MOD3.XMath.inInRange=function(start, end, value, excluding)
    {
        if (typeof excluding=='undefined') excluding=false;
        
        if(excluding) return value >= start && value <= end;
        else return value > start && value < end;
    };
    MOD3.XMath.sign=function(val, ifZero)
    {
        if (typeof ifZero=='undefined') ifZero=0;
        if(val == 0) return ifZero;
        else return (val > 0) ? 1 : -1;
    };
    MOD3.XMath.trim=function(start, end, value)
    {
        return Math.min(end, Math.max(start, value));
    };
    MOD3.XMath.wrap=function(start, end, value)
    {
        if(value < start) return value + (end - start);        else if(value >= end) return value - (end - start);
        else return value;
    };
    MOD3.XMath.degToRad=function(deg)
    {
        return deg / 180 * Math.PI;
    };
    MOD3.XMath.radToDeg=function(rad)
    {
        return rad / Math.PI * 180;
    };
    MOD3.XMath.presicion=function(number, precision)
    {
        var r = Math.pow(10, precision);
        return Math.round(number * r) / r;
    };
    MOD3.XMath.uceil=function(val)
    {
        return (val < 0) ? Math.floor(val) : Math.ceil(val);
    };
})(MOD3);
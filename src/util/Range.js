/**
*
* MOD3  Range Auxilliary Class
*
*
**/
(function(MOD3, undef){
    var 
        normalize=MOD3.XMath.normalize,
        toRange=MOD3.XMath.toRange,
        trim=MOD3.XMath.trim
    ;

    var Range = MOD3.Range = Class( Object,
    {
        constructor : function(s, e)  {
            this.start=0;
            this.end=1;
            if (s !== undef)  this.start=s;
            if (e !== undef)  this.end=e;
        },
        
        start : 0,
        end : 1,

        dispose : function() {
            this.start = null;
            this.end = null;
            
            return this;
        },
        
        getSize : function()  {
            return this.end - this.start;
        },

        move : function(amount)  {
            this.start += amount;
            this.end += amount;
        },

        isIn : function(n) {
            return (n >= this.start && n <= this.end);
        },

        normalize : function(n) {
            return normalize(this.start, this.end, n);
        },

        toRange : function(n) {
            return toRange(this.start, this.end, n);
        },

        trim : function(n) {
            return trim(this.start, this.end, n);
        },

        interpolate : function(n, r) {
            return toRange(this.start, this.end, r.normalize(n));
        },

        toString : function() {
            return "[" + this.start + " - " + this.end + "]";
        }
    });
    
})(MOD3);
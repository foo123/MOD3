/**
*
* MOD3  Range Auxilliary Class
*
*
**/
!function(MOD3, undef){
@@USE_STRICT@@

var 
    normalize = MOD3.XMath.normalize,
    toRange = MOD3.XMath.toRange,
    trim = MOD3.XMath.trim
;

var Range = MOD3.Range = MOD3.Class({
    
    constructor: function Range( s, e )  {
        var self = this;
        if ( !(self instanceof Range) ) return new Range( s, e );
        self.start = null != s ? s : 0;
        self.end = null != e ? e : 1;
    },
    
    name: "Range",
    start: 0,
    end: 1,

    dispose: function( ) {
        var self = this;
        self.start = null;
        self.end = null;
        return self;
    },
    
    getSize: function( )  {
        return this.end - this.start;
    },

    move: function( amount )  {
        this.start += amount;
        this.end += amount;
    },

    isIn: function( n ) {
        return (n >= this.start && n <= this.end);
    },

    normalize: function( n ) {
        return normalize( this.start, this.end, n );
    },

    toRange: function( n ) {
        return toRange( this.start, this.end, n );
    },

    trim: function( n ) {
        return trim( this.start, this.end, n );
    },

    interpolate: function( n, r ) {
        return toRange( this.start, this.end, r.normalize( n ) );
    },

    toString: function( ) {
        return "[" + this.start + " - " + this.end + "]";
    }
});

}(MOD3);